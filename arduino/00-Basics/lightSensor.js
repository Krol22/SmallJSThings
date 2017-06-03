var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var light = new five.Light("A2");
  var led = new five.Led(3);
  var thermometer = new five.Thermometer({
    controller: "TMP36",
    pin: "A0",
    freq: 1000
  });



  led.on();
  led.intensity(100);

  thermometer.on("data", function(){
    console.log("celcius: %d", this.C); 
  });

  light.on("change", function() {
    var value = five.Fn.map(this.level, 0, 1, 0, 255);
    led.brightness(value);
  });
});
