let { characters, stealRing } = require("./characters.js");

let myChars = characters;
myChars = stealRing(myChars, "Фродо");

for (const c of characters) {
  console.log(c);
}
