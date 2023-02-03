// Reference https://appdividend.com/2022/03/05/node-js-express-tutorial-for-beginners/
// More like https://www.udemy.com/course/restful-api-masterclass-with-express-and-nodejs-2022/
/**
 * 
 * Topics: Node as an API
 * Event Driven API
 * Restful API
 * ExpressJS as an API
 * Web server to API, health check
 * Nodemon
 * Dotenv?
 * Route params?
 * Handle GET
 * handle Post and using Postman
 * input validation
 * https://express-validator.github.io/docs/
 * PUT requests
 * DELETE requests + practice task
 * 
 * Then adding a DB
 * 
 */


import express from 'express';
import router from './routes/index.js';
const app = express();
const PORT= `3000`;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (_req, res) => {
  res.json({ message: "ok" });
});

app.use("/api", router);

app.use((e, _req, res) => {
  const {message, stack, statusCode } = e;
  console.error(message, stack);
  res.status(statusCode || 500).json({ message });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
