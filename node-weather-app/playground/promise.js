let asyncAdd = (a,b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number'){
				resolve(a + b);
			} else {
				reject('Arguments must be numbers');
			}
		}, 1500)
	});
}

asyncAdd('1',2).then((success) => {
	console.log(success);
	return asyncAdd(success, 33);
}).then((success) => {
	console.log(success);
}).catch((error) => {
	console.log(error);
});
// let somePromise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		//resolve("Hey! It worked!");
// 		reject('Unable to fulfill promise');
// 	}, 2500);
// });

// somePromise.then((message) =>{
// 	console.log(`Success: ${message}`);
// }, (errorMessage) => {
// 	console.log(`Error: ${errorMessage}`);
// });

 

