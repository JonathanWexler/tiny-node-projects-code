import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Welcome to What's Fare is Fair!`);
});

app.listen(port, () => {
  console.log(`Web Server is listening at localhost:${port}`);
});