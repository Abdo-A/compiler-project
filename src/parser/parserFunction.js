let dictionary = []; //array that has all the statements and info about them

const parserFunction = () => {
  I = 0; //global holder for the current index of the token types array produced by scanner

  let currentLevel = 1; //current level of statement

  let orders = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 };

  //We have access to tokensArray

  //We have access to tokenTypesArray

  //----------------------------------------Non-Terminal Functions------------------------------------------

  const program = () => {
    statementSequence();
  };

  const statementSequence = (fatherLevel, fatherOrder) => {
    const setFatherLevelAndOrder = (level, order) => {
      fatherLevel = level;
      fatherOrder = order;
    };
    //console.log("statementSequence");
    statement(fatherLevel, fatherOrder, setFatherLevelAndOrder);
    while (tokenTypesArray[I] === "semicolon") {
      match("semicolon", tokenTypesArray);
      statement(fatherLevel, fatherOrder, setFatherLevelAndOrder);
    }
  };

  const statement = (fatherLevel, fatherOrder, setFatherLevelAndOrder) => {
    //console.log("statement");
    if (tokensArray[I] === "if") {
      ifStatement(fatherLevel, fatherOrder, setFatherLevelAndOrder);
    } else if (tokensArray[I] === "repeat") {
      repeatStatement(fatherLevel, fatherOrder, setFatherLevelAndOrder);
    } else if (tokensArray[I] === "read") {
      readStatement(fatherLevel, fatherOrder, setFatherLevelAndOrder);
    } else if (tokensArray[I] === "write") {
      writeStatement(fatherLevel, fatherOrder, setFatherLevelAndOrder);
    } else {
      assignStatement(fatherLevel, fatherOrder, setFatherLevelAndOrder);
    }
    orders[currentLevel]++;
  };

  const ifStatement = (fatherLevel, fatherOrder, setFatherLevelAndOrder) => {
    let myIdentity = {
      name: "if",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder
    };
    setFatherLevelAndOrder(currentLevel, orders[currentLevel]);
    console.log("ifStatement");

    match("if", tokensArray);

    let expressionType;
    let expressionSign;
    let expressionParameter1;
    let expressionParameter2;

    const expressionSetter = (type, sign, parameter1, parameter2) => {
      if (
        expressionParameter2 &&
        expressionParameter2.expressionParameter2 &&
        expressionParameter2.expressionParameter2.expressionParameter2
      ) {
        expressionParameter2.expressionParameter2.expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else if (
        expressionParameter2 &&
        expressionParameter2.expressionParameter2
      ) {
        expressionParameter2.expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else if (expressionParameter2) {
        expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else {
        expressionType = type;
        expressionSign = sign;
        expressionParameter1 = parameter1;
        expressionParameter2 = parameter2;
      }
    };

    expression(expressionSetter);

    myIdentity["expression"] = {
      expressionType,
      expressionSign,
      expressionParameter1,
      expressionParameter2
    };

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

    dictionary.push(myIdentity);
  };

  const repeatStatement = (
    fatherLevel,
    fatherOrder,
    setFatherLevelAndOrder
  ) => {
    let myIdentity = {
      name: "repeat",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder
    };
    setFatherLevelAndOrder(currentLevel, orders[currentLevel]);

    console.log("repeatStatement");
    match("repeat", tokensArray);

    const myLevel = currentLevel;

    currentLevel++;
    statementSequence(myLevel, orders[myLevel]);
    currentLevel--;

    match("until", tokensArray);

    let expressionType;
    let expressionSign;
    let expressionParameter1;
    let expressionParameter2;

    const expressionSetter = (type, sign, parameter1, parameter2) => {
      if (
        expressionParameter2 &&
        expressionParameter2.expressionParameter2 &&
        expressionParameter2.expressionParameter2.expressionParameter2
      ) {
        expressionParameter2.expressionParameter2.expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else if (
        expressionParameter2 &&
        expressionParameter2.expressionParameter2
      ) {
        expressionParameter2.expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else if (expressionParameter2) {
        expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else {
        expressionType = type;
        expressionSign = sign;
        expressionParameter1 = parameter1;
        expressionParameter2 = parameter2;
      }
    };

    expression(expressionSetter);

    myIdentity["expression"] = {
      expressionType,
      expressionSign,
      expressionParameter1,
      expressionParameter2
    };

    dictionary.push(myIdentity);
  };

  const assignStatement = (
    fatherLevel,
    fatherOrder,
    setFatherLevelAndOrder
  ) => {
    let myIdentity = {
      name: "assign",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder,
      assignVariable: tokensArray[I]
    };

    setFatherLevelAndOrder(currentLevel, orders[currentLevel]);

    console.log(`assignStatement for ${tokensArray[I]}`);
    match("identifier", tokenTypesArray);
    match(":=", tokensArray);

    let expressionType;
    let expressionSign;
    let expressionParameter1;
    let expressionParameter2;

    const expressionSetter = (type, sign, parameter1, parameter2) => {
      if (
        expressionParameter2 &&
        expressionParameter2.expressionParameter2 &&
        expressionParameter2.expressionParameter2.expressionParameter2
      ) {
        expressionParameter2.expressionParameter2.expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else if (
        expressionParameter2 &&
        expressionParameter2.expressionParameter2
      ) {
        expressionParameter2.expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else if (expressionParameter2) {
        expressionParameter2 = {
          expressionType: type,
          expressionSign: sign,
          expressionParameter1: parameter1,
          expressionParameter2: parameter2
        };
      } else {
        expressionType = type;
        expressionSign = sign;
        expressionParameter1 = parameter1;
        expressionParameter2 = parameter2;
      }
    };

    expression(expressionSetter);

    myIdentity["expression"] = {
      expressionType,
      expressionSign,
      expressionParameter1,
      expressionParameter2
    };

    dictionary.push(myIdentity);
  };

  const readStatement = (fatherLevel, fatherOrder, setFatherLevelAndOrder) => {
    dictionary.push({
      name: "read",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder,
      readVariable: tokensArray[I + 1]
    });

    setFatherLevelAndOrder(currentLevel, orders[currentLevel]);

    console.log(`readStatement for ${tokensArray[I + 1]}`);
    match("read", tokensArray);
    match("identifier", tokenTypesArray);
  };

  const writeStatement = (fatherLevel, fatherOrder, setFatherLevelAndOrder) => {
    dictionary.push({
      name: "write",
      level: currentLevel,
      order: orders[currentLevel],
      fatherLevel,
      fatherOrder,
      writeVariable: tokensArray[I + 1],
      writeVariableType: tokenTypesArray[I + 1]
    });

    setFatherLevelAndOrder(currentLevel, orders[currentLevel]);

    console.log(`writeStatement for ${tokensArray[I + 1]}`);
    match("write", tokensArray);

    expression();
  };

  const expression = (expressionTypeSetter) => {
    // console.log("expression");
    simpleExpression(expressionTypeSetter);
    if (
      tokensArray[I] === ">" ||
      tokensArray[I] === "<" ||
      tokensArray[I] === "="
    ) {
      comparisonOperator(expressionTypeSetter);
      simpleExpression();
    }
  };

  const comparisonOperator = (expressionTypeSetter) => {
    // console.log("comparisonOperator");
    console.log(
      `comparison operation between ${tokensArray[I - 1]} and ${
        tokensArray[I + 1]
      }`
    );

    if (expressionTypeSetter) {
      expressionTypeSetter(
        "op",
        tokensArray[I],
        tokensArray[I - 1],
        tokensArray[I + 1]
      );
    }

    if (tokensArray[I] === ">") {
      match(">", tokensArray);
    } else if (tokensArray[I] === "<") {
      match("<", tokensArray);
    } else {
      match("=", tokensArray);
    }
  };

  const simpleExpression = (expressionTypeSetter) => {
    // console.log("simpleExpression");
    term(expressionTypeSetter);
    while (tokensArray[I] === "+" || tokensArray[I] === "-") {
      addop(expressionTypeSetter);
      term();
    }
  };

  const addop = (expressionTypeSetter) => {
    // console.log("addop");
    console.log(
      `adding operation between ${tokensArray[I - 1]} and ${tokensArray[I + 1]}`
    );

    if (expressionTypeSetter) {
      expressionTypeSetter(
        "op",
        tokensArray[I],
        tokensArray[I - 1],
        tokensArray[I + 1]
      );
    }

    if (tokensArray[I] === "+") {
      match("+", tokensArray);
    } else {
      match("-", tokensArray);
    }
  };

  const term = (expressionTypeSetter) => {
    // console.log("term");
    factor(expressionTypeSetter);
    while (tokensArray[I] === "*" || tokensArray[I] === "/") {
      mulop(expressionTypeSetter);
      factor();
    }
  };

  const mulop = (expressionTypeSetter) => {
    // console.log("mulop");
    console.log(
      `multiplication operation between ${tokensArray[I - 1]} and ${
        tokensArray[I + 1]
      }`
    );

    if (expressionTypeSetter) {
      expressionTypeSetter(
        "op",
        tokensArray[I],
        tokensArray[I - 1],
        tokensArray[I + 1]
      );
    }

    if (tokensArray[I] === "*") {
      match("*", tokensArray);
    } else {
      match("/", tokensArray);
    }
  };

  const factor = (expressionTypeSetter) => {
    // console.log("factor");
    if (expressionTypeSetter)
      expressionTypeSetter("const", null, tokensArray[I], null);

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

  const error = (message) => {
    console.log("An error occured " + message);
  };

  //----------------------------------------MAIN------------------------------------------
  program();

  dictionary.sort((item1, item2) => {
    if (item1.level == item2.level) {
      return item1.order - item2.order;
    } else {
      return item1.level - item2.level;
    }
  });

  console.log(dictionary);
};
