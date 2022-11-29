import Parser from "rss-parser";
const parser = new Parser();

const main = async () => {
  const url = "https://www.bonappetit.com/feed/recipes-rss-feed/rss";
  const { title, items } = await parser.parseURL(url);
  console.log(title);
  const results = items.map(({ title, link }) => ({ title, link }));
  console.clear();
  console.table(results);
  console.log("Last updated ", new Date().toUTCString());
};

setInterval(main, 2000);
