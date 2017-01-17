module.exports.add = (a,b) => a + b;

module.exports.square = (x) => x * x;

module.exports.setName = (userObj, name) => {
  let nameArray = name.split(" ");
  userObj.firstName = nameArray[0];
  userObj.lastName = nameArray[1];
  return userObj;
}
