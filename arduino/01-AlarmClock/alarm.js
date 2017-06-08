var five = require("johnny-five");

var board = new five.Board({ port: "/dev/ttyACM0", repl: false });
var lcd, button, buzzer;

let lButton, mButton, rButton, alarmButton;
let lButtonPressed, mButtonPressed, rButtonPressed, alarmButtonPressed;

let hourOffset = 0;
let minutesOffset = 0;
let currentTime;

var isAlarmOn = false;
let wasAlarmOffed = false;
var alarm = false;
var offAlarm = false;
var alarmTime = new Date();
var on = true;

board.on("ready", function() {

    init();

    alarmTime.setSeconds(0);
    setInterval(checkTime, 250);

});

function init(){

  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
  });

  rButton = new five.Button(2);
  mButton = new five.Button(4);
  lButton = new five.Button(5);
  alarmButton = new five.Button(6);

  initButtons();

  buzzer = new five.Pin({
    pin: 3,
    mode: 3
  });

}

function checkTime(){
    currentTime = new Date();
    currentTime = correctTime(currentTime);
    printTime(currentTime);
    checkForAlarm(currentTime);
    printAlarmTime();
    checkForNewDay(currentTime);
    if(alarmButtonPressed && rButtonPressed){
        toggleAlarm();
    }
    if(alarmButtonPressed){
        setAlarmTime();
    }
    if(rButtonPressed){
        setTime();
    }

    if(isAlarmOn)
      beep();
    else
      buzzer.low();
}

function setTime(){
    if(lButtonPressed){
        hourOffset++;
        wasAlarmOffed = false;
    }
    if(mButtonPressed){
        minutesOffset++;
        wasAlarmOffed = false;
    }
}

function setAlarmTime(){
    if(lButtonPressed){
        alarmTime.setHours(alarmTime.getHours() + 1);
        wasAlarmOffed = false;
    }
    if(mButtonPressed){
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        wasAlarmOffed = false;
    }
}

function toggleAlarm(){
    alarm = !alarm;
}

function printAlarmTime(){
    var h = alarmTime.getHours();
    var m = alarmTime.getMinutes();

    h = toTwoDigits(h);
    m = toTwoDigits(m);

    let alarmState = alarm ? "ON " : "OFF";
    lcd.cursor(1, 0);
    lcd.print("ALARM: " + h + ":" + m + " " + alarmState);

}

function checkForNewDay(currentTime){
    if(!currentTime.getHours() && !currentTime.getMinutes() && !currentTime.getSeconds())
        wasAlarmOffed = false;
}

function correctTime(currentTime){
    currentTime.setHours(currentTime.getHours() + hourOffset);
    currentTime.setMinutes(currentTime.getMinutes() + minutesOffset);
    return currentTime;
}

function printTime(currentTime){
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();

  h = toTwoDigits(h);
  m = toTwoDigits(m);
  s = toTwoDigits(s);

  lcd.cursor(0, 0);
  lcd.print("NOW: " + h + ":" + m + ":" + s);

}

function toTwoDigits(i){
  if(i < 10)
    i = "0" + i;
  return i;
}

function beep(){
    if(on){
        buzzer.high();
        on = false;
    } else {
        buzzer.low();
        on = true;
    }
}

function checkForAlarm(currentTime){
    if(alarmTime.getTime() < currentTime.getTime() && alarm && !wasAlarmOffed){
        isAlarmOn = true
    }

}
function initButtons(){
    lButton.on("down", () => {
        lButtonPressed = true;
    });
    mButton.on("down", () => {
        mButtonPressed = true;
    });
    rButton.on("down", () => {
        rButtonPressed = true;
    });
    alarmButton.on("down", () => {
        alarmButtonPressed = true;
        if(isAlarmOn)
            wasAlarmOffed = true;
        isAlarmOn = false;
    });

    lButton.on("up", () => {
        lButtonPressed = false;
    });
    mButton.on("up", () => {
        mButtonPressed = false;
        console.log("mButton - released")
    });
    rButton.on("up", () => {
        rButtonPressed = false;
    });
    alarmButton.on("up", () => {
        alarmButtonPressed = false;
    })
}
