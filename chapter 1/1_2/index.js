/**
 * Second version is to use built in fs module write to a CSV
 */

import fs from 'fs';
import {createInterface} from 'readline';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

class Person {
  constructor(name = "", phoneNumber = "", email = "") {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
  saveToCSV() {
    console.log('saved')
  }
}
let x = 1
// while (x<10) {
  const p = new Person();

  readline.question('Contact Name:', name => {
    console.log(`Name is ${name}!`);
    readline.close();
    p.saveToCSV();
    x++;
  });


// }

const digitizeContacts = () => {
  // Start Node prompt
}

// Get user prompt:
// name, phone number, email --> save to person class, save to CSV


// try {
//   fs.writeFileSync('./test.csv', content)
// } catch (err) {
//   console.error(err)
// }
// console.log("Success!");