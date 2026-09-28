const display = document.getElementById('display');
const previousOpDisplay = document.getElementById('previous-op');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.innerText = currentInput;
  if (operator !== null) {
    previousOpDisplay.innerText = `${previousInput} ${operator}`;
  } else {
    previousOpDisplay.innerText = '';
  }
}

function appendNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number === '.' ? '0.' : number;
    shouldResetDisplay = false;
  } else {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator !== null && !shouldResetDisplay) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  shouldResetDisplay = true;
  updateDisplay();
}

function calculate() {
  if (operator === null || shouldResetDisplay) return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current === 0 ? 'Erro' : prev / current;
      break;
    case '%':
      result = (prev * current) / 100;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (shouldResetDisplay) return;
  
  if (currentInput.length === 1 || currentInput === 'Erro') {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}