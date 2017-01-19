const mongoose = require('mongoose');

//this line is to have mongoose set up for Promises
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed:{
    type: Boolean
  },
  completedAt:{
    type: Number
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
  text: 'learn node',
  completed: false,
  completedAt: Date.now()
});

anotherTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo', error);
});
