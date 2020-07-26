const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const User = require('./User');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyparser.json());

const mongoose = require('mongoose');
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
app.get('/api/secret', function (req, res) {
  return res.send('The password is guacamole');
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


app.listen(process.env.PORT || 8080);