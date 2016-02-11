angular.module('app', ['btford.socket-io'])
    .controller('monitorController', function (mySocket) {

        var monitor = this;
    
        monitor.counter = 0;
        monitor.title = 'test';
        monitor.entitiyList = [] ; 
        
        monitor.handleMessage = function(message) {
             

            var params = message.split(',')[0].split('.');
            var title = params[0];
            var value = message.split(',')[1];

            var entity = { 'title': title };
            var obj = _.find(monitor.entitiyList, function (val) { return val.title == entity.title });

            if (obj) {

                obj.attributes[params[1]] = value;

            } else {
                
                entity.attributes = {};

                entity.attributes[params[1]] = value;
                monitor.entitiyList.push(entity);

            }
            
            
            //console.log(monitor.entitiyList);

            
        }
        
        
        mySocket.on('data-event', function (msg) {
            
            monitor.handleMessage(msg.data) ; 
            
        });        
        

}).factory('mySocket', function (socketFactory) {
    return socketFactory();
});;


