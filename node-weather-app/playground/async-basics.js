console.log("Starting app");
setTimeout(() => {
	console.log("Async callback function fired!")
},2000);

setTimeout(() =>{
	console.log("Second async function fired");
},0);

console.log("Finishing up");