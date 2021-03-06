const jwt = require('jsonwebtoken');
const secret = 'thisshouldbedefinedinaconfigurationfile'; // Use dotenv to store this

const withAuth = function(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: invalid token');
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
}

module.exports = withAuth;