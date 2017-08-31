var mongoClient = require('mongodb').MongoClient;
var dbconfig = require('./db');
var _db;

module.exports = {
    connectToDB: function(callback) {
        mongoClient.connect(dbconfig.url, function(err, db) {
            _db = db;  
            
            return callback(err);
        }) 
    },
   getDb: function() { 
       return _db;
   } 
}
