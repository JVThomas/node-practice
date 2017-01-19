const mongoose = require('mongoose');

//this line is to have mongoose set up for Promises
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim:true
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }
});

// let newTodo = new Todo({
//   text: 'buy milk'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

anotherTodo = new Todo({
   //note: mongoose will cast data to string if possible
   //so nums and booleans can be turned into strings
   text: '  learn mongoose   '
  // completed: false,
  // completedAt: Date.now()
});

// anotherTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo', error);
// });
//
let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

let newUser = new User({
  email: '  '
});

newUser.save().then((user) => {
  console.log( 'User saved: ', user);
}, (e) => {
  console.log('User not saved', e);
});
