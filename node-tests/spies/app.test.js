const expect = require('expect');
const rewire = require('rewire');

//rewire loads file through require but also adds two methods
//app.__get__ and app.__set__
let app = rewire('./app');

describe('App', function() {
  let db = {
    saveUser: expect.createSpy()
  }
  //we can then set the method within the file with our mocked method
  app.__set__('db', db);
  it('should call the spy correctly', function(done) {
    let spy = expect.createSpy();
    spy('John', 25);
    expect(spy).toHaveBeenCalledWith('John', 25);
    done();
  });

  it('should call saveUser with user object', function(done) {
    let email = 'abc@gmail.com';
    let password = 'test123';
    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
    done();
  });
});
