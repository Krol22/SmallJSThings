var five = require("johnny-five");

var board = new five.Board({ port: "/dev/ttyACM0" });

board.on("ready", function() {
  var lcd = new five.LCD({ 
    pins: [2, 3, 4, 5, 6, 7],
  });

  lcd.useChar("heart");

  lcd.cursor(0, 0);
  lcd.print("Kocham");
  lcd.cursor(1, 0);
  lcd.print("Paulinke ");
  for(;;){
    lcd.print(":heart:");
    lcd.cursor(1, 9);
    lcd.print(" ");
    lcd.cursor(1, 9);
  }


  this.repl.inject({
    lcd: lcd
  });

});

