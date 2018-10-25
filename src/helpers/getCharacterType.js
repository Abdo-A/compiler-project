const isLetter = character => {
  if (character.match(/[a-z]/i)) return character;
  else return null;
};

const isNumber = character => {
  if (character.match(/[0-9]/)) return character;
  else return null;
};

module.exports = {
  isLetter,
  isNumber
};
