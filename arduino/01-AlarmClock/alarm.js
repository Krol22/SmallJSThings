var five = require("johnny-five");

var board = new five.Board({ port: "/dev/ttyACM0", repl: false });
var lcd, button, buzzer;

var isAlarmOn = false;
var offAlarm = false;
var alarmTime = new Date();
var on = true;

board.on("ready", function() {

    init();
    button.on("down", function() {
      isAlarmOn = false;
    });

    alarmTime.setSeconds(alarmTime.getSeconds() + 10);
    setInterval(checkTime, 250);  

});

function init(){

  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
  });

  button = new five.Button(2);

  buzzer = new five.Pin({
    pin: 3,
    mode: 3
  });

}

function checkTime(){
    var currentTime = new Date();
    printTime(currentTime);
    if(!offAlarm)
        checkForAlarm(currentTime);

    if(isAlarmOn)
      beep();
    else  
      buzzer.low();
}

function printTime(currentTime){
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();
  var s = currentTime.getSeconds();

  h = toTwoDigits(h);
  m = toTwoDigits(m);
  s = toTwoDigits(s);

  lcd.cursor(0, 0);
  lcd.print(h + ":" + m + ":" + s);

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
    if(alarmTime.getTime() < currentTime.getTime()){
        isAlarmOn = true
        offAlarm = true
    }

}

