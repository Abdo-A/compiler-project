const { isLetter, isNumber } = require("./helpers/getCharacterType");

let stack = ""; //the string to which we will concat the characters of one token at a time

let scanResultObject = {}; //the object that will have each token and its value

let newToken = true; //when we are ready to start scanning a new token

scannerFunction = code => {
  for (let i = 0; i < code.length; i++) {
    if (isNumber(code[i])) {
      console.log("one number");
    } else if (isLetter(code[i])) {
      console.log("one letter");
    }
  }
};

module.exports = scannerFunction;
