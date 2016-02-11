var serialData = require("./modules/serial-data.js");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express') ; 

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



//// init ports and connect to arduino serial port 

serialData.getPorts(function (err,ports) {
    
    var port = ports[0].comName ; 
    serialData.connect(port,57600, function (data) {
        
        console.log(data) ;     
        io.emit('data-event', { 'data' : data });    
        
    }) ; 
   
}) ; 




