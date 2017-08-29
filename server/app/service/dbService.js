var dbObj = require('./../../dbconfig/mongoUtil');
var dbConfig = require('./../../dbconfig/db');
var cryptiles = require('cryptiles');

exports.loginAuthantication = (req, res) => {
    let db = dbObj.getDb();
    let emailId = req.body.EmailId;
    let pwd = req.body.Password; 
    let {EmailId, Password} = req.body;
    console.log(EmailId);
    console.log(Password);

    db.collection(dbConfig.collection1).findOne({"EmailId":emailId},(err, result) => { 
        if(err) {
          console.log(err);
          return res.send({"data":"", "message":"Unable to login", "done":false})  
        } 

        if(!result) { 
           console.log('user not exists');
           return res.send({"data":"", "message":"Username not exists", "done":false})
        } else if(!cryptiles.fixedTimeComparison(result.Password, pwd)) {
           console.log('password doesnt match'); 
           return res.send({"data":"", "message":"password doesn't match", "done":false})
        } else {
            console.log('authentication success');
            return res.send({"data":"", "message":"login success", "done":true})
        }

    }) 
}       
      
exports.signUp = (req, res) => {
   let db = dbObj.getDb();

   let userObj = {
       PhoneNumber: req.body.PhoneNumber,
       EmailId: req.body.EmailId,
       Password: req.body.Password
   }
 
   db.collection(dbConfig.collection1).insertOne(userObj, (err, result) => {
       if(err) {
           console.log(err);
           return res.send({"data":"", "message":"Unable to signUp", "done":false})   
       }

       console.log('data inserted successfully');
       return res.send({"data":"", "message":"User registered successfully", "done":true})    
   })
} 