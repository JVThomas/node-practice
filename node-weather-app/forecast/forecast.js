const request = require('request');

let getForecast = (location) => {
	const FORECAST_KEY = process.env.FORECAST_IO_SECRET;
	return new Promise((resolve, reject) => {
		request({
			url: `https://api.darksky.net/forecast/${FORECAST_KEY}/${location.latitude},${location.longitude}`,
			json: true
		}, (error, response, body) => {
			//forecast.io will return a 404 or 200 depending on success
			if (!error && response.statusCode === 200){
				resolve({
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature
				});
			} else {
				reject('Unable to connect to forecast.io servers');
			}
		});
	});
}

module.exports = {
	getForecast
}
