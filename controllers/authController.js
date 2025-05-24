const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    await db.User.create({ username: req.body.username, password: hashed });
    res.status(201).send({ message: 'User created' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.send({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
