angular.module('hallBooking.service', [])
.factory('ApiCallService', function($http) {
    return {
        PostRequest: function(doc2send, Url) {
            var deferred = $q.defer();
            Url = "" + Url;
 
            var options = {
                "method": "POST",  
                "Url": Url, 
                "data": jQuery.param(doc2send), 
                "headers": { 
                    "Content-Type": 'application/x-www-form-urlencoded' 
           //       'Authorization': 'Bearer ' + authentication.getToken()
                }      
            }    
  
            $http(options).then(function(res) {
               deferred.resolve(res);
            }, function() { 
               deferred.reject(res);
            })
        },
        GetRequest: function(doc2send, Url) {
            var deferred = $q.defer();
            Url = "" + Url;
 
            var options = {
                "method": "GET",
                "Url": Url,
                "data": jQuery.param(doc2send),
                "headers": {
                    "Content-Type": 'application/x-www-form-urlencoded'
           //         'Authorization': 'Bearer ' + authentication.getToken()
                }
            }

            $http(options).then(function(res) {
               deferred.resolve(res);
            }, function() {
               deferred.reject(res);
            })
        }
    }
})
