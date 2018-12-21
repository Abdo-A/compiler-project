const parseCodeAndShowResult = () => {
  parserFunction();

  dictionary.forEach((statement) => {
    parserPart.innerHTML += `
      <div class="statementContainer" style="margin-left:${statement.order *
        200}px;top:${statement.level * 200}px">
          <img src="assets/reactangle.png" class="rectangleImage" />
          <h3 class="statementName">${statement.name}</h3>
          <div class="line"></div>
      </div>
      `;
  });

  //<img src="assets/oval.png" class="ovalImage" />
};
