const request = require('request');

let geocodeAddress = (address) => {
	//encodeURIComponent allows you to encode string
	//counterpart is decodeURIComponent
	let encodedAddress = encodeURIComponent(address);

	//request takes two args, an options object and a callback function
	//here url is passed with the json option set to true
	return new Promise((resolve, reject) => {
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true
		}, (error,response,body) => {
			if(error){
				reject("Unable to connect to Google Servers");
			} else if(body.status === "OK"){
				resolve({
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			}else if(body.status === 'ZERO_RESULTS'){
				reject("Unable to find address");
			}
		});
	});
}

module.exports = {
	geocodeAddress	
}
