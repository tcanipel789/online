var pg = require('pg');
var connectionString = 'postgres://csvpsujaljamxy:gcjhDnpk7mFfLVhz7KbP0Qhy5w@ec2-50-19-208-138.compute-1.amazonaws.com:5432/d6dss85etufrmo?ssl=true';
/*
var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE devices(id SERIAL PRIMARY KEY, name VARCHAR(20) not null,temperature VARCHAR(10),localip VARCHAR(30),lastseen VARCHAR(25),created VARCHAR(25),owner INT,description VARCHAR(100),memory VARCHAR(500))');
query.on('end', function() { client.end(); });

var client2 = new pg.Client(connectionString);
client2.connect();
var query = client2.query('CREATE TABLE tags(id SERIAL PRIMARY KEY, name VARCHAR(20) not null)');
query.on('end', function() { client2.end(); });

var client3 = new pg.Client(connectionString);
client3.connect();
var query = client3.query('CREATE TABLE device_tag(id SERIAL PRIMARY KEY, id_device INT not null, id_tag INT not null, selected BOOLEAN)');
query.on('end', function() { client3.end(); });
*/

var client4 = new pg.Client(connectionString);
client4.connect();
var query = client4.query('CREATE TABLE medias (id SERIAL PRIMARY KEY, name VARCHAR(40) not null,ftplink VARCHAR(250) not null,owner INT,sha1 VARCHAR(250),created VARCHAR(25), size INT, type VARCHAR(25) )');
query.on('end', function() { client4.end(); });

var client5 = new pg.Client(connectionString);
client5.connect();
var query = client5.query('CREATE TABLE mediatypes (id SERIAL PRIMARY KEY, name VARCHAR(100) not null)');
query.on('end', function() { client5.end(); });
