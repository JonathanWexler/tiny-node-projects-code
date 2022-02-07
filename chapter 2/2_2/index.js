import express from 'express';
import workingHours from './data/workingHours.js';
import menuItems from './data/menuItems.js';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Welcome to What's Fare is Fair!`);
});

app.get('/menu', (req, res) => {
  res.json(menuItems);
});

app.get('/hours', (req, res) => {
  res.json(workingHours);
});

app.listen(port, () => {
  console.log(`Web Server is listening at localhost:${port}`);
});