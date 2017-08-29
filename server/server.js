let express = require('express');
let bodyParser = require('body-parser');
let mongoUtil = require('./dbconfig/mongoUtil');

var app = express();
app.use(bodyParser.urlencoded({"extended":true}));
require('./app/routes')(app);

mongoUtil.connectToDB((err) => {
    if(err)
      console.log(err);
    else 
      console.log('db created successfully')  
})

app.listen(8080, () => {
    console.log('server running at 8080');
});