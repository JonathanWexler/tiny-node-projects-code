import bcrypt from 'bcrypt';
import promptModule from 'prompt-sync';
const prompt = promptModule();

const mockDB = { passwords: {} };

const saveNewPassword = async (password) => {
  const hash = bcrypt.hashSync(password, 10);
  mockDB.hash = hash
  console.log('Password has been saved!');
  showMenu();
}

const compareHashedPassword = async (password) => {
  const {hash} = mockDB;
  return await bcrypt.compare(password, hash);
}

const promptNewPassword = async () => {
  const response = await prompt('Enter a main password: ');
  saveNewPassword(response);
}

const viewPasswords = () => {
  const { passwords } = mockDB;
  Object.entries(passwords).forEach(([key, value], index) => {
    console.log(`${index + 1}. ${key} => ${value}`)
  });
  showMenu();
}

const showMenu = async () => {
  const response = await prompt(`
    Welcome back!
    1. View passwords
    2. Manage new password
  `);
  
  switch (response) {
    case ('1'):
      viewPasswords();
      break;
    case ('2'):
      promptManageNewPassword();
      break;
    default:
      console.log(`That's an invalid response.`);
      showMenu();
  }
}

const promptManageNewPassword = async () => {
  const source = await prompt('Enter name for password: ');
  const password = await prompt('Enter password to save: ');
  mockDB.passwords[source] = password;
  console.log(`Password for ${source} has been saved!`);
  showMenu();
}

const promptOldPassword = async () => {
  const response = await prompt('Enter your password: ');
  compareHashedPassword(response)
}

if (!mockDB.hash) promptNewPassword();
else promptOldPassword();

