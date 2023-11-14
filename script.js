let display = {
  value: "",
  DOMElement: document.getElementById("display"),
  update(str) {
    this.value += str;
    this.DOMElement.innerText = this.value;
  },
};

let firstNumber;
let operator;
let secondNumber;

// Button click handlers
const buttons = document.querySelector("#buttons");
buttons.addEventListener("click", (e) => {
  const isNumberButton = e.target.classList.contains("number");
  if (isNumberButton) {
    const buttonValue = e.target.innerText;
    display.update(buttonValue);
  }
});

// Operations
function operate(operator, a, b) {
  if (operator === "+") return a + b;
  else if (operator === "-") return a - b;
  else if (operator === "*") return a * b;
  else if (operator === "/") return a / b;
}
