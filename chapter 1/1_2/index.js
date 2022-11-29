/**
 * Second version is to use built in fs module write to a CSV
 */

import { appendFileSync } from "fs";
import { createInterface } from "readline";

/**
 * Create a mapping for process input and output
 */
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Wrap readline for async functionality
 */
const readLineAsync = (message) => {
  return new Promise((resolve) => {
    readline.question(message, (answer) => {
      resolve(answer);
    });
  });
};

class Person {
  constructor(name = "", number = "", email = "") {
    this.name = name;
    this.number = number;
    this.email = email;
  }
  saveToCSV() {
    const content = `${this.name},${this.number},${this.email}\n`;
    try {
      appendFileSync("./contacts.csv", content);
      console.log(`${this.name} Saved!`);
    } catch (err) {
      console.error(err);
    }
  }
}

const startApp = async () => {
  const person = new Person();
  person.name = await readLineAsync("Contact Name: ");
  person.number = await readLineAsync("Contact Number: ");
  person.email = await readLineAsync("Contact Email: ");
  person.saveToCSV();
  const response = await readLineAsync("Continue? [y to continue]: ");
  if (response === "y") await startApp();
  else readline.close();
};

startApp();
