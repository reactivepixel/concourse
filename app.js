var http = require ('http');
var server = http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type" : "text/plain"}); // write header
	res.write("Howdy");
	res.end();
}); // Create Server

server.listen(3000); // port 3000