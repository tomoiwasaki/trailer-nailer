var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator'); 
var url = require("url");
var fs = require('fs');
var path = require("path");
var app = express();

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_IVORY_URI || process.env.MONGOHQ_URL || 'mongodb://trailer-nailer.herokuapp.com/movies';
// var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_IVORY_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/trailer-nailer';
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

app.get('/', function(request, response) {
	response.set('Content-Type', 'text/html');
	response.sendFile(__dirname + '/index.html');
});

app.get('/index.html', function(request, response) {
  response.set('Content-Type', 'text/html');
  response.sendFile(__dirname + '/index.html');
});

app.get('/Login_Background.jpg', function(request, response) {
  response.set('Content-Type', 'image/jpg');
  response.sendFile(__dirname + '/Login_Background.jpg');
});

app.get('/main-menu.html', function(request, response) {
  response.set('Content-Type', 'text/html');
  response.sendFile(__dirname + '/main-menu.html');
});

app.get('/challenge-screen.html', function(request, response) {
  response.set('Content-Type', 'text/html');
  response.sendFile(__dirname + '/challenge-screen.html');
});

app.get('/genre-screen.html', function(request, response) {
  response.set('Content-Type', 'text/html');
  response.sendFile(__dirname + '/genre-screen.html');
});

app.get('/genre-screen.css', function(request, response) {
  response.set('Content-Type', 'text/css');
  response.sendFile(__dirname + '/genre-screen.css');
});

app.get('/challenge-screen.css', function(request, response) {
  response.set('Content-Type', 'text/css');
  response.sendFile(__dirname + '/challenge-screen.css');
});

app.get('/game-screen.css', function(request, response) {
  response.set('Content-Type', 'text/css');
  response.sendFile(__dirname + '/game-screen.css');
});

app.get('/index.css', function(request, response) {
  response.set('Content-Type', 'text/css');
  response.sendFile(__dirname + '/index.css');
});


app.get('/bootstrap-social.css', function(request, response) {
  response.set('Content-Type', 'text/css');
  response.sendFile(__dirname + '/bootstrap-social.css');
});

app.get('/game-screen.html', function(request, response) {
  var genre = request.query.genre;
  if (genre == undefined || genre == '') {
        genre = "all";
  }
  fs.readFile("game-screen.html", function (error, pgResp) {
    if (error) {
      response.writeHead(404);
      response.write('Contents you are looking are Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      pgResp = "<script> var genre = " + "'" + genre + "'" +"; </script>"+ pgResp;
      response.write(pgResp);
    }            
    response.end();
  });  
  // response.set('Content-Type', 'text/html');
  // response.sendFile('game-screen.html');
});

app.get('/game-over.html', function(request, response) {
  response.set('Content-Type', 'text/html');
  response.sendFile(__dirname + '/game-over.html');
});

app.get('/game-over.css', function(request, response) {
  response.set('Content-Type', 'text/css');
  response.sendFile(__dirname + '/game-over.css');
});

app.get('/game-over-logo.png', function(request, response) {
  response.set('Content-Type', 'image/png');
  response.sendFile(__dirname + '/game-over-logo.png');
});

app.post('/submit', function(request, response) {
  	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "X-Requested-With");	

  	// if (url.parse(request.url).query == null) {
    //	response.send('Please send valid queries with movie name, id, genre, and year');
  	// } else {
    	// var querystring = url.parse(request.url).query;
    	// var query = JSON.parse('{"' + decodeURI(querystring).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace(/\s/g,'') + '"}');  
    var query = request.body;
    // var query = JSON.parse(request.body);
    if (typeof query['name'] ==  undefined || typeof query['id'] ==  undefined || typeof query['genre'] ==  undefined || typeof query['year'] ==  undefined) {
      	response.send('Please send valid queries with movie name, id, genre, and year');
    } else {
    	var name = query['name'];
    	var id = query['id'];
    	var genre = query['genre'];
    	var year = query['year'];
	    var toInsert = {
	    	"name" : name,
	        "id" : id,
	        "genre" : genre,
	        "year" : year
	    };
    	db.collection('movies', function(err, col) {
    		if (err) {
    			response.send(500);
    		} else {
    			col.insert(toInsert, function(error, saved) {
    				if (error) {
    					response.send(500);
    				} else {
    					response.send(200);
    				}
    			});
    		}
   		});
   	}
});

/*
app.get('/movies', function(request, response) {
	//response.header("Access-Control-Allow-Origin", "*");
  //response.header("Access-Control-Allow-Headers", "X-Requested-With");
  var genre = request.query.genre;
  if (genre != undefined && genre != null) {
    genre = genre.replace(/[^\w\s]/gi, '');
  }
  if (genre == undefined) {
    db.collection('movies', function(er, col) {
      if (er) {
        response.sendStatus(500);
      } else {
        col.find().toArray(function(error, result) {
          if (error) {
            response.sendStatus(500);
          } else {
            response.send(result);
          }
        });
      }
    });
  }

	db.collection('movies', function(er, col) {
		if (er) {
			response.sendStatus(500);
		} else {
      col.find({"genre" : genre}).toArray(function(error, result) {
        if (error) {
					response.sendStatus(500);
				} else {
					response.send(result);
        }
			});
		}
	});
});
*/

app.get('/movies', function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  var genre = request.query.genre;
  if (genre == undefined || genre == '' || genre == "all") {
    db.collection('movies', function(er, col) {
      if (er) {
        response.sendStatus(500);
      } else {
        col.find().toArray(function(error, result) {
          if (error) {
            response.sendStatus(500);
          } else {
            response.send(result);
          }
        });
      }
    });
  } else {
    db.collection('movies', function(er, col) {
      if (er) {
        response.sendStatus(500);
      } else {
        col.find({"genre":genre}).toArray(function(error, result) {
          if (error) {
            response.sendStatus(500);
          } else {
            if (result.length > 0) {
              response.send(result);
            } else {
              col.find({}).toArray(function(e, r) {
                if (e) {
                  response.sendStatus(500);
                } else {
                  response.send(r);
                }
              });
            }
          }
        });
      }
    });
  }
});
