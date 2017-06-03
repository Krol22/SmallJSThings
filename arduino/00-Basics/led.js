var five = require("johnny-five");
var keypress = require('keypress');

keypress(process.stdin);

var myBoard;

var greenLed, redLed, yellowLed;

myBoard = new five.Board({ port: "/dev/ttyACM0", repl:false });

myBoard.on("ready", function() {

  greenLed = new five.Led(7);
  yellowLed = new five.Led(6);
  redLed = new five.Led(5);

  process.stdin.on('keypress', function(ch, key){
    if(key && key.name === 'g'){
      greenLed.on();
      yellowLed.off();
      redLed.off();
    }else if(key && key.name === 'r'){
      greenLed.off();
      yellowLed.off();
      redLed.on();
    }else if(key && key.name === 'y'){
      greenLed.off();
      yellowLed.on();
      redLed.off();
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();


  // try "on", "off", "toggle", "strobe", "stop" (stops strobing)
});
