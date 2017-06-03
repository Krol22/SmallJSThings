var five = require("johnny-five");

myBoard = new five.Board({ port: "/dev/ttyACM0", repl:false });

myBoard.on("ready", function() {
  var rgbLed = new five.Led.RGB({
    pins: [6, 5, 3],
    isAnode: true
  });

  rgbLed.on();

  rgbLed.color("red");
  rgbLed.intensity(20);

  rgbLed.strobe(200);



});
