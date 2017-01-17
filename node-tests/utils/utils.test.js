//.test.js used to designate test file
const utils = require('./utils');
const expect = require('expect');

describe('add()', function() {
  it('should add two numbers', () => {
    let res = utils.add(33,11);
    expect(res)
      .toBe(44, `expected ${res} to be 44`)
      .toBeA('number');
  });
});

describe('asyncAdd()', function() {
  it('should add two nums asynchronously', function(done) {
    utils.asyncAdd(4,3,(sum)=>{
      expect(sum).toBe(7).toBeA('number');
      //use done for async tests
      //test will not complete until done callback is called
      //good way to ensure assertions are run
      done();
    });
  });
});

describe('asyncSquare', function() {
  it('asynchrounously squares a number', function(done) {
    utils.asyncSquare(3, (res) => {
      expect(res).toBe(9).toBeA('number');
      done();
    });
  });
});

describe('square()', function() {
  it('should square the given number', function() {
    let res = utils.square(3);
    expect(res)
      .toBe(9, `expeceted ${res}`)
      .toBeA('number');
  });
});
describe('object tests', function() {
  it('should expect some values', function() {
    //use toEqual to compare objects
    expect({name: 'John Doe'}).toEqual({name:'John Doe'});

    //use toInclude to see if value is present in array
    expect([2,3,4]).toInclude(2);
    expect([2,3,4]).toExclude(5);

    //can be used for obj as well
    expect({
      name: 'john doe',
      age: 25
    }).toInclude({age:25})
    .toExclude({name: 'John Smith'});
  });

  describe('setName()', function() {
    it('should split the name string and set the first and last names', function() {
      let userObj = {age: 25}
      expect(utils.setName(userObj,"John Doe"))
        .toInclude({firstName: 'John'})
        .toInclude({lastName: 'Doe'})
        .toBe(userObj);
    });
  });
});
