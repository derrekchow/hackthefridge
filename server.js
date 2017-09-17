var request = require("request");
var express = require('express');
var fsPath = require('fs-path');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://IbrahimIrfan:l1l5HJVfJl3ffSwI@cluster0-shard-00-00-471cf.mongodb.net:27017,cluster0-shard-00-01-471cf.mongodb.net:27017,cluster0-shard-00-02-471cf.mongodb.net:27017/htf?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('images'))

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.get('/recipes', function(req, res, next) {
    console.log("recipe request has been made");
    var queries = req.query.q;
    request.get(
        "http://food2fork.com/api/search?q=" + queries + "&key=de0ff6330aa78fda381aee3ff45fd84d",
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipes = JSON.parse(body)["recipes"];
                var result = "";
                for (var i = 0; i < recipes.length; i++){
                  if (recipes[i]["title"] != "All Recipes"){
                    result += recipes[i]["title"] + ",";
                  }
                }
                res.send(result);
            }
        }
    );
})

// from ios app
app.get('/', function(req, res, next) {
    console.log("get request has been made");

    MongoClient.connect(url, function(err, db) {
        db.collection("photos").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(toObject(result));
            db.close();
        });

    });

})

app.get('/health', function(req, res, next) {
	console.log("healthcheck");
	res.send({"check": "success"});
})

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}


// This responds a POST request for the homepage
app.post('/', function(req, res, next) {
  console.log(req.body);
     MongoClient.connect(url, function(err, db) {
       if (err) {
	console.log("a mongo client error occured");
	throw err;
	}

        db.collection("photos").insertOne(req.body, function(err, res2) {
          if (err) {
		console.log("insertion error");
		throw err;
	}
          res.send(res2);
	  var base64 = req.body["content"];
          fsPath.writeFile('images/' + req.body.name + ".jpeg", base64, "base64", function(err){
              console.log("File saved to images/");
          });


          // var stream = fs.createWriteStream("/images/" + req.body.name + ".jpeg");
          // stream.once('open', function () {
          //   stream.write(req.body["content"]);
          //   stream.end();
          // });

         db.close();


        });
     });
});

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
  //  drop()
});

function drop(){
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("photos").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});
}
