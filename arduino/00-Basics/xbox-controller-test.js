var XboxController = require('xbox-controller');
var xbox = new XboxController();

xbox.on('connected', function(){
  console.log('Xbox controller connected');
});

xbox.on('not-found', function(){
  console.log('Xbox controller could not be found');
});
