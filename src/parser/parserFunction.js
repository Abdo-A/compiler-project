const parserFunction = () => {
  I = 0; //global holder for the current index of the token types array produced by scanner

  let dictionary = []; //array that has all the statements and info about them

  let currentLevel = 1; //current level of statement

  let orders = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 };

  //We have access to tokensArray

  //We have access to tokenTypesArray

  //----------------------------------------Non-Terminal Functions------------------------------------------

  const program = () => {
    statementSequence();
  };

  const statementSequence = (fatherLevel, fatherOrder) => {
    //console.log("statementSequence");
    statement(fatherLevel, fatherOrder);
    while (tokenTypesArray[I] === "semicolon") {
      match("semicolon", tokenTypesArray);
      statement(fatherLevel, fatherOrder);
    }
  };

  const statement = (fatherLevel, fatherOrder) => {
    //console.log("statement");
    if (tokensArray[I] === "if") {
      ifStatement(fatherLevel, fatherOrder);
    } else if (tokensArray[I] === "repeat") {
      repeatStatement(fatherLevel, fatherOrder);
    } else if (tokensArray[I] === "read") {
      readStatement(fatherLevel, fatherOrder);
    } else if (tokensArray[I] === "write") {
      writeStatement(fatherLevel, fatherOrder);
    } else {
      assignStatement(fatherLevel, fatherOrder);
    }
    orders[currentLevel]++;
  };

  const ifStatement = (fatherLevel, fatherOrder) => {
    dictionary.push({
      name: "ifStatement",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder
    });

    console.log("ifStatement");

    match("if", tokensArray);

    expression();

    match("then", tokensArray);

    const myLevel = currentLevel;

    currentLevel++;
    statementSequence(myLevel, orders[myLevel]);
    currentLevel--;

    if (tokensArray[I] === "else") {
      match("else", tokensArray);

      currentLevel++;
      statementSequence(myLevel, orders[myLevel]);
      currentLevel--;
    }
    match("end", tokensArray);
  };

  const repeatStatement = (fatherLevel, fatherOrder) => {
    dictionary.push({
      name: "repeatStatement",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder
    });

    console.log("repeatStatement");
    match("repeat", tokensArray);

    const myLevel = currentLevel;

    currentLevel++;
    statementSequence(myLevel, orders[myLevel]);
    currentLevel--;

    match("until", tokensArray);

    expression();
  };

  const assignStatement = (fatherLevel, fatherOrder) => {
    dictionary.push({
      name: "assignStatement",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder
    });

    console.log(`assignStatement for ${tokensArray[I]}`);
    match("identifier", tokenTypesArray);
    match(":=", tokensArray);

    expression();
  };

  const readStatement = (fatherLevel, fatherOrder) => {
    dictionary.push({
      name: "readStatement",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder
    });

    console.log(`readStatement for ${tokensArray[I + 1]}`);
    match("read", tokensArray);
    match("identifier", tokenTypesArray);
  };

  const writeStatement = (fatherLevel, fatherOrder) => {
    dictionary.push({
      name: "writeStatement",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder
    });

    console.log(`writeStatement for ${tokensArray[I + 1]}`);
    match("write", tokensArray);

    expression();
  };

  const expression = () => {
    //console.log("expression");
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
    //console.log("comparisonOperator");
    console.log(
      `comparison operation between ${tokensArray[I - 1]} and ${
        tokensArray[I + 1]
      }`
    );
    if (tokensArray[I] === ">") {
      match(">", tokensArray);
    } else if (tokensArray[I] === "<") {
      match("<", tokensArray);
    } else {
      match("=", tokensArray);
    }
  };

  const simpleExpression = () => {
    //console.log("simpleExpression");
    term();
    while (tokensArray[I] === "+" || tokensArray[I] === "-") {
      addop();
      term();
    }
  };

  const addop = () => {
    //console.log("addop");
    console.log(
      `adding operation between ${tokensArray[I - 1]} and ${tokensArray[I + 1]}`
    );
    if (tokensArray[I] === "+") {
      match("+", tokensArray);
    } else {
      match("-", tokensArray);
    }
  };

  const term = () => {
    //console.log("term");
    factor();
    while (tokensArray[I] === "*" || tokensArray[I] === "/") {
      mulop();
      factor();
    }
  };

  const mulop = () => {
    //console.log("mulop");
    console.log(
      `multiplication operation between ${tokensArray[I - 1]} and ${
        tokensArray[I + 1]
      }`
    );
    if (tokensArray[I] === "*") {
      match("*", tokensArray);
    } else {
      match("/", tokensArray);
    }
  };

  const factor = () => {
    //console.log("factor");
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
      //console.log("matched " + k);
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
  console.log(dictionary);
};
