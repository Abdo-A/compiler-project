const parserFunction = () => {
  I = 0; //global holder for the current index of the token types array produced by scanner

  while (I < tokenTypesArray.length) {
    parserPart.innerHTML += tokenTypesArray[I] + "<br/>";
    I++;
  }
};
