//Variables:
const codeContainer = document.getElementById("codeContainer");
const table = document.getElementsByTagName("table")[0];
const fileInputContainer = document.getElementById("fileInputContainer");

//Focus on input
codeContainer.focus();

//Scan Written Code
const scanWrittenCode = () => {
  //get code
  let code = codeContainer.value;

  scanCodeAndShowResult(code);
};

//Scan File Code
const scanFileCode = () => {
  //get code
  const reader = new FileReader();
  const file = document.getElementById("file").files[0];
  let code;
  reader.addEventListener("load", () => {
    code = reader.result;
    console.log(reader.result);
  });
  reader.readAsText(file, "UTF-8");

  setTimeout(() => {
    scanCodeAndShowResult(code);
  }, 200);
};

const scanCodeAndShowResult = code => {
  //clear output
  table.innerHTML = `<tr>
  <th>Token</th>
  <th>Token Type</th>
</tr>
  `;

  //scan code
  scannerFunction(code);

  //show result
  for (let i = 0; i < tokensArray.length; i++) {
    table.innerHTML += `
    <tr>
        <td>${tokensArray[i]}</td>
        <td>${tokenTypesArray[i]}</td>
    </tr>
    `;
  }
};

const saveFile = () => {
  //save result into a string
  let fileOutput = "";

  for (let i = 0; i < tokensArray.length; i++) {
    fileOutput = fileOutput.concat(
      `${tokensArray[i]} -> ${tokenTypesArray[i]} \r\n`
    );
  }

  var saveFileButton = document.getElementById("saveFileButton");
  var file = new Blob([fileOutput], { type: "text/plain" });
  saveFileButton.href = URL.createObjectURL(file);
  saveFileButton.download = "scannerOutput.txt";
};
