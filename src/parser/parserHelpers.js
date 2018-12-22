const parseCodeAndShowResult = () => {
  document.getElementById("parserPart").innerHTML = "";

  parserFunction();

  dictionary.forEach((statement) => {
    parserPart.innerHTML += `
      <div id="${statement.name +
        statement.level +
        statement.order}" class="statementContainer" style="left:${statement.order *
      200}px;top:${statement.level * 200}px">
          <img src="assets/reactangle.png" class="rectangleImage" />
          <h3 class="statementName">${statement.name}</h3>
          <div class="line"></div>
      </div>
      `;
    showPart("parser");
  });

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
            statement1.order * 200,
            statement1.level * 200,
            statement2.order * 200,
            statement2.level * 200
          )
        );
      }
    });
  });

  //<img src="assets/oval.png" class="ovalImage" />
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
