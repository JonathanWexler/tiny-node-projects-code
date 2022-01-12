/**
 * First version is to simply write to a file
 */

import fs from 'fs';

const content = 'Some content!'

try {
  fs.writeFileSync('./test.txt', content)
} catch (err) {
  console.error(err)
}
console.log("Success!");