var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator'); 
var url = require("url");
var app = express();

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_IVORY_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/trailer-nailer';
//var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_IVORY_URI || process.env.MONGOHQ_URL || 'mongodb://limitless-springs-63304.herokuapp.com/notuber';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
  db = databaseConnection;
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var urlencodedParser = bodyParser.urlencoded({ extended: true })

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(req, res) {
	response.send('index.html');
});