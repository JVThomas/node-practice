const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

//you can regiter partial directory using registerPartials()
//argument - filepath to directory
hbs.registerPartials(__dirname + '/views/partials');

//app.set allows you to set up express config
//here we're setting up the view engine to work with hbs
app.set('view engine', 'hbs');

//we can use app.use to set up our own middleware
app.use((req, res, next) => {
	let now = new Date().toString();
	//using the request object we can access request details
	let log = `${now}: ${req.method} ${req.url}`
	console.log(log);

	//example use of creating a logger to keep track of requests made
	//using fs.appendFile once again
	//note three arguments, file name, string, and error callback
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err){
			console.log('Unable to append to server.log');
		}
	});
	//next exists so you can tell express when middleware is done
	//application will only move on when next() is called
	next();
});

//sometimes you don't want to call next, like when a page is under maintenance
//you can create middleware to prevent routes from rendering their views
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

//express.static allows you to use the absolute path to assets
//__dirname stores path to project dir
//note: Express executes middleware in the order its used
//if we set up the templates before the maintenance middleware...
//we'd be able to bypass the maintenance page by directly accessing the .html pages
app.use(express.static(__dirname + '/public'));

//takes two arguments, the name of the helper, and the function it calls
//to use, simple reference the name in curly braces wihtin template
hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

//to pass in arguments, simply call the method and pass in space seperated arguments
//calls occur in curly braces within template page
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	//res.send('<h1>Hello Express!</h1>');

	//node can detect objects, automatically parses it as json
	// res.send({
	// 	name: 'John Doe',
	// 	likes: ['pizza', 'hiking']
	// });

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage : 'Unable to fulfill request',
		status: 200
	});
});

//note: app.listen takes a second argument (optional)
//see below for example
app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
