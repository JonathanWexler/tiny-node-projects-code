/**
 * Third version is to use external packages write to a CSV
 */

import {createObjectCsvWriter} from 'csv-writer';
import promptModule from 'prompt-sync';
const prompt = promptModule();

const csvWriter = createObjectCsvWriter({
  path: './contacts.csv',
  append: true,
  header: [
    {id: 'name', title: 'NAME'},
    {id: 'phone', title: 'PHONE'},
    {id: 'email', title: 'EMAIL'},
  ]
});

class Person {
  constructor(name = "", number = "", email = "") {
    this.name = name;
    this.number = number;
    this.email = email;
  }
  saveToCSV() {
    try {
      const {name, number, email} = this;
      csvWriter.writeRecords([{name, number, email}])
      console.log(`${name} Saved!`)
    } catch (err) {
      console.error(err)
    }
  }
}

const startApp = async () => {
  const person = new Person();
  person.name = await prompt('Contact Name: ');
  person.number = await prompt('Contact Number: ');
  person.email = await prompt('Contact Email: ');
  person.saveToCSV()
  const response = await prompt('Continue? [y to continue]: ');
  if (response === 'y') await startApp();
}

startApp();