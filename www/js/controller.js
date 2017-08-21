angular.module('hallBooking.controller', [])
.controller('loginCtrl', function($scope, $state, ApiCallService) {

    $scope.goToSignUp = function() {
        $state.go('signUp');
    }

    $scope.loginObj = {};
    $scope.loginFunc = function(loginObj) {
        console.log('login func');
        if(!loginObj.uName) {
            console.log('username is required');
            return;
        }
        if(!loginObj.password) {
            console.log('password is required');
            return;
        }        

        var promise = ApiCallService.PostRequest($scope.loginObj, '/loginAuth');
        promise.then(function(res) {
            console.log(res);
        }, function() {
            console.log('error')
        })
    }

})
.controller('signUpCtrl', function($scope, $state) {

    $scope.goToLogin = function() {
        $state.go('login')
    }

    $scope.signUpObj = {};
    $scope.signUp = function(signUpObj) {
        console.log('signup');
        if(!signUpObj.uName) {
            console.log('user name is required');
            return;
        }
        if(!signUpObj.emailId) {
            console.log('email is required');
            return;
        }
        if(!signUpObj.mobileNo) {
            console.log('mobile number is required');
            return;
        }
        if(signUpObj.mobileNo != 10) {
            console.log('invalid mobile number');
            return;
        }
        if(!signUpObj.password) {
            console.log('password is required');
            return;
        }
        if(signUpObj.password != signUpObj.cPassword) {
            console.log('Password doesnt match');
            return;
        }

        var promise = ApiCallService.PostRequest($scope.signUpObj, '/signUp');
        promise.then(function(res) {
            console.log(res);
        }, function() {
            console.log('error')
        })
    }
})
