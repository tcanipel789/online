var express = require("express");
var fs = require ("fs");
var app = express();




app.use(express.static('public'));

app.get("/players",function(req,res){
	res.sendfile("./public/htm/players.html");
});




app.get("/search",function(req,res){
	console.log(req.query);
	
	res.send(req.query);
});

app.post("/form",function(req,res){
	console.log(req.tostring());
	req.urlencoded("index.html");
});

app.get('/books', function (req, res) {
  fs.readFile(process.argv[3], function (err, data) {
    if (err) {
      throw err;
    }
    object = JSON.parse(data);
    res.send(object);
  });
});

app.put("/:ID/:NAME",function(req,res){
	console.log(req.params.NAME);
	//console.log(req.params.ID);
	
});

var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Online app listening at http://%s:%s', host, port);

});;
