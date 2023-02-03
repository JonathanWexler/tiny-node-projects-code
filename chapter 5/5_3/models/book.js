import config from '../db/config.js';

const {Sequelize, db} = config;

const Book = db.define('Book', {
  title: {
    type: Sequelize.STRING,
    unique: true
  },
  author: {
    type: Sequelize.STRING
  },
  requests: {
    type: Sequelize.INTEGER,
    default: 0
  },
}, {});

Book.sync();

export default Book;