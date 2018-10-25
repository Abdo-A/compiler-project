let stack = ""; //the string to which we will concat the characters of one token at a time (string token)

let scanResultObject = {}; //the object that will have each token and its value

let newToken = true; //when we are ready to start scanning a new token

let Code = []; //global holder for the code
let I; //global holder for the current index of the character in the code to be scanned

scannerFunction = code => {
  //mapping the code into the global array, to be available outside the function
  for (let i = 0; i < code.length; i++) {
    Code[i] = code[i];
  }

  for (let i = 0; i < code.length; i++) {
    I = i;
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

      case ",":
        commaCase();
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

      case "|":
        orCase();
        break;

      case "&":
        andCase();
        break;

      case "'":
        quotationCase();
        break;

      case '"':
        quotationCase();
        break;

      default:
        operatorCase();
        break;
    }
  }

  if (stack) {
    printStack();
  }
};

module.exports = scannerFunction;

//---------------------------------------LETTER-----------------------------------------------------------

const letterCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack === "" || isNaN(stack) || stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
  } else {
    printStack();
  }
};

//---------------------------------------NUMBER-----------------------------------------------------------

const numberCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack === "" || !isNaN(stack) || stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
  } else {
    printStack();
  }
};

//---------------------------------------()-----------------------------------------------------------

const roundBracketsCase = direction => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  console.log(`${Code[I]} -> ${direction} round bracket`);
};

//---------------------------------------[]-----------------------------------------------------------

const squareBracketsCase = direction => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  console.log(`${Code[I]} -> ${direction} square bracket`);
};

//---------------------------------------{}-----------------------------------------------------------

const curlyBracketsCase = direction => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  console.log(`${Code[I]} -> ${direction} curly bracket`);
};

//---------------------------------------;-----------------------------------------------------------

const semicolonCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  console.log(`${Code[I]} -> delimiter (semicolon)`);
};

//---------------------------------------,-----------------------------------------------------------

const commaCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  console.log(`${Code[I]} -> delimiter (comma)`);
};

//---------------------------------------:-----------------------------------------------------------

const colonCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  if (Code[I + 1] !== "=") {
    console.log(`${Code[I]} -> colon operator`);
  }
  //console.log(`${Code[I]} -> one colon`);
};

//---------------------------------------=-----------------------------------------------------------

const equalCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }

  if (Code[I - 1] === ":") {
    console.log(`:= -> assignment`);
  } else {
    console.log(`${Code[I]} -> equal operator`);
  }
};

//--------------------------------------- -----------------------------------------------------------

const spaceCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  //console.log(`${Code[I]} -> one space`);
};

//---------------------------------------|-----------------------------------------------------------

const orCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  if (Code[I - 1] === "|") {
    console.log(`|| -> operator (OR)`);
  }
};

//---------------------------------------&-----------------------------------------------------------

const andCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  if (Code[I - 1] === "&") {
    console.log(`&& -> operator (AND)`);
  }
};

//---------------------------------------"-----------------------------------------------------------

const quotationCase = () => {
  if (stack === "") {
    stack = stack.concat(Code[I]);
  } else if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    printStack();
  }
  console.log(`${Code[I]} -> quotation`);
};

//---------------------------------------OPERATOR-----------------------------------------------------------

const operatorCase = () => {
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  console.log(`${Code[I]} -> operator`);
};

printStack = () => {
  let type;
  if (stack[0] === "'" || stack[0] === '"') {
    type = "string";
    stack = stack.slice(1, -1);
  } else if (isNaN(stack)) {
    if (
      stack === "if" ||
      stack === "then" ||
      stack === "else" ||
      stack === "end" ||
      stack === "repeat" ||
      stack === "until" ||
      stack === "read" ||
      stack === "write"
    ) {
      type = "reserved word";
    } else {
      type = "identifier";
    }
  } else {
    type = "number";
  }

  console.log(`${stack} -> ${type}`);
  stack = "";
};

//Helper functions
const isLetter = character => {
  if (character.match(/[a-z]/i)) return character;
  else return null;
};

const isNumber = character => {
  if (character.match(/[0-9]/)) return character;
  else return null;
};
