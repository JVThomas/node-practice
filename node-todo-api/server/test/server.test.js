const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  //this will empty db before each test
  Todo.remove({}).then(() => done());
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
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          //we need a catch in case the above expect statements fail
          }).catch((error) => {
            done(error);
          });
        }
      })
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
            expect(todos.length).toBe(0);
            done();
          }).catch((e) => done(e));
        }
      });

  });
});
