let square = num => num * num;
console.log(square(9));

let user = {
	name: 'John Doe',
	//arrow functions does not bind this keyword
	//you're not going to get the arguments variable either
	sayHi: () => {
		console.log(`Hi. I'm ${this.name}`)
		console.log(arguments);
	},
	//use this notation in order to use this keyword
	sayHiAlt () {
		console.log(`Hi. I'm ${this.name}`);
		console.log(arguments);
	}
}

user.sayHi(1,2,3);
user.sayHiAlt(1,2,3);

//In general, if you don't need this or arguments, feel free to use the arrow functions
//Otherwise use the second notation listed

