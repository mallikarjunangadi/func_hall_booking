angular.module('hallBooking.globalcontroller', [])
.controller('global', function($rootScope, $scope,$cordovaToast){
 $rootScope.ShowToast = function(message, longx) {
        if (window.cordova) {
            if (longx == true) {
                $cordovaToast.showLongCenter(message).then(function(success) {
                    // success
                    console.log("Toast Success");
                }, function(error) {
                    // error
                    console.log("Toast Failed");
                });
            } else {
                $cordovaToast.showShortCenter(message).then(function(success) {
                    // success
                    console.log("Toast Success");
                }, function(error) {
                    // error
                    console.log("Toast Failed");
                });

            }
        }

    }   
})