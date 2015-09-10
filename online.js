var express = require('express');
var bodyParser = require('body-parser');
var pg = require ('pg');
var fs = require ('fs');
var app = express();

var mock = 0;
var devices = [];

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('public'));

app.get("/online",function(req,res){
	res.sendfile("./public/htm/online.html");
});

var connectionString = process.env.HEROKU_POSTGRESQL_COPPER_URL || 'postgres://csvpsujaljamxy:gcjhDnpk7mFfLVhz7KbP0Qhy5w@ec2-50-19-208-138.compute-1.amazonaws.com:5432/d6dss85etufrmo?ssl=true';

	
app.get("/online/devices",function(req,res){
	console.log("GET > retrieving devices");

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
		if (client != null){
		client.query("SELECT * FROM devices ORDER BY id ASC;", function(err, result) {
			//call `done()` to release the client back to the pool
			done();
			if(err) {
			  return console.error('> Error running update', err);
			}
			
			devices = results;
			return res.json(result.rows);
		});
			
    }});
	
});

app.get("/online/medias",function(req,res){
	//TODO media storage
	console.log("GET > retrieving medias");
	var medias = [
		{id:'1', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'}
		];
	res.send(medias);
});

app.get("/online/broadcasts",function(req,res){
	//TODO broadcast storage
	console.log("GET > retrieving broadcasts");
	var medias = [
		{id:'1', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'}
		];
	res.send(medias);
});

app.get("/online/broadcasts/:PLAYER",function(req,res){
	console.log("GET >  checking if a new playlist is available for "+req.params.PLAYER);
	/*
	//TODO THINGS WITH SERVER DATA AND RETURN THE URL TO GET THE NEW PLAYLIST AND MARK THE PLAYER AS UPDATED
	*/
	//MOCK
	var url = null;
	if (mock == 0){
		url = "/online/broadcasts/"+req.params.PLAYER+"/1234";
		mock = 1;
	}
	res.send(url);
});


app.get("/online/broadcasts/:PLAYER/:ID",function(req,res){
	//TODO get the broadcast corresponding to the player
	console.log("GET > retrieving broadcasts , id : "+ req.params.ID +" player : " + req.params.PLAYER);
	var broadcastObj = {'name':'trainingroom', 'medias': [{'name': 'sw7.h264', 'link': 'sw7.h264'},{'name': 'carlipa.h264', 'link': 'carlipa.h264'}]};
	res.send(broadcastObj);
});


app.post('/online/devices/:ID', function(req, res) {
	var data = req.body;
	
	var temp = data.string.temp || null;
	var localip = data.string.localip || null;
	var name = data.string.name || null;
	var description = data.string.description || null;
	var tags = parseInt(data.string.tags) || null;
	var owner = parseInt(data.string.owner) || null;
	var date = new Date().toISOString();
	var results = [];
	
	console.log('POST> the player : '+req.params.ID+ ' is sending status information | ' + localip + ' | '+ temp + ' | '+ name);
	
	
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
		if (client != null){
		  client.query("UPDATE devices SET temperature=coalesce(temperature,($1)), localip=coalesce(localip,($2)), lastseen =coalesce(lastseen,($3)), description = coalesce(description,($4)), tags = coalesce(tags,($5)), owner = coalesce(owner,($6)) WHERE name=($7)", [temp,localip,date,description,tags,owner,name], function(err, result) {
			//call `done()` to release the client back to the pool
			done();
			if(err) {
			  return console.error('> Error running update', err);
			}
			res.sendStatus(200);
			if (result.rowCount ==  0){
				  console.log("> Insert a new device");
				  client.query("INSERT INTO devices(name,localip,created) values($1,$2,$3)", [name,localip,date], function(err, result) {
					//call `done()` to release the client back to the pool
					done();
					if(err) {
					  return console.error('> Error running insert', err);
					}
					//output: 1
				  });
				  return ;
			}
			//output: 1
		  });
    }});
});


var server = app.listen(app.get('port'), function () {

   console.log('Node app is running on port', app.get('port'));

});;
