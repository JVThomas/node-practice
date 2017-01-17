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

  //basic example of using spies
  it('should call the spy correctly', function(done) {
    let spy = expect.createSpy();
    spy('John', 25);
    expect(spy).toHaveBeenCalledWith('John', 25);
    done();
  });

  //example of using spies in conjuction with rewire
  it('should call saveUser with user object', function(done) {
    let email = 'abc@gmail.com';
    let password = 'test123';
    //here app is calling handleSignup, which was mocked with our spy...
    app.handleSignup(email, password);
    //...allowing us to use toHaveBeenCalledWith to check arguments!
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
    done();
  });
});
