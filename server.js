var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

var server = http.createServer(function(req,res){
        res.setHeader("Content-Type","text/html");
        var output = fs.readFileSync("./index.html","UTF-8");
        res.end(output);
}).listen(3000);
//}).listen(3000,'192.168.50.57');

var io = socketio.listen(server);
var arrData = [];

io.sockets.on("connection",function(socket){

	socket.on("sendId",function(id){
		console.log(id);
		socket.broadcast.emit("getId",id);
		io.sockets.emit("getMsg",arrData);
	});

	socket.on("sendMsg",function(data){
        arrData.push(data);
        console.log(arrData);
		io.sockets.emit("getMsg",arrData);
	});

	socket.on("sendCloseMedia",function(id){
		console.log(id);
		io.sockets.emit("getCloseMedia",id);
	});

});