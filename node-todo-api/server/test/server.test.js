const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

let todos = [
  {text:'one',
  _id: new ObjectID()
  },
  {
    text: 'two',
    _id: new ObjectID()
  },
  {
    text: 'three',
    _id: new ObjectID()
  }
];

beforeEach((done) => {
  //this will empty db before each test
  Todo.remove({}).then(() => {
    //insertMany lets you save more than one doc
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', function() {
  it('creates a new todo', function(done) {

    let text = 'test';
    //make the request
    request(app)
    //define route
      .post('/todos')
      //set the data to send
      .send({text})
      //check status
      .expect(200)
      //check the response
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if (err){
          return done(err);
        } else {
          Todo.find().then((todos) => {
            expect(todos.length).toBe(4);
            expect(todos[3].text).toBe(text);
            done();
          //we need a catch in case the above expect statements fail
          }).catch((error) => {
            done(error);
          });
        }
      });
  });

  it('does not save a todo with invalid body data', function(done) {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err){
          return done(err);
        } else {
          Todo.find({}).then((todos) => {
            expect(todos.length).toBe(3);
            done();
          }).catch((e) => done(e));
        }
      });
  });
});

describe('GET /todos', function() {
  it('gets all todos saved in db', function(done) {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3)
      })
      //here we only pass done to end since we are not doing any async tasks
      .end(done);
  });
});

describe('GET /todos/:id', function() {
  it('queries for a todo by id', function(done) {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('one');
        expect(res.body.todo._id).toBe(`${todos[0]._id}`);
      })
      .end(done);
  });
  
  it('sends a 404 response when id is invalid', function(done) {
    request(app)
      .get('/todos/${todos[0]._id}kj54kj')
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.error.text).toBe('Invalid ID');
          done();
        }
      });
  });

  it('sends a 404 if id is not found', function(done) {
      let id = new ObjectID().toHexString();
      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end((err, res) => {
          if (err){
            done(err);
          } else {
            expect(res.error.text).toBe('ID does not exist');
            done();
          }
        });
  });
});
