let mongoose = require('mongoose');
//this line is to have mongoose set up for Promises
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
