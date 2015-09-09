var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://enlfyxbinfnbmc:D-niRw_av_sJGL2f_dWORYsjlu@ec2-54-235-162-144.compute-1.amazonaws.com:5432/d44i2hb6d0pm78?ssl=true';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE devices(id SERIAL PRIMARY KEY, name VARCHAR(20) not null,temperature VARCHAR(10),localip VARCHAR(30),lastseen VARCHAR(25),created VARCHAR(25),tags INT,owner INT,description VARCHAR(100))');
query.on('end', function() { client.end(); });
