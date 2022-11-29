import express from "express";
import workingHours from "./data/workingHours.js";
import menuItems from "./data/menuItems.js";
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/menu", (req, res) => {
  res.render("pages/menu", menuItems);
});

app.get("/hours", (req, res) => {
  res.render("pages/hours", workingHours);
});

app.listen(port, () => {
  console.log(`Web Server is listening at localhost:${port}`);
});
