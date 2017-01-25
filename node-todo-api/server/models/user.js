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
    require: true,
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

//used old function notation to have access to this
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';

  let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.TODO_SECRET).toString();

  user.tokens.push({access, token});

  return user.save().then(() => token);
}

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObj = user.toObject();

  return _.pick(userObj, ['_id', 'email']);
}

let User = mongoose.model('User', UserSchema);

module.exports = {User};
