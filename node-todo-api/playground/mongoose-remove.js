const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

//passing in an empty object removes all saved entries
// Todo.remove({}).then((todos) => {
//   //returned data contains an object with a lot of attributes, but there will be
//   //a result attribute
//   console.log(todos);
// });

Todo.findOneAndRemove({text: 'buy some milk'}).then(doc => console.log(doc)); 
//Todo.findByIdAndRemove(id)

// Todo.findByIdAndRemove('588772973403084a9b33e16d').then((todo)=>{
//   console.log(todo);
// });
