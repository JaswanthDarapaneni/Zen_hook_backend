const mongoose = require('mongoose');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'please enter a valid email.'],
  },
  password: {
    type: String,
    default: '',
  },
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('zenhookusers', UserSchema);

module.exports = User;
