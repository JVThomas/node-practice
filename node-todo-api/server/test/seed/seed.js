const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
  _id: userOneID,
  email: 'test@test.com',
  password: 'useronepassword',
  tokens:[{
    access: 'auth',
    token : jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
  }]
},{
  _id: userTwoID,
  email: 'email@email.com',
  password: 'usertwopassword',
  tokens:[{
    access: 'auth',
    token : jwt.sign({_id: userTwoID, access: 'auth'}, 'abc123').toString()
  }]
}];


const todos = [
  {text:'one',
  _creator: userOneID,
  _id: new ObjectID()
  },
  {
    text: 'two',
    _id: new ObjectID(),
    _creator: userTwoID,
    completed: true,
    completedAt: 123
  },
  {
    text: 'three',
    _id: new ObjectID(),
    _creator: userTwoID
  }
];

const populateTodos = (done) => {
  //this will empty db before each test
  Todo.remove({}).then(() => {
    //insertMany lets you save more than one doc
    return Todo.insertMany(todos);
  }).then(() => done());
};

//insertMany does not work with middleware
//need to tweak populateUser

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
