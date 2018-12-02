const parserFunction = () => {
  I = 0; //global holder for the current index of the token types array produced by scanner

  //We have access to tokensArray

  //We have access to tokenTypesArray

  //----------------------------------------Non-Terminal Functions------------------------------------------

  const program = () => {
    statementSequence();
  };

  const statementSequence = () => {
    console.log("statementSequence");
    statement();
    while (tokenTypesArray[I] === "semicolon") {
      match("semicolon", tokenTypesArray);
      statement();
    }
  };

  const statement = () => {
    console.log("statement");
    if (tokensArray[I] === "if") {
      ifStatement();
    } else if (tokensArray[I] === "repeat") {
      repeatStatement();
    } else if (tokensArray[I] === "read") {
      readStatement();
    } else if (tokensArray[I] === "write") {
      writeStatement();
    } else {
      assignStatement();
    }
  };

  const ifStatement = () => {
    console.log("ifStatement");
    match("if", tokensArray);
    expression();
    match("then", tokensArray);
    statementSequence();
    if (tokensArray[I] === "else") {
      match("else", tokensArray);
      statementSequence();
    }
    match("end", tokensArray);
  };

  const repeatStatement = () => {
    console.log("repeatStatement");
    match("repeat", tokensArray);
    statementSequence();
    match("until", tokensArray);
    expression();
  };

  const assignStatement = () => {
    console.log("assignStatement");
    match("identifier", tokenTypesArray);
    match(":=", tokensArray);
    expression();
  };

  const readStatement = () => {
    console.log("readStatement");
    match("read", tokensArray);
    match("identifier", tokenTypesArray);
  };

  const writeStatement = () => {
    console.log("writeStatement");
    match("read", tokensArray);
    expression();
  };

  const expression = () => {
    console.log("expression");
    simpleExpression();
    if (
      tokensArray[I] === ">" ||
      tokensArray[I] === "<" ||
      tokensArray[I] === "="
    ) {
      comparisonOperator();
      simpleExpression();
    }
  };

  const comparisonOperator = () => {
    console.log("comparisonOperator");
    if (tokensArray[I] === ">") {
      match(">", tokensArray);
    } else if (tokensArray[I] === "<") {
      match("<", tokensArray);
    } else {
      match("=", tokensArray);
    }
  };

  const simpleExpression = () => {
    console.log("simpleExpression");
    term();
    while (tokensArray[I] === "+" || tokensArray[I] === "-") {
      addop();
      term();
    }
  };

  const addop = () => {
    console.log("addop");
    if (tokensArray[I] === "+") {
      match("+", tokensArray);
    } else {
      match("-", tokensArray);
    }
  };

  const term = () => {
    console.log("term");
    factor();
    while (tokensArray[I] === "*" || tokensArray[I] === "/") {
      mulop();
      factor();
    }
  };

  const mulop = () => {
    console.log("mulop");
    if (tokensArray[I] === "*") {
      match("*", tokensArray);
    } else {
      match("/", tokensArray);
    }
  };

  const factor = () => {
    console.log("factor");
    if (tokenTypesArray[I] === "number") {
      match("number", tokenTypesArray);
    } else if (tokenTypesArray[I] === "identifier") {
      match("identifier", tokenTypesArray);
    } else {
      match("(", tokensArray);
      expression();
      match(")", tokensArray);
    }
  };

  //----------------------------------------Helper Functions------------------------------------------

  const match = (k, array) => {
    if (array[I] === k) {
      console.log("matched " + k);
      I++;
    } else {
      error("Can't evaluate " + k);
    }
  };

  const error = message => {
    console.log("An error occured " + message);
  };

  //----------------------------------------MAIN------------------------------------------
  program();
};
