//Variables:
const codeContainer = document.getElementById("codeContainer");

const codePart = document.getElementById("codePart");
const scannerPart = document.getElementById("scannerPart");
const parserPart = document.getElementById("parserPart");

const table = document.getElementsByTagName("table")[0];
const fileInputContainer = document.getElementById("fileInputContainer");

const choiceButton1 = document.getElementById("choiceButton1");
const choiceButton2 = document.getElementById("choiceButton2");
const choiceButton3 = document.getElementById("choiceButton3");

//Focus on input
codeContainer.focus();

//Handle clicking top buttons
const showPart = indicator => {
  if (indicator === "code") {
    choiceButton1.classList.remove("disabledButton");
    choiceButton2.classList.add("disabledButton");
    choiceButton3.classList.add("disabledButton");

    codePart.classList.remove("dontShow");
    scannerPart.classList.add("dontShow");
    parserPart.classList.add("dontShow");
  } else if (indicator === "scanner") {
    choiceButton1.classList.add("disabledButton");
    choiceButton2.classList.remove("disabledButton");
    choiceButton3.classList.add("disabledButton");

    codePart.classList.add("dontShow");
    scannerPart.classList.remove("dontShow");
    parserPart.classList.add("dontShow");
  } else if (indicator === "parser") {
    choiceButton1.classList.add("disabledButton");
    choiceButton2.classList.add("disabledButton");
    choiceButton3.classList.remove("disabledButton");

    codePart.classList.add("dontShow");
    scannerPart.classList.add("dontShow");
    parserPart.classList.remove("dontShow");
  }
};
