var max = 90;
var min = 1;
var randList;
var current = 0;
var intervalID;
var timeInterval;
var isMute = 0;
var doAnnounce = 1;
var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var resetButton = document.getElementById("reset");
var muteButton = document.getElementById("mute");
var unmuteButton = document.getElementById("unmute");
var generateButton = document.getElementById("manual-generate");
var autoGenerateButton = document.getElementById("auto-generate");
var manualResetButton = document.getElementById("manual-reset");
var generateSection = document.getElementById("generate");
var pace;
var speedupButton = document.getElementById("speedup");
var slowdownButton = document.getElementById("slowdown");
var playflag;

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
  if (sessionStorage.getItem("lastIndex") > 0) {
    document.getElementById("resume-restart").style.display = "block";
    generateSection.style.display = "None";
  }
}

function resume() {
  sessionGameGenerator();
  generateSection.style.display = "none";
  document.getElementById("play-btns").style.display = "flex";
  document.getElementById("resume-restart").style.display = "none";
}

function sessionGameGenerator() {
  var previousIndex = Number(sessionStorage.getItem("lastIndex"));
  timeInterval = Number(sessionStorage.getItem("lastTimeInterval"));
  randList = sessionStorage.getItem("randomList").split(",");
  doAnnounce = 0;
  for (var i = 0; i <= previousIndex - 1; i++) {
    getNext();
  }
  doAnnounce = 1;
  intervalID = setInterval(getNext, timeInterval);
  toggle();
}

function restart() {
  generateSection.style.display = "block";
  document.getElementById("resume-restart").style.display = "none";
  sessionStorage.lastIndex = 0;
  sessionStorage.removeItem("randomList");
  sessionStorage.removeItem("lastTimeInterval");
}

window.onbeforeunload = () => {
  pause();
  sessionStorage.setItem("lastIndex", current);
  sessionStorage.setItem("randomList", randList);
  sessionStorage.setItem("lastTimeInterval", timeInterval);
  document.getElementById("resume-restart").style.display = "block";
  document.getElementById("play-btns").style.display = "none";
  return false;
};

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
  numElement.style.visibility = "visible";
}

function generateNum() {
  autoGenerateButton.style.display = "none";
  generateButton.innerText = "Next";
  document.getElementById("manual-reset").style.display = "flex";
  if (current == 0) {
    randList = RandomList(min, max);
  }
  getNext();
}

function autoGenerateNum() {
  randList = RandomList(min, max);
  document.getElementById("pace-section").style.display = "flex";
  generateSection.style.display = "none";
}

function slowGenerator() {
  pace = 1;
  setTimeInterval(pace);
  intervalID = setInterval(getNext, timeInterval);
  //slowdownButton.style.display = "none";
  toggle();
}
function mediumGenerator() {
  pace = 2;
  setTimeInterval(pace);
  intervalID = setInterval(getNext, timeInterval);
  toggle();
}
function fastGenerator() {
  pace = 3;
  setTimeInterval(pace);
  intervalID = setInterval(getNext, timeInterval);
  //speedupButton.style.display = "none";
  toggle();
}

function setTimeInterval(speedPace) {
  switch (speedPace) {
    case 1:
      timeInterval = 6000;
      slowdownButton.style.visibility = "hidden";
      speedupButton.style.visibility = "visible";
      break;
    case 2:
      timeInterval = 3500;
      slowdownButton.style.visibility = "visible";
      speedupButton.style.visibility = "visible";
      break;
    case 3:
      timeInterval = 2000;
      slowdownButton.style.visibility = "visible";
      speedupButton.style.visibility = "hidden";
      break;
  }
}

function speedup() {
  if (pace < 3) {
    pace += 1;
    clearInterval(intervalID);
    setTimeInterval(pace);
    if (play) {
      intervalID = setInterval(getNext, timeInterval);
    }
  }
}

function slowdown() {
  if (pace > 0) {
    pace -= 1;
    clearInterval(intervalID);
    setTimeInterval(pace);
    if (play) {
      intervalID = setInterval(getNext, timeInterval);
    }
  }
}

function toggle() {
  generateButton.disabled = true;
  document.getElementById("pace-section").style.display = "none";
  document.getElementById("play-btns").style.display = "flex";
}

function play() {
  playflag = 1;
  intervalID = setInterval(getNext, timeInterval);
  pauseButton.style.display = "inline-block";
  playButton.style.display = "none";
}

function pause() {
  playflag = 0;
  clearInterval(intervalID);
  pauseButton.style.display = "none";
  playButton.style.display = "inline-block";
}

function manualReset() {
  if (confirm("Are you sure, you want to reset game?") == true) {
    document.getElementById("show-num").style.visibility = "hidden";
    current = 0;
    randList;
  }
}

function reset() {
  clearInterval(intervalID);
  if (confirm("Are you sure, you want to reset game?") == true) {
    //clearInterval(intervalID);
    sessionStorage.clear();
    document.getElementById("tambola-board").innerHTML = "";
    document.getElementById("play-btns").style.display = "none";
    document.getElementById("show-num").style.visibility = "hidden";
    generateSection.style.display = "flex";
    document.getElementById("resume-restart").style.display = "none";
    generateButton.disabled = false;
    pauseButton.style.display = "inline-block";
    playButton.style.display = "none";
    displayBoard();
    generateButton.innerText = "Generate";
    autoGenerateButton.style.display = "flex";
    manualResetButton.style.display = "none";
    current = 0;
  }
}

function mute() {
  isMute = 1;
  muteButton.style.display = "none";
  unmuteButton.style.display = "inline-block";
}

function unmute() {
  isMute = 0;
  muteButton.style.display = "inline-block";
  unmuteButton.style.display = "none";
}

function getNext() {
  console.log("Getting next");
  if (current < max) {
    var num = randList[current];
    var element = document.getElementById("num-" + num);
    element.classList.add("current");
    if (doAnnounce == 1) {
      announceText(element.textContent);
      showNum(element.textContent);
    }
    if (current > 0) {
      var previousNum = randList[current - 1];
      var prevElement = document.getElementById("num-" + previousNum);
      if (prevElement.classList.contains("current")) {
        prevElement.classList.replace("current", "generated");
      } else {
        prevElement.classList.add("generated");
      }
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
