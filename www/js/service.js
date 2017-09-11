angular.module('hallBooking.service', [])
    .factory('ApiCallService', function($http, $q) {
        return {
            PostRequest: function(doc2send, Url) {
                var deferred = $q.defer();
                 console.log(doc2send);
                var options = {
                    method: "POST",
                    url: Url,
                    data: jQuery.param(doc2send),
                    headers: {
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
                 return deferred.promise;
            },
            GetRequest: function(doc2send, Url) {
                var deferred = $q.defer();
                Url =  Url;

                var options = {
                    method: "GET",
                    url: Url,
                     headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                }

                $http(options).then(function(res) {
                    deferred.resolve(res);
                }, function(res) {
                    deferred.reject(res);
                })
                return deferred.promise;
            }
        }
    })
 .factory('loginCrd', function() {
        var longinCr= {};
        return {
            getLoinCredentials: function() {
                return localStorage.getItem('loginCrendential');
            },setLoginCredentials: function(longinCred) {
                longinCr.phoneNumb = longinCred.PhoneNumber;
                longinCr.emailId=longinCred.EmailId;
                longinCr.passwrd=longinCred.Password;
                localStorage.setItem("loginCrendential",JSON.stringify(longinCr));
            },
            removeCredentials:function() {
           localStorage.removeItem('loginCrendential');
            }

            
        }
    })