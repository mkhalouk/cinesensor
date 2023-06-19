const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isadmin: {
    type: Boolean,
    required: true
  },
  topic_token: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
