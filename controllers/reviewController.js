const db = require('../models');

exports.addReview = async (req, res) => {
  try {
    const exists = await db.Review.findOne({ where: { BookId: req.params.id, UserId: req.userId } });
    if (exists) return res.status(400).send({ message: 'Review exists' });

    const review = await db.Review.create({ ...req.body, BookId: req.params.id, UserId: req.userId });
    res.status(201).send(review);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await db.Review.findByPk(req.params.id);
    if (!review || review.UserId !== req.userId) return res.status(403).send({ message: 'Unauthorized' });

    await review.update(req.body);
    res.send(review);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await db.Review.findByPk(req.params.id);
    if (!review || review.UserId !== req.userId) return res.status(403).send({ message: 'Unauthorized' });

    await review.destroy();
    res.send({ message: 'Deleted' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
