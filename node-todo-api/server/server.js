const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const{ObjectID} = require('mongodb');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

//setting up middleware to parse JSON
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);

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

app.listen(port, () => console.log(`Started on port ${port}`));

module.exports = {app};
