
var serial = require("serialport");


var self = {
    

    
    
    connect : function (port,baudRate, callback) {

        var SerialPort = require("serialport").SerialPort
        var serialPort = new SerialPort(port, {
            baudrate: baudRate , 
            parser: serial.parsers.readline("\n")
            
        });
                
        serialPort.on("open", function () {
            
            console.log('open');
            
            serialPort.on('data', function(data) {
                
                callback(data) ; 
                
                //console.log('.' + data + '.' );
            });
            
        }); 
                
        
    } ,
    
    getPorts: function(callback) {
      
        serial.list(function (err, ports) {            
            return callback(err,ports) ;                             
        });      
        
    },
    
    
    init: function(port) {
        
        
        
    }
  
    
    
  
};

module.exports = self ; 