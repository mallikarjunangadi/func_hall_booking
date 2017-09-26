angular.module('hallBooking.service', [])
    .factory('ApiCallService', function($http, $q) {
        return {
            PostRequest: function(doc2send, Url) {
                var deferred = $q.defer();

                var req = {
                    method: "POST",
                    url: 'http://210.48.150.218/TSRAPI/APIService.svc' + Url,
                    data: JSON.stringify(doc2send),
                    headers: {

                        'Content-type': 'application/json '

                    }
                }
                console.log(req);
                $http(req).then(function(res) {
                    console.log(res)
                    deferred.resolve(res);
                }, function(res) {
                    console.log(res)
                    deferred.reject(res);
                })
                return deferred.promise;
            },
            GetRequest: function(doc2send, Url) {
                var deferred = $q.defer();
                var options = {
                    method: "GET",
                    url: 'http://210.48.150.218/TSRAPI/APIService.svc' + Url,
                    params: doc2send,
                    header: {
                        "Content-Type": 'application/json'
                    }
                }
                console.log(options)
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
        var longinCr = {};
        var phoneNumber = {};
        return {
            getLoinCredentials: function() {
                return localStorage.getItem('loginCrendential');
            },
            setPhoneNumber: function(phNumber) {
                phoneNumber.PhoneNo = phNumber.PhoneNumber;
                localStorage.setItem('phoneNumber', JSON.stringify(phoneNumber))
            },
            getPhoneNumber: function() {
                return localStorage.getItem('phoneNumber');
            },
            setLoginCredentials: function(longinCred) {
                //longinCr.phoneNumb = longinCred.PhoneNumber;
                longinCr.emailId = longinCred.EmailId;
                longinCr.passwrd = longinCred.Password;
                localStorage.setItem("loginCrendential", JSON.stringify(longinCr));
            },
            removeCredentials: function() {
                localStorage.removeItem('loginCrendential');
            }


        }
    })
    .factory('myService', function() {
        var savedData;
        //var saveaData;
        function set(data) {
            console.log(data);
            savedData = data;
        }

        function get() {
            return savedData;
        }
        /*function setAggent(data) {
            console.log(data);
            saveaData = data;
        }
        function getAggent() {
            return saveaData;
        }*/
        return {
            set: set,
            get: get,
            //setAggent: setAggent,
            //getAggent: getAggent,
        }
    })