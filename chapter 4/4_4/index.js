import promptModule from "prompt-sync";
const prompt = promptModule({ sigint: true });
const customItems = [];

import Parser from "rss-parser";
const parser = new Parser();
const urls = [
  "https://www.bonappetit.com/feed/recipes-rss-feed/rss",
  "https://www.specialtyfood.com/rss/featured-articles/category/lunch/",
  "https://www.reddit.com/r/recipes/.rss",
];

const main = async () => {
  const feedItems = [];
  const awaitableRequests = urls.map((url) => parser.parseURL(url));
  const responses = await Promise.all(awaitableRequests);
  aggregate(responses, feedItems);
  print(feedItems);
};

const aggregate = (responses, feedItems) => {
  for (let { items } of responses) {
    for (let { title, link } of items) {
      if (title.toLowerCase().includes("veg")) {
        feedItems.push({ title, link });
      }
    }
  }
  return feedItems;
};

const print = (feedItems) => {
  const res = prompt("Add item: ");
  const [title, link] = res.split(",");
  if (![title, link].includes(undefined)) customItems.push({ title, link });
  console.clear();
  console.table(feedItems.concat(customItems));
  console.log("Last updated ", new Date().toUTCString());
};

setInterval(main, 2000);
