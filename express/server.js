const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();

router.get('/', (req, res) => res.send("Hello World!"));

app.use('/.netlify/functions/server', router);
app.use('/', (req, res) => res.send("Guacamole"));

module.exports = app;
module.exports.handler = serverless(app);