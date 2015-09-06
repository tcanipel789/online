var express = require("express");
var bodyParser = require('body-parser');
var fs = require ("fs");
var app = express();

var mock = 0;
var devices = [];

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('public'));

app.get("/online",function(req,res){
	res.sendfile("./public/htm/online.html");
});


app.get("/online/devices",function(req,res){
	// TODO stock devices
	console.log("GET > retrieving devices");
	res.send(devices);
});

app.get("/online/medias",function(req,res){
	//TODO media storage
	console.log("GET > retrieving medias");
	var medias = [
		{id:'1', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'},
		{id:'2', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'},
		{id:'3', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'},
		{id:'4', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'},
		{id:'5', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'},
		{id:'6', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'},
		{id:'7', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'},
		{id:'8', name:'storefront-solaris', type:'video',  tags: 'test', validity: 'always'}
		];
	res.send(medias);
});

app.get("/online/broadcasts",function(req,res){
	//TODO broadcast storage
	console.log("GET > retrieving broadcasts");
	var medias = [
		{id:'1', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'2', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'3', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'4', status:'20', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'5', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'6', status:'30', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'7', status:'50', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'8', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'1', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'2', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'3', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'4', status:'20', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'5', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'6', status:'30', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'7', status:'50', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'8', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'1', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'2', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'3', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'4', status:'20', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'5', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'6', status:'30', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'7', status:'50', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'8', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'1', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'2', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'3', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'4', status:'20', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'5', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'6', status:'30', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'7', status:'50', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'8', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'1', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'2', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'3', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'4', status:'20', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'5', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'6', status:'30', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'7', status:'50', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'},
		{id:'8', status:'100', name:'training room',  sent: '08/24/2015 10:37 AM', created: '08/24/2015 10:37 AM'}
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


app.post('/online/devices/:ID', function (req, res) {
	var data = req.body;
	console.log('POST> the player : '+req.params.ID+ ' is sending status information | ' + data.string.localip + ' | '+data.string.temp+ ' | '+data.string.id);

	// TODO
	// UPDATE THE DEVICES INFORMATION AND LIST
	//var idx = devices.indexOf(data.string.id);
	//New player registered
	//devices.push({id: devices.length, status: 'online', name: data.string.id,  tags: data.string.tags});
	//Update current state of the player
	//console.log(devices[0]);
	devices.splice(0, 1, {id:devices.length, status: 'online', name: data.string.id, localip: data.string.localip ,  temp: data.string.temp ,  tags: data.string.tags}); 
	
	res.status(200);
	res.json({status:'200'});
  
 });
 


var server = app.listen(app.get('port'), function () {

   console.log('Node app is running on port', app.get('port'));

});;
