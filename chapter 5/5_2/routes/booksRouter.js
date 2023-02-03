import {Router} from 'express';
const booksRouter = Router();

/* GET Book by ID */
booksRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

/* POST data for a new Book */
booksRouter.post("/", async (req, res, next) => {
  const {title, author} = req.body;
  try {
    const book = {title, author};
    res.json(book);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

/* PUT data for existing book */
booksRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

/* DELETE book by ID */
booksRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = { id };
    res.json(book);
  } catch (e) {
    console.error("Error occurred: ", e.message);
    next(e);
  }
});

export default booksRouter;
