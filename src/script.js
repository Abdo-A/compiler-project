document.getElementById("codeContainer").focus();

const startScanner = () => {
  //get code
  let code = document.getElementById("codeContainer").value;

  //scan code
  scannerFunction(code);

  //show result
  for (let i = 0; i < tokensArray.length; i++) {
    document.getElementsByTagName("table")[0].innerHTML += `
    <tr>
        <td>${tokensArray[i]}</td>
        <td>${tokenTypesArray[i]}</td>
    </tr>
    `;
  }
};
