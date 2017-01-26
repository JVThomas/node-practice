let {User} = require('./../models/user');

let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }
    //if user is returned, add user and token attribute to req before callback
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send('Invalid Authorization');
  });
}

module.exports = {authenticate};
