const db = require('../models');
const { Op } = require('sequelize');

exports.addBook = async (req, res) => {
  try {
    const book = await db.Book.create(req.body);
    res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const where = {};
  if (author) where.author = author;
  if (genre) where.genre = genre;

  try {
    const books = await db.Book.findAndCountAll({ where, offset: +offset, limit: +limit });
    res.send({ total: books.count, books: books.rows });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await db.Book.findByPk(req.params.id, {
      include: { model: db.Review, include: [db.User] }
    });
    if (!book) return res.status(404).send({ message: 'Not found' });

    const avgRating = book.Reviews.reduce((a, r) => a + r.rating, 0) / (book.Reviews.length || 1);
    res.send({ ...book.toJSON(), averageRating: avgRating });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const books = await db.Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${req.query.query}%` } },
          { author: { [Op.like]: `%${req.query.query}%` } }
        ]
      }
    });
    res.send(books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
