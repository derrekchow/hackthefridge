var express = require('express');
var app = express();

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
