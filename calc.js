const container = document.querySelector(".calculator");

const gridSize = 4;
const keys = ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "x", "clear", "0", "=", "/"]
for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("button"); 
    square.textContent = keys[i]
    square.id = keys[i]
    document.querySelector("#buttons").appendChild(square);                 
}

const add = (a, b) => (a + b)
const subtract = (a, b) => (a - b)
const multiply = (a, b) => (a * b)
const divide = (a, b) => (Math.round(a / b))

let operand1 = ""
let operator = ""
let operand2 = ""
let curr = "operand1"
let equalPressed = false

const buttons = document.querySelectorAll("#buttons button");
const display = document.querySelector("#display")
// 2. Loop through each button
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (!isNaN(button.id)) {
        if (curr == "operand1") {
            if (equalPressed) {
                operand1 = button.id
                equalPressed = false
            }
            operand1 += button.id
            display.textContent = operand1
        } else if (curr == "operand2") {
            operand2 += button.id
            display.textContent = operand2
        }
    } 
    else if (button.id != "clear" && button.id != "=") {
        curr = "operator"
        operator = button.id
        curr = "operand2"
    }
    else if (button.id == "clear") {
        curr = "operand1"
        operand1 = ""
        operand2 = ""
        operator = ""
        display.textContent = "0"
        equalPressed = false
    } else {
        operate()
    }
  });
});

let res = 0
const operate = () => {
    operand1 = Number(operand1)
    operand2 = Number(operand2)
    if (operator == "+") {
        res = add(operand1, operand2)
    } else if (operator == "-") {
        res = subtract(operand1, operand2)
    } else if (operator == "x") {
        res = multiply(operand1, operand2)
    } else {
        res = divide(operand1, operand2)
    }
    operand1 = "" + res
    operand2 = ""
    curr = "operand1"
    display.textContent = res
    equalPressed = true
}

