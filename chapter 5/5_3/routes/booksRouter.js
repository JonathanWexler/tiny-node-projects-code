import {Router} from 'express';
import Book from '../models/book.js';

const booksRouter = Router();

/* GET Book by ID */
booksRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id);
    res.json(book);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

/* GET All Books */
booksRouter.get("/", async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

/* POST data for a new Book */
booksRouter.post("/", async (req, res, next) => {
  const {title, author} = req.body;
  try {
    const book = await Book.create({title, author});
    res.json(book);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

/* PUT data for existing book */
booksRouter.put("/:id", async (req, res, next) => {
  const {id} = req.params;
  const {title, author} = req.body;

  try {
    const book = await Book.update({title, author}, {
      where: { id }
    });
    res.json(book);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

/* DELETE book by ID */
booksRouter.delete("/:id", async (req, res, next) => {
  const {id} = req.params;
  try {
    const book = await Book.destroy({
      where: { id }
    });
    res.json(book);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

export default booksRouter;
