const User = require('../model/userModel');
const bcrypt = require('bcrypt');

async function signUp(req, res, next) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isadmin: true,
      topic_token: 'topic/' + req.body.username
    });
    try {
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
}

async function checkUser(req, res, next) {
  try {
    const { email, username } = req.query;

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    }

    res.json({ exists: !!user });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    const password = req.body.password;
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        // TODO: fix this action (add session)
        res.status(200).json({ message: 'Logged in successfully' });
      } else {
        res.status(200).json({ message: 'Incorrect password' });
      }
    } else {
      res.status(200).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function getUserTopic(req, res, next) {
  try {
    const username = req.query.username;
    const user = await User.findOne({ username });
    return res.status(200).json({ topic: user ? user.topic_token : null });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  signUp,
  checkUser,
  login,
  getAllUsers,
  getUserTopic
};
