const yargs = require('yargs');
//config dotenv to access env variables
const dotenv = require('dotenv').config();
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');
const axios = require('axios');

//exec allows for bash commands to be used in node
//output buffer is passed to callback function as an argument
//error and errorMessage also passed should they exist
const exec = require('child_process').exec;
const cmd = './bin/whereami'

const FORECAST_KEY = process.env.FORECAST_IO_SECRET;

//yargs options allow you to define constraints and aliases
//in this case addresss must be givem as a string
//also address has the alias 'a'
const argv = yargs
	.options({
		a:{
			//demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true,
			//default: process.env.HOME_ADDRESS
		}
	}).help()
	.alias('help', 'h')
	.argv;


if(!argv.address){
	processGeocode()
	.then((resp) => forecastAnalysis(resp))
	.catch((error) => console.log(error));
} else {
	encodedURL = generateAddressURL(process.env.HOME_ADDRESS);
	forecastAnalysis(encodedURL);
}

function forecastAnalysis (geocodeURL) {
	axios.get(geocodeURL).then((geocodeRes) => {
		if (geocodeRes.data.status === 'ZERO_RESULTS'){
			throw new Error("Address not found");
		} else {
			let formattedAddress = geocodeRes.data.results[0].formatted_address;
			let latitude = geocodeRes.data.results[0].geometry.location.lat
			let longitude = geocodeRes.data.results[0].geometry.location.lng
			let weatherURL = `https://api.darksky.net/forecast/${FORECAST_KEY}/${latitude},${longitude}`
			console.log(`Retreiving tempertature for ${formattedAddress}...`);
			return axios.get(weatherURL);
		}
	}).then((weatherRes) => {
		if(weatherRes.status === 200){
			console.log("Here's the weekly forecast");
			console.log('');
			weatherRes.data.daily.data.forEach((day) => {
				outputTemperature(day);
			});
			console.log('===================================================');
		} else {
			throw new Error("Unable to connect to forecast.io");
		}
	}).catch((error) => {
		if(error.code === 'ENOTFOUND'){
			console.log('Unable to connect to API');
		} else {
			console.log(error.message);
		}
	});
}

function outputTemperature(day) {
	console.log('===================================================');
	console.log(new Date(day.time * 1000).toDateString());
	console.log(`Summary: ${day.summary}`);
	console.log(`High: ${day.temperatureMax} | Feels like ${day.apparentTemperatureMax}`);
	console.log(`Low: ${day.temperatureMin} | Feels like ${day.apparentTemperatureMin}`);
}

function processGeocode() {
	let output = '';
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderror) => {
			if(!error){
				let coordinates = stdout.split('\n').map((substring, index) => {
					if(index <= 1){
						return substring.split(": ")[1];
					}
				});
				resolve (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[0]},${coordinates[1]}`);
			} else if (process.env.HOME_ADDRESS !== undefined) { 
				resolve (generateAddressURL(process.env.HOME_ADDRESS));
			} else {
				reject('You have no default address saved in .env file.');
			}
		});
	});
}

function generateAddressURL(address) {
	let encodedAddress = encodeURIComponent(argv.address);
	return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
}