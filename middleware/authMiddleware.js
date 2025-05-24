const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};
