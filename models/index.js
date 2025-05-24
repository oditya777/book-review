const Sequelize = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Book = require('./book')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);

db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);
db.Book.hasMany(db.Review);
db.Review.belongsTo(db.Book);

module.exports = db;
