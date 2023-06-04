let resultElement = document.querySelector('.calc-result span');
let numbersElement = document.querySelector('.calc-numbers span');
const buttons = document.querySelectorAll('.buttons button');
const calcContainer = document.querySelector('.calc');
const buts = document.querySelector('.buttons');
const buttonCon = document.getElementById("but-1");
const historyButton = document.getElementById('but-history');

let calculation = '';
let isSum = false;
let isNegative = false;
let numberF = 0;
let numberP = 0;
let numberE = 0;
let numberS = 0;
let numberBr = 0;

let memory = 0;

const Calculation = (math_expr) => {
  const operators = {
    '+': { precedence: 1, execute: (x, y) => x + y },
    '-': { precedence: 1, execute: (x, y) => x - y },
    '*': { precedence: 2, execute: (x, y) => x * y },
    '/': { precedence: 2, execute: (x, y) => x / y },
  };

  const expr_parts = math_expr.match(/[-+]?\d+(?:\.\d+)?|[-+*/()]/g);
  if (expr_parts === null) {
    return "not";
  }

  const outputQueue = [];
  const operatorStack = [];

  expr_parts.forEach((expr_part) => {
    if (operators.hasOwnProperty(expr_part)) {
      const currentOperator = operators[expr_part];
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        ((currentOperator.precedence <= operators[operatorStack[operatorStack.length - 1]].precedence && expr_part !== '-') ||
          (currentOperator.precedence < operators[operatorStack[operatorStack.length - 1]].precedence && expr_part === '-'))) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(expr_part);
    } 
    
    else if (expr_part === '(') {
      operatorStack.push(expr_part);
    } 
    
    else if (expr_part === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue.push(operatorStack.pop());
      }
      if (operatorStack[operatorStack.length - 1] === '(') {
        operatorStack.pop();
      }
    } 
    
    else {
      outputQueue.push(expr_part);
    }
  });

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  const stack = [];
  outputQueue.forEach((token) => {
    if (operators.hasOwnProperty(token)) {
      const operator = operators[token];
      const y = parseFloat(stack.pop());
      const x = parseFloat(stack.pop());
      const result = operator.execute(x, y);
      stack.push(result.toString());
    } else {
      stack.push(token);
    }
  });

  const number = parseFloat(stack.pop());
  let formattedNumber;

  if (Number.isInteger(number)) {
    formattedNumber = number.toFixed(0); 
  } else {
    const decimalDigits = Math.min(10, number.toString().split('.')[1]?.length || 0); 
    formattedNumber = number.toFixed(decimalDigits); 
  }
  return formattedNumber;
}



function clearResult() {
  resultElement.textContent = '';
  numbersElement.textContent = '0';
  calculation = '';
}


function calculateExpression() {
  if (numbersElement.textContent.includes("%") && resultElement.textContent != "Invalid format") {
    calculation = calculation.toString();
    const history = localStorage.getItem("calculator") ? JSON.parse(localStorage.getItem("calculator")) : [];
    history.push(`${numbersElement.textContent} = ${calculation}`);
    localStorage.setItem('calculator', JSON.stringify(history));
    numbersElement.textContent = calculation;
  }

  isSum = true;
  const result = Calculation(calculation.toString());
  if (isNaN(result) || result == "not" || resultElement.textContent == "Invalid format" || numbersElement.textContent == "Invalid format") {
    numbersElement.textContent = "Invalid format";
    calculation = "";
    resultElement.textContent = "";
    return;
  } else if (result == "Infinity" || result == "-Infinity") {
    numbersElement.textContent = "Can't divide by zero";
    resultElement.textContent = "";
    calculation = "";
    return;
  } else { 
    let newCalc = `${numbersElement.textContent} = ${result}`;
    numbersElement.textContent = result;
    resultElement.textContent = '';

    calculation = result.toString(); 
    if (numbersElement.textContent == "Invalid format" ||
    numbersElement.textContent == "Can't divide by zero" ||
    numberS.textContent == "" ||
    result == ""){
      return;
    }
    const history = localStorage.getItem("calculator") ? JSON.parse(localStorage.getItem("calculator")) : [];
    history.push(newCalc);
    localStorage.setItem('calculator', JSON.stringify(history));
  }
}

function handleEquals() {
  calculateExpression();
}


function handleClear() {
  clearResult();
}


function handleClearButton() {
  let temp = null;
  if (calculation.length > 0) {
    if (calculation.charAt(calculation.length - 1) === ' ') {
      calculation = calculation.slice(0, -3);
      temp = numbersElement.textContent.slice(0, -3);
    } 
    else {
      calculation = calculation.slice(0, -1);
      temp =  numbersElement.textContent.slice(0, -1); 
    }
  }
  numbersElement.textContent = temp;
  if (calculation.length === 0) {
    numbersElement.textContent = '0';
  } 
  else {
    let temp = Calculation(calculation); 
    if (isNaN(temp)) {
      resultElement.textContent = "";
    } 
    else {
      resultElement.textContent = temp;
    }
  }
}


