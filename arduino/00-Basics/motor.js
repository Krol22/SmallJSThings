var five = require("johnny-five");
var keypress = require('keypress');

keypress(process.stdin);

board = new five.Board({ port: "/dev/ttyACM0" , repl: false});

var a = 100;

board.on("ready", function() {

  var motor = new five.Motor({
    pin: 5
  });

  motor.on("start", function(){
    console.log("starting");
  });

  motor.start(255);

});

