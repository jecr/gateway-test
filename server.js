const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const User = require('./User');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyparser.json());
app.use(cookieParser());

const secret = 'thisshouldbedefinedinaconfigurationfile'; // Use dotenv to store this

const mongoose = require('mongoose');
const withAuth = require('./middleware');

mongoose.connect(
  'mongodb://localhost/test',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to db");
});

app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/api/home', function (req, res) {
  return res.send('Welcome!');
});
app.get('/api/secret', withAuth, function (req, res) {
  return res.send('The password is guacamole');
});
app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});
app.post('/api/register', function (req, res) {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user, please try again.");
    } else {
      res.status(200).send("Welcome to the club!")
    }
  });
});
app.post('/api/authenticate', function (req, res) {
  const { username, password } = req.body;
  User.findOne({ username }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error, please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error, please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, {
            httpOnly: true
          }).sendStatus(200);
        }
      });
    }
  });
});

app.listen(process.env.PORT || 8080);