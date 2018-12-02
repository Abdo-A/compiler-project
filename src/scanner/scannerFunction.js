let stack = ""; //the string to which we will concat the characters of one token at a time (string token)

let tokensArray = []; //tokens array
let tokenTypesArray = []; //token types array

let Code = []; //global holder for the code
let I; //global holder for the current index of the character in the code to be scanned

let commentCase = false; //global variable to check if the current token is in a comment
let commentStack = 0; //number of nested comments (in case any existed)

let floatCase = false; //global variable to check if the current token is a float number
let negativeNumberCase = false;

const scannerFunction = code => {
  //clearing old data
  tokensArray = [];
  tokenTypesArray = [];
  Code = [];
  stack = "";
  commentStack = 0;
  commentCase = false;
  floatCase = false;
  negativeNumberCase = false;

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

      case ".":
        periodCase();
        break;

      case "_":
        underscoreCase();
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

      case "\n":
        spaceCase();
        break;

      default:
        operatorCase();
        break;
    }
  }

  if (stack) {
    printStack();
  }

  console.log(tokensArray);
  console.log(tokenTypesArray);
};

//---------------------------------------LETTER-----------------------------------------------------------

const letterCase = () => {
  if (commentCase) return;
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
  if (commentCase) return;
  if (negativeNumberCase) {
    stack = stack.concat("-" + Code[I]);
    negativeNumberCase = false;
  } else {
    stack = stack.concat(Code[I]);
  }
};

//---------------------------------------()-----------------------------------------------------------

const roundBracketsCase = direction => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  //console.log(`${Code[I]} -> ${direction} round bracket`);
  tokensArray.push(`${Code[I]}`);
  tokenTypesArray.push(`${direction} round bracket`);
};

//---------------------------------------[]-----------------------------------------------------------

const squareBracketsCase = direction => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  //console.log(`${Code[I]} -> ${direction} square bracket`);
  tokensArray.push(`${Code[I]}`);
  tokenTypesArray.push(`${direction} square bracket`);
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
  //console.log(`${Code[I]} -> ${direction} curly bracket`);
  // tokensArray.push(`${Code[I]}`);
  // tokenTypesArray.push(`${direction} curly bracket`);
  if (direction === "right") {
    commentStack++;
    commentCase = true;
  } else if (direction === "left" && commaCase) {
    commentStack--;
    if (commentStack <= 0) {
      commentCase = false;
    }
  }
};

//---------------------------------------;-----------------------------------------------------------

const semicolonCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  //console.log(`${Code[I]} -> delimiter (semicolon)`);
  tokensArray.push(`${Code[I]}`);
  tokenTypesArray.push(`semicolon`);
};

//---------------------------------------,-----------------------------------------------------------

const commaCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  //console.log(`${Code[I]} -> delimiter (comma)`);
  tokensArray.push(`${Code[I]}`);
  tokenTypesArray.push(`delimiter (comma)`);
};

//---------------------------------------.-----------------------------------------------------------

periodCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "" && isNaN(stack)) {
    printStack();
  }
  //console.log(`${Code[I]} -> delimiter (period)`);

  if (
    stack !== "" &&
    !isNaN(stack) &&
    floatCase === false &&
    isNumber(Code[I - 1]) === Code[I - 1]
  ) {
    stack = stack.concat(Code[I]);
    floatCase = true;
    return;
  } else {
    tokensArray.push(`${Code[I]}`);
    tokenTypesArray.push(`delimiter (period)`);
  }
};

//---------------------------------------_-----------------------------------------------------------

underscoreCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }

  //console.log(`${Code[I]} -> delimiter (underscore)`);
  if (
    stack !== "" &&
    isNaN(stack) &&
    (isLetter(Code[I - 1]) === Code[I - 1] ||
      isNumber(Code[I - 1]) === Code[I - 1] ||
      Code[I - 1] === "_")
  ) {
    stack = stack.concat(Code[I]);
    return;
  } else {
    if (stack) printStack();
    tokensArray.push(`${Code[I]}`);
    tokenTypesArray.push(`delimiter (underscore)`);
  }
};

//---------------------------------------:-----------------------------------------------------------

const colonCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  if (Code[I + 1] !== "=") {
    //console.log(`${Code[I]} -> operator (colon)`);
    tokensArray.push(`${Code[I]}`);
    tokenTypesArray.push(`operator (colon)`);
  }
};

//---------------------------------------=-----------------------------------------------------------

const equalCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }

  if (Code[I - 1] === ":") {
    //console.log(`:= -> assignment`);
    tokensArray.push(`:=`);
    tokenTypesArray.push(`assignment`);
  } else {
    //console.log(`${Code[I]} -> operator (equal)`);
    tokensArray.push(`${Code[I]}`);
    tokenTypesArray.push(`operator (equal)`);
  }
};

//--------------------------------------- -----------------------------------------------------------

const spaceCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  ////console.log(`${Code[I]} -> one space`);
};

//---------------------------------------|-----------------------------------------------------------

const orCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  if (Code[I - 1] === "|") {
    //console.log(`|| -> operator (OR)`);
    tokensArray.push(`||`);
    tokenTypesArray.push(`operator (OR)`);
  }
};

//---------------------------------------&-----------------------------------------------------------

const andCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }
  if (Code[I - 1] === "&") {
    //console.log(`&& -> operator (AND)`);
    tokensArray.push(`&&`);
    tokenTypesArray.push(`operator (AND)`);
  }
};

//---------------------------------------"-----------------------------------------------------------

const quotationCase = () => {
  if (commentCase) return;
  if (stack === "") {
    stack = stack.concat(Code[I]);
  } else if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    printStack();
  }
  //console.log(`${Code[I]} -> quotation`);
  tokensArray.push(`${Code[I]}`);
  tokenTypesArray.push(`quotation`);
};

//---------------------------------------OPERATOR-----------------------------------------------------------

const operatorCase = () => {
  if (commentCase) return;
  if (stack[0] === "'" || stack[0] === '"') {
    stack = stack.concat(Code[I]);
    return;
  }
  if (stack !== "") {
    printStack();
  }

  if (
    Code[I] === "-" &&
    !isNumber(Code[I - 1]) &&
    tokenTypesArray[tokenTypesArray.length - 1] !== "identifier" &&
    tokensArray[tokensArray.length - 1] !== ")"
  ) {
    negativeNumberCase = true;
    return;
  }

  //console.log(`${Code[I]} -> operator`);
  tokensArray.push(`${Code[I]}`);
  tokenTypesArray.push(`operator`);
};

printStack = () => {
  if (commentCase) return;
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
    floatCase = false;
  }

  //console.log(`${stack} -> ${type}`);
  tokensArray.push(`${stack}`);
  tokenTypesArray.push(`${type}`);

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
