let mongoose = require('mongoose');
//this line is to have mongoose set up for Promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
