var five = require("johnny-five");
var keypress = require('keypress');

var board, led, lcd,
    red, green, blue;

red = 0;
green = 0;
blue = 0;

board = new five.Board({ port: "/dev/ttyACM0", repl: false });

keypress(process.stdin);

board.on("ready", function(){
  
  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
    rows: 2,
    cols: 16
  });
  lcd.cursor(0, 0);
  lcd.print("R:" + red + " G:" + green);
  lcd.cursor(1, 0);
  lcd.print("B:" + blue);

  led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    },
    isAnode: true
  });

  led.intensity(10);

  led.on();
  led.color("#000000");

  process.stdin.on('keypress', function(ch, key){

    if(key && key.name === 'g'){
      green = increaseOrSetToNone(green);
    }else if(key && key.name === 'r'){
      red = increaseOrSetToNone(red);
    }else if(key && key.name === 'b'){
      blue = increaseOrSetToNone(blue);
    }else if(key && key.name === 'x'){
      red = 0;
      blue = 0;
      green = 0;
    }else if(key && key.name === 'e'){
      console.log("Exiting program...");
      process.exit(); 
    }

    lcd.clear();
    lcd.cursor(0, 0);
    lcd.print("R:" + red + " G:" + green);
    lcd.cursor(1, 0);
    lcd.print("B:" + blue);
    led.color(rgbToHex(red, green, blue));
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();


});

function increaseOrSetToNone(value, maxValue){
  maxValue = maxValue | 255;
  value+=10;
  if(value > maxValue){
    value = 0;
  }
  return value;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