function handlePlusMinus() {
  
  if (numbersElement.textContent == "Invalid format" || numbersElement.textContent === '0' ||
    numbersElement.textContent == "Can't divide by zero") {
    numbersElement.textContent = "0";
    resultElement.textContent = "";
  }
  
  if (calculation.includes('-')) {
    calculation = calculation.replace('-', '');
    if (calculation.length == 0 || calculation == "0") {
      numbersElement.textContent = "0";
    } 
    
    else { 
      numbersElement.textContent = calculation;
      resultElement.textContent = Calculation(calculation);
    }
  } 
  
  else {
    if (numbersElement.textContent === '0') {
      calculation = `-${calculation}`;
      numbersElement.textContent = "(-";
    } 
    
    else { 
      calculation = `-${calculation}`;
      numbersElement.textContent = `(-${numbersElement.textContent})`;
      resultElement.textContent = Calculation(calculation);
    }
  }
}

function handleButton(buttonText) {
  const operators = ["+", "-", "*", "/"];
  if (buttonText == "MC" || buttonText == "MR" || buttonText == "M+" || buttonText == "M-" ||
  buttonText == "MU") { 
    numbersElement.textContent = calculation.replaceAll("0");
    resultElement.textContent = "";
    return;
  }
  if (numbersElement.textContent == "(-" && (buttonText == "1" || buttonText == "2" || buttonText == "3"
  || buttonText == "4" || buttonText == "5" || buttonText == "6" || buttonText == "7" ||
  buttonText == "8" || buttonText == "9")) {
    numbersElement.textContent += buttonText;
    calculation += buttonText;
    return;
  }

  if (operators.includes(buttonText)) {
    isSum = false;
  } 

  if (isSum === true && !operators.includes(buttonText)) {
    isSum = false;
    numbersElement.textContent = "";
    calculation = "";
  }

  if (numbersElement.textContent === "0" ||
    numbersElement.textContent === "Invalid format" ||
    numbersElement.textContent === "history" ||
    numbersElement.textContent === "con" ||
    numbersElement.textContent === "big" ||
    numbersElement.textContent.includes("%")) {
    numbersElement.textContent = "";
    resultElement.textContent = "";
    calculation = "";
  }

  let tempOperators = calculation.slice(-3).trim();
  if (operators.includes(tempOperators) && operators.includes(buttonText)) {
    calculation = calculation.slice(0, -3);
    numbersElement.textContent = calculation;
  }

  if (buttonText === "()") {
    const lastChar = calculation.slice(-1);
    const openBracketCount = calculation.split("(").length - 1;
    const closeBracketCount = calculation.split(")").length - 1;
    const openBracketDiff = openBracketCount - closeBracketCount;

    if (numbersElement.textContent.startsWith("(-") && !isNaN(parseInt(calculation.charAt(1)))) {
      numbersElement.textContent += ")";
      let calcul_temp = `(${calculation})`
      calculation = calcul_temp;
    } 
    
    else if (lastChar === ")") {
      calculation += "*(";
      numbersElement.textContent += "*(";
    } 
    
    else if (openBracketDiff > 0 && !isNaN(parseInt(lastChar))) {
      for (let i = 0; i < openBracketDiff; i++) {
        calculation += ")";
        numbersElement.textContent += ")";
      }
    } 
    
    else {
      calculation += "(";
      numbersElement.textContent += "(";
    }
  } 
  
  else if (buttonText === "+" || buttonText === "*" || buttonText === "/") {
    calculation += ` ${buttonText} `;
    numbersElement.textContent += ` ${buttonText} `;
  } 
  
  else if (buttonText === ".") {
    if (numbersElement.textContent == "") { 
      numbersElement.textContent = "0.";
      calculation = numbersElement.textContent;
    } else { 
      numbersElement.textContent += buttonText;
      calculation = numbersElement.textContent;
    }
  } 
  
  else if (buttonText === "-") {
    const lastChar = calculation.slice(-1);
    if (lastChar === "(") {
      numbersElement.textContent += "-";
      calculation = calculation.slice(0, -1);
      calculation += "-";
    } 
    
    else {
      calculation += ` ${buttonText} `;
      numbersElement.textContent += ` ${buttonText} `;
    }
  } 
  
  
  else if (buttonText === "()") {
    const lastChar = calculation.slice(-1);
    const openBracketCount = calculation.split("(").length - 1;
    const closeBracketCount = calculation.split(")").length - 1;
    const openBracketDiff = openBracketCount - closeBracketCount;

    if (lastChar === "-" || lastChar === "") {
      calculation += `(${buttonText})`;
      numbersElement.textContent += `(${buttonText})`;
    } 
    
    
    else if (openBracketDiff > 0) {
      for (let i = 0; i < openBracketDiff; i++) {
        calculation += ")";
        numbersElement.textContent += ")";
      }
    } 
    
    else {
      calculation += buttonText;
      numbersElement.textContent += buttonText;
    }
  } 
  
  else {
    calculation += buttonText;
    numbersElement.textContent += buttonText;
    const currentInput = numbersElement.textContent;
    const hasExponent = currentInput.includes(" ^ ");
    let integerPart = 0;
    if (hasExponent) {
      const exponentIndex = currentInput.indexOf(" ^ ");
      const base = currentInput.substring(0, exponentIndex).trim();
      if (isNegative) {
        const numberRegex = /-?\d+/;
        const match = base.match(numberRegex);
        if (match) {
          integerPart = parseFloat(match[0]);
        }
      } else {
        integerPart = currentInput.substring(0, exponentIndex).trim();
      }
      const exponent = currentInput.substring(exponentIndex + 3).trim();
      if (base !== "" && exponent !== "") {
        const exponentNumber = parseFloat(Calculation(exponent));
        if (!isNaN(integerPart) && !isNaN(exponentNumber)) {
          calculation = Math.pow(integerPart, exponentNumber).toString();
          resultElement.textContent = calculation;
          return;
        }
      }
    }
  
  }
  
  let temp = Calculation(calculation);
  if (isNaN(temp)) {
    resultElement.textContent = "";
  } 
  
  else if (temp === "Infinity" || temp === "-Infinity") {
    resultElement.textContent = "Can't divide by zero";
  } 

  else {
    resultElement.textContent = temp;
  }
  isResultDisplayed = true;
  calcContainer.scrollLeft = calcContainer.scrollWidth;
}

