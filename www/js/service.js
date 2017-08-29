angular.module('hallBooking.service', [])
.factory('ApiCallService', function($http, $q) {
    return {
        PostRequest: function(doc2send, Url) {
            var deferred = $q.defer();
          //  Url = "" + Url;
            console.log(doc2send);  
            var options = {
                "method": "POST",  
                "Url": Url, 
                "data": jQuery.param(doc2send), 
                "headers": { 
                    "Content-Type": 'application/x-www-form-urlencoded', 
                    'Authorization': 'Bearer ' 
                }
            }

            console.log(options);
  
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

.factory('setPublicFacility', function() {
 var facility={};
return {
  getFacility : function () {
    return facility.name;
},

setFacility: function (name) {
    facility.name = name;
   }
}
})