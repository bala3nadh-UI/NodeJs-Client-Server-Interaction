var url = require('url');
var fs = require('fs');
var http = require('http');

module.exports = {
	handleRequest: function (request, response) {
		response.writeHead(200, {'Content-Type': 'text/html'});

		var path = url.parse(request.url).pathname;
		var pdfData = request;
		
		switch (path) {
			//Web Routes
			case '/web/index':
				renderHTML('./views/index.html', response);
				break;
			case '/web/login':
				renderHTML('./views/login.html', response);
				break;

			//API Routes
			case '/api/user':
				response.writeHead(200, {'Content-Type': 'application/json'});
				var users = { id: 1, name: "Bala3nadh" };
				response.end(JSON.stringify(users));
				break;
			case '/APIcall':
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "http://localhost:8080"
				});
				//response.end(JSON.stringify({name: "3nadh"}));
				response.end(getData());
				break;

			default:
				//renderHTML('./views/index.html', response);
				response.writeHead(404);
				response.write('Route not found..!');
				response.end();
				break;
		}
	}
}

function getData () {
	var x = "Babloo..!";
	return x;
}

function renderHTML(path, response) {
	fs.readFile(path, null, function(error, data) {
		if (error) {
			response.writeHead(404);
			response.write('File not found..!');
		} else {
			response.write(data);
		}
		response.end();
	});
}
