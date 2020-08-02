const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('pasword')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  })
}

const User = mongoose.model('User', userSchema); // The User string sets the collection name, mongo adds an "s"

module.exports = User;