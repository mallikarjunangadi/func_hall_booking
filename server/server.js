var express = require('express');
var bodyParser = require('body-parser');
var mongoUtil = require('./dbconfig/mongoUtil');

var app = express();
app.use(bodyParser.urlencoded({"extended":true}));
require('./app/routes')(app);

mongoUtil.connectToDB(function(err) {
    if(err)
      console.log(err);
    else 
      console.log('db created successfully')  
})

app.listen(8080);