const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{{VALUE}} is not a valid email'
    },
    trim: true
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
});

//override toJSON method to lock out sensitive materials for return
UserSchema.methods.toJSON = function () {
  let user = this;
  let userObj = user.toObject();

  return _.pick(userObj, ['_id', 'email']);
}

//method to geneate auth token on user creation
//used old function notation to have access to this
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';

  let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.TODO_SECRET).toString();
  user.tokens.push({access, token});
  return user.save().then(() => token);
}

//statics keyword used to denote model method
UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded = {};
  //used try-catch block to catch errors thrown by jwt library
  try {
    decoded = jwt.verify(token,process.env.TODO_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  //use quotes when dealing with nested attributes
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

UserSchema.statics.findByCredentials = function (email,password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject('User not found');
    }
    return new Promise ((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
}

//pre executes code before an event
//in this instance we're hashing the password before every save (if modified)
UserSchema.pre('save', function(next){
  let user = this;

  //isModified checks a property to see if its modified
  if(user.isModified('password')){
    //if it is, use bcrypt to save a new hashed password
    bcrypt.genSalt(11, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = {User};
