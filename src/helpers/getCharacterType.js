const isLetter = character => {
  return character.match(/[a-z]/i) !== null;
};

const isNumber = character => {
  return character.match(/[0-9]/) !== null;
};

module.exports = {
  isLetter,
  isNumber
};
