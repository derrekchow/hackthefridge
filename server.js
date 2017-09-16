var express = require('express');
var app = express();
var watson = require('watson-developer-cloud');

var visual_recognition = watson.visual_recognition({
  api_key: '6ccb2135cb0de39c10a64b54ee6280e2aa2f8678',
  version: 'v3',
  version_date: '2016-05-20'
});

// todo: change with post
app.get('/', function (req, res) {
   var name = req.query['name'];

   var params = {
     url: "http://52.15.34.99/" + name + ".jpg";
   };

   visual_recognition.classify(params, function(err, resp) {
     if (err)
       res.send(err);
     else
       res.send(JSON.stringify(resp, null, 2));
   });
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   res.send('Hello POST');
})

var server = app.listen(8081, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port)
})

// pi makes post request to save.php with original python code
// server stores the data in cockroach db
