let expressionsInfo = {}; // The object that will have expressions info for all statements

const parseCodeAndShowResult = () => {
  document.getElementById("parserPart").innerHTML = "";

  parserFunction();

  parserPart.innerHTML += `<p>Make sure to click on each statement, in order to view its expressions ^__^</p>
    <p>Special thanks to our amazing TAs, Mai and Yomna.</p>
    `;

  dictionary.forEach((statement) => {
    parserPart.innerHTML += `
      <div id="${statement.name +
        statement.level +
        statement.order}" class="statementContainer" style="left:${statement.order *
      220}px;top:${statement.level * 220}px;${
      statement.name == "read" ? "" : "cursor:pointer"
    }" onclick="toggleMyExpressions('${statement.name +
      statement.level +
      statement.order}')">
          <img src="assets/reactangle.png" class="rectangleImage" />
          <h3 class="statementName">${statement.name}</h3>

          ${
            statement.name == "read"
              ? `<h3 class="statementName extraVariable">(${
                  statement.readVariable
                })</h3>`
              : ""
          }

          ${
            statement.name == "assign"
              ? `<h3 class="statementName extraVariable">(${
                  statement.assignVariable
                })</h3>`
              : ""
          }

          <div class="line"></div>
      </div>
      `;
    expressionsInfo[statement.name + statement.level + statement.order] =
      statement.expression;
  });

  showPart("parser");

  dictionary.forEach((statement1) => {
    dictionary.forEach((statement2) => {
      if (
        statement1.fatherLevel &&
        statement1.fatherOrder &&
        statement1.fatherLevel == statement2.level &&
        statement1.fatherOrder == statement2.order
      ) {
        console.log(`line between ${statement1.name} and ${statement2.name}`);

        parserPart.appendChild(
          createLine(
            statement1.order * 220,
            statement1.level * 220,
            statement2.order * 220,
            statement2.level * 220
          )
        );
      }
    });
  });
};

const toggleMyExpressions = (statementID) => {
  card.innerHTML = "";

  card.innerHTML += `<p class="closeCardX" onclick="closeCard()">x</p>`;

  const expression = expressionsInfo[statementID];
  console.log(expression);
  if (!card.classList.contains("dontShow")) {
    card.classList.add("dontShow");
    return;
  }
  if (!expression) {
    return;
  }

  card.classList.remove("dontShow");

  if (!expression.expressionParameter2) {
    card.innerHTML += `
    <div class="ovalImageContainer">
      <img src="assets/oval.png"/>
      <h3 class="topExpressionName">${expression.expressionType}</h3>
      <h3 class="topExpressionName bottomExpressionName">(${
        expression.expressionParameter1
      })</h3>
    </div>
    `;
    return;
  }

  let parameter2;
  if (typeof expression.expressionParameter2 == "object") {
    parameter2 = JSON.stringify(expression.expressionParameter2);
  } else {
    parameter2 = expression.expressionParameter2;
  }

  card.innerHTML += `
  <h4 style="font-weight:bold">Expression Type: ${expression.expressionSign}<h4>
  <h4 style="font-weight:bold">First Parameter: ${
    expression.expressionParameter1
  }<h4>
  <h4 style="font-weight:bold">Second Parameter: ${parameter2}<h4>
  `;
};

const closeCard = () => {
  card.classList.add("dontShow");
};

// Third party helpers

function createLine(x1, y1, x2, y2) {
  var a = x1 - x2,
    b = y1 - y2,
    c = Math.sqrt(a * a + b * b);

  var sx = (x1 + x2) / 2,
    sy = (y1 + y2) / 2;

  var x = sx - c / 2,
    y = sy;

  var alpha = Math.PI - Math.atan2(-b, a);

  return createLineElement(x, y, c, alpha);
}

function createLineElement(x, y, length, angle) {
  var line = document.createElement("div");
  var styles =
    "border: 1px solid black; " +
    "width: " +
    length +
    "px; " +
    "height: 0px; " +
    "-moz-transform: rotate(" +
    angle +
    "rad); " +
    "-webkit-transform: rotate(" +
    angle +
    "rad); " +
    "-o-transform: rotate(" +
    angle +
    "rad); " +
    "-ms-transform: rotate(" +
    angle +
    "rad); " +
    "position: absolute; " +
    "top: " +
    y +
    "px; " +
    "left: " +
    x +
    "px; ";
  line.setAttribute("style", styles);
  return line;
}
