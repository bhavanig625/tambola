var max = 90;
var min = 1;
var randList = RandomList(min, max);
var current = 0;
var intervalID;

window.onload = displayBoard;
function displayBoard() {
  var containerElement = document.getElementById("tambola-board");
  for (var i = 0; i < max; i++) {
    var numElement = document.createElement("div");
    var currentVal = i + 1;
    numElement.setAttribute("id", "num-" + currentVal);
    numElement.setAttribute("class", "box");
    numElement.appendChild(document.createTextNode(currentVal));
    containerElement.appendChild(numElement);
  }
}

function generateNum() {
  getNext();
}

function autoGenerateNum() {
  intervalID = setInterval(getNext, 100);
}

function getNext() {
  console.log("Getting next");
  if (current < max) {
    var num = randList[current];
    var element = document.getElementById("num-" + num);
    element.classList.add("current");
    if (current > 0) {
      var previousNum = randList[current - 1];
      var prevElement = document.getElementById("num-" + previousNum);
      prevElement.classList.replace("current", "generated");
    }
    current += 1;
  }
  if (current === max) {
    clearInterval(intervalID);
  }
}

function RandomList(min, max) {
  randomArray = [];
  for (let i = 0; i < max; i++) {
    x = Math.floor(Math.random() * max) + min;
    if (randomArray.includes(x) == true) {
      i = i - 1;
    } else {
      randomArray.push(x);
    }
  }
  return randomArray;
}
