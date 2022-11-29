/**
 * Third version is to use external packages write to a CSV
 */

import { createObjectCsvWriter } from "csv-writer";
import prompt from "prompt";
prompt.start();
prompt.message = "";

const csvWriter = createObjectCsvWriter({
  path: "./contacts.csv",
  append: true,
  header: [
    { id: "name", title: "NAME" },
    { id: "number", title: "NUMBER" },
    { id: "email", title: "EMAIL" },
  ],
});

class Person {
  constructor(name = "", number = "", email = "") {
    this.name = name;
    this.number = number;
    this.email = email;
  }
  saveToCSV() {
    try {
      const { name, number, email } = this;
      csvWriter.writeRecords([{ name, number, email }]);
      console.log(`${name} Saved!`);
    } catch (err) {
      console.error(err);
    }
  }
}

const startApp = async () => {
  const person = new Person();
  const responses = await prompt.get([
    {
      name: "name",
      description: "Contact Name",
    },
    {
      name: "number",
      description: "Contact Number",
    },
    {
      name: "email",
      description: "Contact Email",
    },
  ]);
  Object.assign(person, responses);
  person.saveToCSV();
  const { again } = await prompt.get([
    {
      name: "again",
      description: "Continue? [y to continue]",
    },
  ]);
  if (again === "y") await startApp();
};

startApp();
