const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

beforeEach(populateUsers);
beforeEach(populateTodos);

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
          }, (e) => done(e));
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

describe('DELETE todos/:id', function() {
  it('deletes a todo object based on id', function(done) {
    let id = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.findById(id).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch(e => done(e));
      });
  });

  it('returns a 404 if id does not exist', function(done) {
    let id = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end((err, res) => {
        if(err){
          done(err)
        }
        expect(res.error.text).toBe('ID does not exist');
        done();
      });
  });
  it('returns a 404 if id is note valid', function(done) {
    let id = 'asdsds';

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end((err,res) => {
        if(err){
          done(err);
        }
        expect(res.error.text).toBe('Invalid ID');
        done();
      });
  });
});

describe('PATCH /todos/:id', function() {
  it('updates a todos text and updates completed to true', function(done) {
    let id = todos[0]._id.toHexString();
    let text = "This is a updated todo";
    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
        expect(res.body.todo.text).toBe(text);
      }).end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(id).then((todo) => {
          expect(todo.text).toBe(text);
          expect(todo.completed).toBe(true);
          expect(todo.completedAt).toNotBe(null);
          done();
        }).catch((error) => {
          done(error);
        });
      });
  });

  it('updates a todos text and changes completed to false', function(done) {
    let id = todos[1]._id.toHexString();
    let text = "This is a updated todo";
    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
        expect(res.body.todo.text).toBe(text);
      }).end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(id).then((todo) => {
          expect(todo.text).toBe(text);
          expect(todo.completed).toBe(false);
          expect(todo.completedAt).toBe(null);
          done();
        }).catch((error) => {
          done(error);
        });
      });
  });

  it('returns 404 if id is invalid', function(done) {
    let id = '23232'
    request(app)
      .patch(`/todos/${id}`)
      .expect(404)
      .end((error,res) => {
        if (error) {
          return done(error)
        }
        expect(res.error.text).toBe('Invalid ID');
        done();
      });
  });

  it('returns a 404 if id does not exist', function(done) {
    let id = new ObjectID().toHexString();
    request(app)
      .patch(`/todos/${id}`)
      .expect(404)
      .end((error,res) => {
        if (error) {
          return done(error);
        }
        expect(res.error.text).toBe('ID does not exist');
        done();
      });
  });
});

describe('POST /users', function() {
  let email = 'testing@test.com';
  let password = 'password';
  let userID;
  let token;

  it('creates a new user with email and password attributes', function(done) {
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe('testing@test.com');
        userID = res.body._id;
        token = res.header['x-auth'];
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        User.findById(userID).then((user) => {
          let tokens = user.tokens[0]
          expect(user._id.toHexString()).toBe(userID);
          expect(tokens.token).toBe(token);
          expect(tokens.access).toBe('auth');
          done();
        }).catch((error) =>{
          return done(error);
        });
      });
  });

  it('returns a 400 if email is not provided', function(done) {
    request(app)
      .post('/users')
      .send({password})
      .expect(400)
      .end((error, res) => {
        if(error) {
          return done(error)
        }
        expect(res.text).toNotBe(null);
        done();
      });
  });

  it('returns a 400 if password is not provided', function(done) {
    request(app)
      .post('/users')
      .send({email})
      .expect(400)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        expect(res.text).toNotBe(null);
        done();
      });
  });

  it('returns a 400 if email and password are not provided', function(done) {
    request(app)
      .post('/users')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).toNotBe(null);
        done();
      });
  });
});

describe('GET /users/me', function() {
  it('should return user data if authenticated', function(done) {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
        done();
      })
      .catch((e) => done(e));
  });

  it('should return 401 if not authenticated', function(done) {
    request(app)
      .get('/users/me')
      .set('x-auth', 'dskfjdkj3kj')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).toBe('Invalid Authorization');
        done();
      });
  });
});

describe('/users/logout', function() {
  it('logouts the user and deletes token used from user instance', function(done) {
    request(app)
      .delete('/users/logout')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe("OK");
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
        });
        done();
      }).catch(e => done(e));
  });

  it('fails to logout with invalid token argument', function(done) {
    request(app)
      .delete('/users/logout')
      .expect(401)
      .end((err,res) => {
        if(err) {
          return done(err);
        }
        expect(res.text).toBe('Invalid Authorization');
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(1);
        })
        done();
      });
  });
});
