var dbObj = require('./../../dbconfig/mongoUtil');
var dbConfig = require('./../../dbconfig/db');
var cryptiles = require('cryptiles');

exports.loginAuthantication = function(req, res) {
    var db = dbObj.getDb();
    var uname = req.body.uname;
    var pwd = req.body.password;

    db.collection(dbConfig.collection1).findOne({"uName":uname}, function(err, result) { 
        if(err) {
          console.log(err);
          return res.send({"data":"", "message":"Unable to login", "done":false})  
        } 

        if(!result) { 
           console.log('user not exists');
           return res.send({"data":"", "message":"Username not exists", "done":false})
        } else if(!cryptiles.fixedTimeComparison(result.password, pwd)) {
           console.log('password doesnt match'); 
           return res.send({"data":"", "message":"password doest match", "done":false})
        } else {
            console.log('authentication success');
            return res.send({"data":"", "message":"login success", "done":true})
        }

    }) 
}       
      
exports.signUp = function(req, res) {
   var db = dbObj.getDb();
   
   db.collection(dbConfig.collection1).insertOne(req.body, function(err, result) {
       if(err) {
           console.log(err);
           return res.send({"data":"", "message":"Unable to signUp", "done":false})   
       } 

       console.log('data inserted successfully');
       return res.send({"data":"", "message":"User registered successfully", "done":true})    
   })
} 