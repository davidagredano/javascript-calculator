let storedNumber;
let operator;

let display = {
  value: "",
  DOMElement: document.getElementById("display"),
  append(str) {
    this.value += str;
    this.update();
  },
  replace(str) {
    this.value = str;
    this.update();
  },
  update() {
    this.DOMElement.innerText = this.value;
  },
  clearValue() {
    this.value = "";
  },
};

const displayValue = display.value;
console.table({ storedNumber, operator, displayValue });

// Button click handlers
const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", (e) => {
  const isNumberButton = e.target.classList.contains("number");
  const isOperatorButton = e.target.classList.contains("operator");
  const isEqualsButton = e.target.id === "equals";
  const isClearButton = e.target.id === "clear";
  console.log(isClearButton);
  if (isClearButton) {
    display.replace("");
    storedNumber = null;
    operator = null;
  } else if (isNumberButton) {
    const numberClicked = e.target.innerText;
    display.append(numberClicked);
  } else if (isOperatorButton) {
    if (!operator) {
      storedNumber = Number(display.value);
      operator = e.target.innerText;
      display.clearValue();
    } else if (operator) {
      // Handle divide by 0 error
      if (operator === "/" && display.value === "0") {
        alert("#DIV/0! error");
        display.replace("");
        storedNumber = null;
        operator = null;
        return;
      }
      // show the result
      const result = operate(operator, storedNumber, Number(display.value));
      display.replace(hasLongDecimals(result) ? result.toFixed(5) : result);
      console.table({ storedNumber, operator });

      // reset variables
      storedNumber = result;
      operator = e.target.innerText;
      display.clearValue();
    }
  } else if (isEqualsButton) {
    if (storedNumber && operator && display.value) {
      if (operator === "/" && display.value === "0") {
        // Handle divide by 0 error
        alert("#DIV/0! error");
        display.replace("");
        storedNumber = null;
        operator = null;
        return;
      }

    // show the result
    const result = operate(operator, storedNumber, Number(display.value));
    display.replace(hasLongDecimals(result) ? result.toFixed(5) : result);

    // reset variables
    storedNumber = result;
    operator = null;
    }
  }
  const displayValue = display.value;
  console.table({ storedNumber, operator, displayValue });
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
