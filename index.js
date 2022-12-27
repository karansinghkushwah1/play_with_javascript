let images = ["images/dice1.png","images/dice2.png","images/dice3.png","images/dice4.png","images/dice5.png","images/dice6.png",];

let dice = document.querySelectorAll("img");

function roll(){
    dice.forEach(function(die){
        die.classList.add("shake");
    });
    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
        });
        let dieOneValue = Math.floor(Math.random()*6);
        let dieTwoValue = Math.floor(Math.random()*6);
        console.log(dieOneValue, dieTwoValue);
        document.querySelector("#die-1").setAttribute("src", images[dieOneValue]);
        document.querySelector("#die-2").setAttribute("src", images[dieTwoValue]);

        if (dieOneValue > dieTwoValue) {
            document.querySelector("#s_title").innerHTML = "🚩 You Wins!";
          }
          else if (dieTwoValue > dieOneValue) {
            document.querySelector("#s_title").innerHTML = "Robo Wins! 🚩";
          }
          else {
            document.querySelector("#s_title").innerHTML = "Draw!";
          }

        document.querySelector("#total").innerHTML = "Your Roll is " + (dieOneValue+1) + " &" + " Robo is " + (dieTwoValue+1);
    },
    1000
    );
}

// roll();


// ________________________________________ Reflex game _____________________________________________
var startTime=new Date();
var endTime=new Date();
var startPressed=false;
var bgChangeStarted=false;
var maxWait=20;
var timerID;

function startTest() {
    document.querySelector("#exper").style.background= document.response.bgColorChange.options[
        document.response.bgColorChange.selectedIndex].text;
    bgChangeStarted = true;
    startTime = new Date();
}

function remark(responseTime) {
    var responseString = "";
    if (responseTime < 0.25)
        responseString = "Damn! You are fast";
    if (responseTime >= 0.25 && responseTime < 0.50)
        responseString = "Better then other half";
    if (responseTime >= 0.50 && responseTime < 0.75)
        responseString = "Can do better";
    if (responseTime >= 0.75 && responseTime < 1)
        responseString = "Keep playing";
    if (responseTime >= 1)
        responseString = "You are Lazy";

    return responseString;
}

function stopTest() {
    if (bgChangeStarted) {
        endTime = new Date();
        var responseTime = (endTime.getTime() - startTime.getTime()) / 1000;

        document.querySelector("#exper").style.background="white";
        document.querySelector("#result").innerHTML = "Your response time is: " + responseTime +
            " seconds " + "\n" + remark(responseTime);
        startPressed = false;
        bgChangeStarted = false;
    }
    else {
        if (!startPressed) {
            document.querySelector("#result").innerHTML = "press start first to start test";
        }
        else {
            clearTimeout(timerID);
            startPressed = false;
            document.querySelector("#result").innerHTML = "cheater! you pressed too early!";
        }
    }
}

var randMULTIPLIER=0x015a4e35;
var randINCREMENT=1;
var today=new Date();
var randSeed=today.getSeconds();

function randNumber() {
    randSeed = (randMULTIPLIER * randSeed + randINCREMENT) % (1 << 31);
    return ((randSeed >> 15) & 0x7fff) / 32767;
}

function startit() {
    if (startPressed) {
        alert("Already started. Press stop to stop");
        return;
    }
    else {
        startPressed = true;
        timerID = setTimeout('startTest()', 6000 * randNumber());
    }
}

