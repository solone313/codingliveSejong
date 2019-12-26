const Server = require('./Server');

const Client = require('./Client');

class SocketHandler{

    constructor(store){

        this.isServer = false;

        this.store = store;

        this.client;

        this.server;

        this.flag = true;
        
        setInterval(() => {
            console.log(this.flag);
            this.flag = this.flag ? false : true;
            
        }, 10000);

    }

    createServer(port){

        this.isServer = true;

        this.server = new Server(this.store);

        return this.server.create(port);

    }

    createClient(ipAddress){

        this.isServer = false;

        this.client = new Client(this.store);

        return this.client.connect(ipAddress);
        
    }

    emit(event, data){
        // setTimeout(() => {
        //     this.flag = false}, 10000);
        if(this.flag){
            console.log("1");
            this.server.emit(event, data);
        }else{
            console.log("2");
            this.client.emit(event, data);
        }
    }

    clientEmit(event, data){
        if(!this.isServer){
            this.client.emit(event, data);            
        }
    }

    disConnect(){
        if(this.isServer){
            this.server.disConnect();
        }else{
            this.client.disConnect();
        }
    }

}

module.exports = SocketHandler;