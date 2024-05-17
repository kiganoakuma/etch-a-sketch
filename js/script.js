const body = document.querySelector("body");
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.justifyContent = "center";
body.style.alignItems = "center";
const containerLength = 600;
let randomColorActive = false;

let header = document.createElement("h1");
header.textContent = "Etch A Sketch";
body.appendChild(header);

let buttons = document.createElement("section");
buttons.setAttribute("id", "buttons");
body.appendChild(buttons);

let colorPickerInput = document.createElement("input");
colorPickerInput.setAttribute("type", "color");
colorPickerInput.setAttribute("id", "colorPickerInput");
buttons.appendChild(colorPickerInput);
let colorSelect = "white";
colorPickerInput.addEventListener("change", function () {
  randomColorActive = false;
  colorSelect = colorPickerInput.value;
});


let randomColorButton = document.createElement("button");
randomColorButton.setAttribute("id", "randomColoButton");
randomColorButton.textContent = "Random Color";
buttons.appendChild(randomColorButton);
randomColorButton.addEventListener("click", function () {
  if (randomColorActive) {
    randomColorActive = false;
  } else {
    randomColorActive = true;
  }
});
function getRandomHexColor() {
  const hexDigits = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexDigits.length);
    color += hexDigits[randomIndex];
  }
  return color;
}

let changeGridSize = document.createElement("button");
changeGridSize.setAttribute("type", "button");
changeGridSize.textContent = "Change Grid Size";
buttons.appendChild(changeGridSize);

let reset = document.createElement("button");
reset.setAttribute("type", "button");
reset.textContent = "reset";
buttons.appendChild(reset);

let etchContainer = document.createElement("section");
body.appendChild(etchContainer);
etchContainer.setAttribute("id", "etch-container");
etchContainer.style.display = "flex";
etchContainer.style.flexDirection = "column";

etchContainer.style.width = `${containerLength}px`;
etchContainer.style.height = `${containerLength}px`;

function grid(userInput = 16) {
  let i = 0;
  while (i < userInput) {
    let divRow = document.createElement("div"); // Create a new divRow inside the loop
    divRow.setAttribute("id", `div-row`);
    etchContainer.appendChild(divRow);
    let boxcontainerLength = containerLength / userInput;
    divRow.style.height = `${containerLength}px`;
    divRow.style.display = "flex";

    let innerI = 0;
    while (innerI < userInput) {
      let divColumn = document.createElement("div"); // Create a new divColumn inside the inner loop
      divColumn.setAttribute("id", `div-column`);
      divRow.appendChild(divColumn);
      divColumn.style.width = `${containerLength}px`;
      innerI++;
      divColumn.addEventListener("mouseover", function () {
        if (randomColorActive) {
          this.style.backgroundColor = getRandomHexColor();
        } else {
          this.style.backgroundColor = colorSelect;
        }
      });
    }
    i++;
  }
}
grid();
function clearEtchContainer() {
  while (etchContainer.firstChild) {
    etchContainer.removeChild(etchContainer.firstChild);
  }
}

changeGridSize.addEventListener("click", function () {
  let userInput = prompt("Please enter a side containerLength");
  clearEtchContainer();
  if (userInput > 100) {
    alert("Cannot be larger than 100");
    grid();
  } else {
    if (userInput) {
      grid(userInput);
    } else {
      grid();
    }
  }
});

reset.addEventListener("click", function () {
  clearEtchContainer();
  grid();
});

const buttonsSection = document.getElementById("buttons");
const buttonElements = buttonsSection.querySelectorAll("*");
const count = buttonsSection.childElementCount;
buttonElements.forEach((element) => {
  element.style.backgroundColor = "#00C49A"; // Example background color
  element.style.border = "none";
  element.style.borderRadius = "5px";
  element.style.color = "white";
  element.style.fontFamily = "Arial, sans-serif";
  element.style.cursor = "pointer";
  element.style.width = `${
    containerLength / count - (20 * (count - 1)) / count
  }px`;
});
