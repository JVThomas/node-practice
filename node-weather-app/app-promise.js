const yargs = require('yargs');
//config dotenv to access env variables
const dotenv = require('dotenv').config();
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');
const axios = require('axios');

const FORECAST_KEY = process.env.FORECAST_IO_SECRET;

//yargs options allow you to define constraints and aliases
//in this case addresss must be givem as a string
//also address has the alias 'a'
const argv = yargs
	.options({
		a:{
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	}).help()
	.alias('help', 'h')
	.argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

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
}).then((weatherRes) =>{
	debugger;
	if(weatherRes.status === 200){
		console.log(`It's currently ${weatherRes.data.currently.temperature}. It feels like ${weatherRes.data.currently.apparentTemperature}.`);
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