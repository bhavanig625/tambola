var max = 90;
var min = 1;
var randList = RandomList(min, max);
var current = 0;
var intervalID;
var timeInterval;
var originalDOM;
var isMute;

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
  originalDOM = document.body.innerHTML;
}

function announceText(text) {
  if (isMute != 1) {
    const synth = window.speechSynthesis;
    // var voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text);
    // utterThis.voice = voices.find(
    //   (voice) => voice.name == "Google UK English Female"
    // );
    // utterThis.lang = voices.find((x) => x.lang == "en-GB");
    synth.speak(utterThis);
  }
}

function showNum(num) {
  var numElement = document.getElementById("show-num");
  numElement.innerText = num;
  numElement.style.display = "flex";
}

function generateNum() {
  getNext();
}

function autoGenerateNum() {
  var paceElements = document.getElementById("pace-section");
  paceElements.style.display = "block";
  //intervalID = setInterval(getNext, 100);
}

function slowGenerator() {
  timeInterval = 6000;
  intervalID = setInterval(getNext, timeInterval);
  toggle();
}
function mediumGenerator() {
  timeInterval = 3500;
  intervalID = setInterval(getNext, timeInterval);
  toggle();
}
function fastGenerator() {
  timeInterval = 2000;
  intervalID = setInterval(getNext, timeInterval);
  toggle();
}

function toggle() {
  var paceElements = document.getElementById("pace-section");
  paceElements.style.display = "None";
  var playPauseElements = document.getElementById("play-pause");
  playPauseElements.style.display = "block";
}

function play() {
  intervalID = setInterval(getNext, timeInterval);
}

function pause() {
  clearInterval(intervalID);
}

function reset() {
  clearInterval(intervalID);
  document.body.innerHTML = originalDOM;
}

function mute() {
  isMute = 1;
}

function unmute() {
  isMute = 0;
}

function getNext() {
  console.log("Getting next");
  if (current < max) {
    var num = randList[current];
    var element = document.getElementById("num-" + num);
    element.classList.add("current");
    announceText(element.textContent);
    showNum(element.textContent);
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
