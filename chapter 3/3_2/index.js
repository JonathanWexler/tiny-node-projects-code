import bcrypt from 'bcrypt';
import promptModule from 'prompt-sync';
const prompt = promptModule();

// MONGODB
import {MongoClient} from 'mongodb';

const mockDB = { passwords: {} };

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passwordManager';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const authCollection = db.collection('auth');
  const passwordsCollection = db.collection('passwords');


  // the following code examples can be pasted here...

  return [passwordsCollection, authCollection];
}

console.log('loading DB')
const [passwordsCollection, authCollection] = await main();
console.log('COLLECTION', passwordsCollection)
const findResult2 = await authCollection.find({}).toArray();
const findResult = await passwordsCollection.find({}).toArray();

// MONGODB

const saveNewPassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  mockDB.hash = hash
  console.log('Password has been saved!');
  showMenu();
}

const compareHashedPassword = async (password) => {
  const {hash} = mockDB;
  return await bcrypt.compare(password, hash);
}

const promptNewPassword = () => {
  const response = prompt('Enter a main password: ');
  saveNewPassword(response);
}

const promptOldPassword = async () => {
  const response = prompt('Enter your password: ');
  const result = await compareHashedPassword(response);
  if (result) {
    console.log('Password verified.');
    showMenu()
  } else { 
    console.log('Password incorrect.')
    promptOldPassword()
  }
}

const viewPasswords = () => {
  const { passwords } = mockDB;
  Object.entries(passwords).forEach(([key, value], index) => {
    console.log(`${index + 1}. ${key} => ${value}`)
  });
  showMenu();
}

const showMenu = () => {
  console.log(`
    1. View passwords
    2. Manage new password
    3. Verify password
    4. Exit`);
  const response = prompt('>');

  if (response === '1') viewPasswords();
  if (response === '2') promptManageNewPassword();
  if (response === '3') promptOldPassword();
  if (response === '4') process.exit();
  else {
    console.log(`That's an invalid response.`);
    showMenu();
  }
}

const promptManageNewPassword = () => {
  const source = prompt('Enter name for password: ');
  const password = prompt('Enter password to save: ');

  mockDB.passwords[source] = password;
  console.log(`Password for ${source} has been saved!`);
  showMenu();
}

if (!mockDB.hash) promptNewPassword();
else promptOldPassword();


// {
//   _id: <ObjectId>
//   password_hash: "u904u32jewr043j0vn340fh034revf3r3ce",
//   passwords: [
//     {
//       source: "google",
//       password: "chromium2000" 
//     },
//     {
//       source: "facebook",
//       password: "metacoolp3rson" 
//     },
//   ]
// }