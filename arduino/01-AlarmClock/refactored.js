let Board = {
    init: function() {
        this.board = new five.Board({ port: "/dev/ttyACM0", repl: false });

        this.lcd = new five.LCD({
            pins: [7, 8, 9, 10, 11, 12],
        });

        this.hourButton = new five.Button(2);
        this.minuteButton = new five.Button(4);
        this.clockButton = new five.Button(5);
        this.alarmButton = new five.Button(6);

        this.buzzer = new five.Pin({ pin : 3, mode : 3});

        this.initButtons();
    },
    initButtons() {
        this.hourButton.on("down", () => { this.houtButtonPressed = true; });
        this.minuteButton.on("down", () => { this.minuteButtonPressed = true; });
        this.clockButton.on("down", () => { this.clockButtonPressed = true; });
        this.alarmButton.on("down", () => { this.alarmButtonPressed = true; });

        this.hourButton.on("up", () => { this.hourButtonPressed = false; });
        this.minuteButton.on("up", () => { this.minuteButtonPressed = false; });
        this.clockButton.on("up", () => { this.clockButtonPressed = false; });
        this.alarmButton.on("up", () => { this.alarmButtonPressed = false; });
    },
    printOnLcd(cursorPosition, message){
        this.lcd.cursor(cursorPosition.y, cursorPosition.x);
        this.lcd.print(message);
    },

    ready(){
        setInterval(Program.loop, 250);
    }

}

let AlarmClock = {
    init: function() {

    },
    print: function() {
        Clock.printTime();
        Alarm.printAlarmTime();
    },
    update(){
        Alarm.checkForAlarm();
        Clock.checkTime();
        if(Board.alarmButtonPressed && Board.clockButtonPressed){
            Alarm.toggleAlarm();
        }
        if(Board.alarmButtonPressed){
            Alarm.offBeeping();
            Alarm.setAlarmTime();
        }
        if(Board.clockButtonPressed){
            Clock.setTime();
        }
    }
};

let Alarm = {
    checkForAlarm: function() {
        if(this.alarmTime.getTime() < Clock.currentTime.getTime() && this.alarm && !this.wasAlarmDisabled){
            this.isBeepOn = true;
            this.beepOn = true;
        }
        if(this.isBeepOn){
            this.launchALARM();
        } else {
            Board.buzzer.low();
        }
    },
    printAlarmTime: function() {
        h = Helper.toTwoDigits(this.alarmTime.getHours());
        m = Helper.toTwoDigits(this.alarmTime.getMinutes());

        let alarmTimeText = "ALARM: " + h + ":" + " " + this.alarmState;

        Board.printOnLcd({ x: 0, y: 1 }, alarmTimeText);
    },
    setAlarmTime: function() {
        if(Board.hourButtonPressed){
            this.alarmTime.setHours(alarmTime.getHours() + 1);
            this.wasAlarmDisabled = false;
        }
        if(Board.minuteButtonPressed){
            this.alarmTime.setMinutes(alarmTime.getMinutes() + 1);
            this.wasAlarmDisabled = false;
        }

    },
    launchALARM(){
        if(this.beepOn){
            Board.buzzer.high();
            this.beepOn = false;
        } else {
            Board.buzzer.low();
            this.beepOn = true;
        }
    },
    toggleAlarm(){
        this.isAlarmOn = !this.isAlarmOn;
    },
    offBeeping(){
        this.isAlarmOn = false;
    }
};

let Clock = {
    checkTime: function() {
        this.currentTime = new Date();
        this.currentTime = Helper.correctTime(this.currentTime);
    },
    printTime: function() {
        let h = Helper.toTwoDigits(currentTime.getHours());
        let m = Helper.toTwoDigits(currentTime.getHours());
        let s = Helper.toTwoDigits(currentTime.getHours());

        let timeText = "NOW: " + h + ":" + m + ":" + s;

        Board.printOnLcd({ x: 0, y: 0 }, time);
    },
    setTime: function() {
        if(Board.hourButtonPressed){
            this.hourOffset++;
            Alarm.wasAlarmDisabled = false;
        }
        if(Board.minuteButtonPressed){
            this.minuteOffset++;
            Alarm.wasAlarmDisabled = false;
        }
    }
};

let Helper = {
    toTwoDigits(i) {
        return i < 10 ? i = "0" + i : i;
    },
    correctTime(time) {
        time.setHours(time.getHours() + Clock.hourOffset);
        time.setMinutes(time.getMinutes() + Clock.minutesOffset);
        return time;
    }
};

let Program = {
    init() {
        Board.init();
        AlarmClock.init();
    },
    loop() {
        AlarmClock.update();
        AlarmClock.print();
    }
};

Program.init();
board.on('ready', Board.ready);
