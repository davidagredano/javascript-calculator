let storedNumber;
let operator;

let display = {
  value: "0",
  DOMElement: document.getElementById("display"),
  append(str) {
    this.value += str;
    this.updateDOM();
  },
  replace(str) {
    this.value = str;
    this.updateDOM();
  },
  updateDOM() {
    this.DOMElement.innerText = this.value;
  },
  clearValue() {
    this.value = "";
  },
};

// Button click handlers
const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", (e) => {
  const isNumberButton = e.target.classList.contains("number");
  const isOperatorButton = e.target.classList.contains("operator");
  const isEqualsButton = e.target.id === "equals";
  const isClearButton = e.target.id === "clear";
  if (isClearButton) {
    display.replace("0");
    storedNumber = null;
    operator = null;
  } else if (isNumberButton) {
    const numberClicked = e.target.innerText;
    if (display.value === "0") {
      display.replace(numberClicked);
    } else {
      display.append(numberClicked);
    }
  } else if (isEqualsButton || (isOperatorButton && operator)) {
    // Check any missing element
    const storedNumberExist = storedNumber || storedNumber === 0;
    const displayValueExist = display.value || display.value === "0";
    console.table({ storedNumberExist, displayValueExist });
    if (storedNumberExist && operator && displayValueExist) {
      // Handle divide by 0 error
      if (operator === "/" && display.value === "0") {
        alert("#DIV/0! error");
        display.replace("");
        storedNumber = null;
        operator = null;
        return;
      }

      // Show the result
      const result = operate(operator, storedNumber, Number(display.value));
      display.replace(hasLongDecimals(result) ? result.toFixed(5) : result);

      // Reset variables
      storedNumber = result;
      display.clearValue();
      if (isEqualsButton) {
        operator = null;
      } else if (isOperatorButton && operator) {
        operator = e.target.innerText;
      }
    }
  } else if (isOperatorButton) {
    storedNumber = storedNumber ?? Number(display.value);
    operator = e.target.innerText;
    display.clearValue();
  }
});

// Operations
function operate(operator, a, b) {
  if (operator === "+") return a + b;
  else if (operator === "-") return a - b;
  else if (operator === "*") return a * b;
  else if (operator === "/") return a / b;
}

// Helpers
function hasLongDecimals(num) {
  sumString = num.toString();
  var decimalIndex = sumString.indexOf(".");
  return decimalIndex === -1
    ? false
    : sumString.slice(decimalIndex + 1).length > 5;
}