function factorial(n) {
  if (n < 0) {
    return "Invalid format";
  }
  
  let result = 1;
  
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result == "Infinity" ? "Invalid format" : result;
}

function decodeHTMLEntities(text) {
  var txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    let buttonText = button.textContent;
    if (decodeHTMLEntities(buttonText) === "×") {
      buttonText = "*";
    }
    if (decodeHTMLEntities(buttonText) === "÷") {
      buttonText = "/";
    }
    console.log(buttonText);
    resultElement.textContent = '';
    if ( buttonText == "M+" ||
    buttonText == "M-" || buttonText == "MU") {
      numbersElement.textContent = calculation;
    }
    if (buttonText === 'C') {
      numberBr = 0;
      numberP = 0;
      numberE = 0;
      numberF = 0;
      numberS = 0;
      handleClear();
    } 
    
    else if (buttonText === '=') {
      numberBr = 0;
      numberP = 0;
      numberE = 0;
      numberF = 0;
      numberS = 0;
      handleEquals();
    } 
    
    else if (buttonText === '⌫') {
      numberBr = 0;
      numberP = 0;
      numberE = 0;
      numberF = 0;
      numberS = 0;
      handleClearButton();
    } 
    
    else if (buttonText === '+/-') {
      numberBr += 1;
      numberP = 0;
      numberE = 0;
      numberF = 0;
      numberS = 0;
      handlePlusMinus();
    }
    
    else if (buttonText === "%") { 
      numberBr = 0;
      numberP += 1; 
      if (numberP > 1) {
        resultElement.textContent = calculation;
        return;
      }
      const operators = [" + ", " - ", " * ", " / "];
      if (numbersElement.textContent == "0" || numbersElement.textContent == "Invalid format" ||
      numbersElement.textContent == "%" || numbersElement.textContent == "!" || numbersElement.textContent == "^" || numbersElement.textContent == "√" ) {
        numbersElement.textContent = "%";
      } else {
        numbersElement.textContent += "%";
      }
      let temp1 = parseFloat(Calculation(calculation));
      if (operators.some(op => numbersElement.textContent.includes(op)) ||
      isNaN(temp1)) {
        resultElement.textContent = "Invalid format";
        return;
      }
      calculation = temp1/ 100;
      resultElement.textContent = calculation.toString(); 
    }

    else if (buttonText === "x!") {
      numberBr = 0;
      numberF += 1; 
      if (numberF > 1) {
        resultElement.textContent = calculation;
        return;
      }
      const operators = [" + ", " - ", " * ", " / "];
      let currentInput;
      if (numbersElement.textContent == "0" || numbersElement.textContent == "Invalid format" ||
      numbersElement.textContent == "%" || numbersElement.textContent == "!" || numbersElement.textContent == "^" || numbersElement.textContent == "√" ) {
        numbersElement.textContent = "!";
      } else {
        currentInput = numbersElement.textContent;
        numbersElement.textContent += "!";
      }
      const number = parseFloat(currentInput);
    
      if (isNaN(number) || !Number.isInteger(number) || number < 0 ||
      operators.some(op => numbersElement.textContent.includes(op))) {
        resultElement.textContent = "Invalid format";
        calculation = "";
      } 
      else {
        const factorialResult = factorial(number);
        calculation = factorialResult.toString();
        resultElement.textContent = calculation;
      }
    }  
    
    else if (buttonText === "xn") {
      numberE += 1; 
      if (numberE > 1) {
        return;
      }
      if (numbersElement.textContent == "0" || numbersElement.textContent == "Invalid format" || 
      numbersElement.textContent == "%" || numbersElement.textContent == "!" || numbersElement.textContent == "^" || numbersElement.textContent == "√" ) {
        numbersElement.textContent = "^";
      } else {
        numbersElement.textContent += " ^ ";
      }
      if (calculation < 0) {
        isNegative = true;
      }
    }

    else if (buttonText === "√x") {
      numberBr = 0;
      numberS += 1;
      if (numberS > 1) {
        resultElement.textContent = calculation;
        return;
      }
      let currentInput;
      if (
        numbersElement.textContent === "0" ||
        numbersElement.textContent === "Invalid format" ||
        numbersElement.textContent === "%" ||
        numbersElement.textContent === "!" ||
        numbersElement.textContent === "^" ||
        numbersElement.textContent === "√"
      ) {
        numbersElement.textContent = "√";
      } else {
        currentInput = calculation;
        numbersElement.textContent = `√${currentInput}`;
      }
      const number = parseFloat(currentInput);
      if (isNaN(number) || number < 0 || !Number.isInteger(number)) {
        resultElement.textContent = "Invalid format";
        calculation = "";
      } else {
        const sqrtResult = Math.sqrt(number);
        if (isNaN(sqrtResult)) {
          resultElement.textContent = "Invalid format";
          calculation = "";
        } else {
          calculation = sqrtResult.toFixed(0);
          resultElement.textContent = calculation;
        }
      }
    }
    
    else if (buttonText === "π") {
      numberBr = 0;
      let currentInput;
      if (
        numbersElement.textContent === "0" ||
        numbersElement.textContent === "Invalid format" ||
        numbersElement.textContent === "%" ||
        numbersElement.textContent === "!" ||
        numbersElement.textContent === "^" ||
        numbersElement.textContent === "√"
      ) {
        numbersElement.textContent = "3.14";
        calculation = "3.14";
      } else {
        currentInput = calculation;
        if (currentInput === "") {
          numbersElement.textContent = "3.14 ";
          calculation = "3.14 ";
        }
        const lastChar = currentInput[currentInput.length - 2];
        const operators = ["+", "-", "*", "/"];
        if (operators.includes(lastChar)) {
          numbersElement.textContent += 3.14;
          calculation = Calculation(currentInput += 3.14);
        } 
        else { 
          numbersElement.textContent = `${currentInput} * 3.14`;
          calculation = Calculation(numbersElement.textContent);
        }
      }
      if (isNaN(calculation)) {
        numbersElement.textContent = "Invalid format";
      } else { 
        resultElement.textContent = calculation;
      }
    }
    
    else {
      numberBr = 0;
      numberP = 0;
      numberE = 0;
      numberF = 0;
      numberS = 0;
      handleButton(buttonText);
    }
  });
});


function clearMemory() {
  numbersElement.textContent = "0";
  resultElement.textContent = "";
  calculation = "0";
  memory = 0;
}

function recallMemory() {
  calculation += memory.toString();
  numbersElement.textContent = calculation;
  console.log(numbersElement.textContent);
}

function addToMemory() {
  const currentValue = parseFloat(calculation);
  numbersElement.textContent = currentValue;
  resultElement.textContent = "";
  if (!isNaN(currentValue)) {
    memory += currentValue;
  }
}


function subtractFromMemory() {
  const currentValue = parseFloat(calculation);
  numbersElement.textContent = currentValue;
  resultElement.textContent = "";
  if (!isNaN(currentValue)) {
    memory -= currentValue;
  }
}

function multiplyMemory() {
  const currentValue = parseFloat(calculation);
  numbersElement.textContent = currentValue;
  resultElement.textContent = "";
  if (!isNaN(currentValue)) {
    memory *= currentValue;
  }
}

