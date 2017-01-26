require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const {mongoose} = require('./db/mongoose');
const{ObjectID} = require('mongodb');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

//setting up middleware to parse JSON
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((todo) => {
    res.send(todo);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send('Invalid ID');
  } else {
    Todo.findById(req.params.id).then((todo) => {
      if(!todo){
        res.status(404).send('ID does not exist');
      }
      else{
        res.send({todo});
      }
    }, (error) => {
      res.status(400).send('Unable to query user', error);
    });
  }
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.status(404).send('Invalid ID');
  } else {
      Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
          res.status(404).send('ID does not exist');
        } else {
        res.send({todo});
        }
      }, (error) => {
        res.status(400).send('Unable to query DB', error);
      });
  }
});

app.patch('/todos/:id', (req,res) => {
  let id = req.params.id;
  //body variable used to check for paramters that should not be passed in
  //use _.pick to pass in valid attrs to body
  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID');
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime(); //returns js timestamp
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  //this operates like the MongoDB driver version, though with minor changes
  Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send('ID does not exist');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.post('/users', (req, res) => {
  let userParams = _.pick(req.body, ['email', 'password']);
  let user = new User(userParams);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => console.log(`Started on port ${port}`));

module.exports = {app};
