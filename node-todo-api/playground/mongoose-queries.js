const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

// let id =  '58825e4eb63e643de2c7df1b11';
//
// //method checks if ID is valid
// if(!ObjectID.isValid(id)){
//   console.log('ID is not valid');
// }

//for all of these methods, no error is thrown
//need to add an if for error handling

//returns an array of all docs that meet query
// Todo.find({
//   _id : id
// }).then((todos) => {
//   console.log('Todo by find',todos);
// });
//
// //findOne will only return the first doc that evaluates to true
// //no result returns null
// Todo.findOne({
//   _id:id
// }).then((todo) => {
//   console.log('Todo by findOne',todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('ID not found');
//   }
//   console.log('Todo by findByID',todo);
//
// }).catch((error) => console.log(error));

let id = '58810fb0a95afd90ccc2e89e'

//use user.findbyid, handle found, query with no results, and errors

if(ObjectID.isValid(id)){
  User.findById(id).then((user) => {
    if (!user) {
      console.log('User not found');
    } else {
      console.log(user);
    }
  }, (error) => {
    console.log('Unable to query user', error);
  });
} else {
  console.log('Invalid ID');
}
