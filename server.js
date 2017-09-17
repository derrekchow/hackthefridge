var express = require('express');
var fs = require('fs');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://IbrahimIrfan:l1l5HJVfJl3ffSwI@cluster0-shard-00-00-471cf.mongodb.net:27017,cluster0-shard-00-01-471cf.mongodb.net:27017,cluster0-shard-00-02-471cf.mongodb.net:27017/htf?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

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
       if (err) throw err;

        db.collection("photos").insertOne(req.body, function(err, res2) {
          if (err) throw err;
          res.send(res2);
          var stream = fs.createWriteStream(req.body.name + ".jpeg");
          stream.once('open', function () {
            stream.write(req.body["content"]);
            stream.end();
          });
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
