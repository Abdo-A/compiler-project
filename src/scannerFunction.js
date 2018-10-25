const { isLetter, isNumber } = require("./helpers/getCharacterType");

let stack = ""; //the string to which we will concat the characters of one token at a time

let scanResultObject = {}; //the object that will have each token and its value

let newToken = true; //when we are ready to start scanning a new token

scannerFunction = code => {
  for (let i = 0; i < code.length; i++) {
    switch (code[i]) {
      case isNumber(code[i]):
        numberCase();
        break;

      case isLetter(code[i]):
        letterCase();
        break;

      case "(":
        roundBracketsCase("right");
        break;

      case ")":
        roundBracketsCase("left");
        break;

      case "[":
        squareBracketsCase("right");
        break;

      case "]":
        squareBracketsCase("left");
        break;

      case "{":
        curlyBracketsCase("right");
        break;

      case "}":
        curlyBracketsCase("left");
        break;

      case ";":
        semicolonCase();
        break;

      case ":":
        colonCase();
        break;

      case "=":
        equalCase();
        break;

      case " ":
        spaceCase();
        break;

      default:
        break;
    }
  }
};

module.exports = scannerFunction;

const letterCase = () => {
  console.log(`one letter`);
};

const numberCase = () => {
  console.log(`one number`);
};

const roundBracketsCase = direction => {
  console.log(`one ${direction} round bracket`);
};

const squareBracketsCase = direction => {
  console.log(`one ${direction} square bracket`);
};

const curlyBracketsCase = direction => {
  console.log(`one ${direction} curly bracket`);
};

const semicolonCase = () => {
  console.log(`one semicolon`);
};

const colonCase = () => {
  console.log(`one colon`);
};

const equalCase = () => {
  console.log(`one equal`);
};

const spaceCase = () => {
  console.log(`one space`);
};
