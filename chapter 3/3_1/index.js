import bcrypt from "bcrypt";
import promptModule from "prompt-sync";
const prompt = promptModule();

const mockDB = { passwords: {} };

const saveNewPassword = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  mockDB.hash = hash;
  console.log("Password has been saved!");
  showMenu();
};

const compareHashedPassword = async (password) => {
  const { hash } = mockDB;
  return await bcrypt.compare(password, hash);
};

const promptNewPassword = () => {
  const response = prompt("Enter a main password: ");
  saveNewPassword(response);
};

const promptOldPassword = async () => {
  const response = prompt("Enter your password: ");
  const result = await compareHashedPassword(response);
  if (result) {
    console.log("Password verified.");
    showMenu();
  } else {
    console.log("Password incorrect.");
    promptOldPassword();
  }
};

const viewPasswords = () => {
  const { passwords } = mockDB;
  Object.entries(passwords).forEach(([key, value], index) => {
    console.log(`${index + 1}. ${key} => ${value}`);
  });
  showMenu();
};

const showMenu = () => {
  console.log(`
    1. View passwords
    2. Manage new password
    3. Verify password
    4. Exit`);
  const response = prompt(">");

  if (response === "1") viewPasswords();
  else if (response === "2") promptManageNewPassword();
  else if (response === "3") promptOldPassword();
  else if (response === "4") process.exit();
  else {
    console.log(`That's an invalid response.`);
    showMenu();
  }
};

const promptManageNewPassword = () => {
  const source = prompt("Enter name for password: ");
  const password = prompt("Enter password to save: ");

  mockDB.passwords[source] = password;
  console.log(`Password for ${source} has been saved!`);
  showMenu();
};

if (!mockDB.hash) promptNewPassword();
else promptOldPassword();
