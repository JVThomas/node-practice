module.exports.add = (a,b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() =>{
    callback(a+b);
  }, 1000);
}

module.exports.asyncSquare = (a, callback) => {
  setTimeout(() => {
    callback(a*a);
  }, 1000 );
}

module.exports.square = (x) => x * x;

module.exports.setName = (userObj, name) => {
  let nameArray = name.split(" ");
  userObj.firstName = nameArray[0];
  userObj.lastName = nameArray[1];
  return userObj;
}
