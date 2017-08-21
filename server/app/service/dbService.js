var dbObj = require('./../../dbconfig/mongoUtil');
var dbConfig = require('./../../dbconfig/db');

exports.loginAuthantication = function(req, res) {
    var db = dbObj.getDb();
    var uname = req.body.uname;
    var pwd = req.body.password;

    db.collection(dbConfig.collection1).findOne({"Uname":uname}, function(err, result) { 
        if(err) return console.log(err);

        if(!result) {
           return console.log('user not exists');
        } else if(result.Password != pwd) {
           return console.log('password doesnt match'); 
        } else {
            console.log('authentication success');
        }

    }) 
}       
      
exports.signUp = function(req, res) {
   var db = dbObj.getDb();
   db.collection(dbConfig.collection1).insertOne(req.body, function(err, result) {
       if(err) return console.log(err);

       console.log('data inserted successfully');    
   })
} 