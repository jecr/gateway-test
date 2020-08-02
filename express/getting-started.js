const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost/test',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // Generates a new Schema
  const kittySchema = new mongoose.Schema({
    name: String
  });
  // Sets some properties, methods
  kittySchema.methods.speak = function () {
    const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
    console.log(greeting);
  }
  // Builds the model
  const Kitten = mongoose.model('Kitten', kittySchema);
  // Instantiates the model
  const silence = new Kitten({ name: 'Silence' });
  const fluffy = new Kitten({ name: 'Fluffy' });

  [silence, fluffy].forEach(cat => {
    cat.save((err, cat) => {
      if (err) return console.error(err);
      cat.speak();
    });
  });
  /* fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  }); */

  // Another querying syntax: Kitten.find({ name: /^fluff/ }, callback);
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
});