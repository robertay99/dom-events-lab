/*-------------------------------- Constants --------------------------------*/
const calculator = document.querySelector("#calculator");

/*-------------------------------- Variables --------------------------------*/
let currentInput = "";
let previousInput = "";
let operator = "";
let awaitingNextInput = false; 

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector(".display");

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("number")) {
    handleNumber(target.innerText);
  } else if (target.classList.contains("operator")) {
    handleOperator(target.innerText);
  } else if (target.classList.contains("equals")) {
    handleEquals();
  }
});

/*-------------------------------- Functions --------------------------------*/
const handleNumber = (number) => {
  if (awaitingNextInput) {
    currentInput = number;
    awaitingNextInput = false;
  } else {
    currentInput += number;
  }
  updateDisplay(currentInput);
};

const handleOperator = (op) => {
  if (op === "C") {
    clearCalculator();
    return;
  }

  if (currentInput === "" && op === "-") {
    currentInput = "-";
    updateDisplay(currentInput);
    return;
  }

  if (previousInput === "") {
    previousInput = currentInput;
  } else if (currentInput !== "") {
    previousInput = doCalculation();
  }

  operator = op;
  awaitingNextInput = true;
  updateDisplay(operator);
};

const handleEquals = () => {
  if (currentInput === "" || previousInput === "" || operator === "") {
    return;
  }

  currentInput = doCalculation();
  previousInput = "";
  operator = "";
  updateDisplay(currentInput);
  awaitingNextInput = true;
};

const doCalculation = () => {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error";
      break;
    default:
      return;
  }

  return result.toString();
};

const updateDisplay = (content) => {
  display.innerText = content;
};

const clearCalculator = () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  awaitingNextInput = false;
  updateDisplay("");
};
