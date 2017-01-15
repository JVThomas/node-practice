const yargs = require('yargs');
//config dotenv to access env variables
const dotenv = require('dotenv').config();
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

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

geocode.geocodeAddress(argv.address).then((addressResults) => {
	return forecast.getForecast(addressResults);
}).then((weatherResults) => {
	console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
}).catch((error) => {
	console.log(error);
});