const express = require('express');
const hbs = require('hbs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

//app.set allows you to set up express config
app.set('view engine', 'hbs');

//app.use allows you to utilize middleware
app.use(express.static(__dirname + '/public'))
//express.static allows you to use the absolute path to asset
//__dirname stores path to project dir

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
