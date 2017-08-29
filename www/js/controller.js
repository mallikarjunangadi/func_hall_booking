angular.module('hallBooking.controller', []).controller('mainHomeCtrl', function($scope, $state) {
    $scope.slides = [{
        "head":"Welcome to TSR Hall booking app",
        "content": "It is the beginning of a new relationship. With your future spouse and as you will discover, with TSR. Because, once you have chosen TSR, you will look no further when you want every single event in your life to be remembered forever.."
    },
    {
        "head":"Welcome to TSR Hall booking app",
        "content": "This is a basic Card which contains an item that has wrapping text."
    },
    {
        "head":"Welcome to TSR Hall booking app",
        "content": "This is a basic Card which contains an item that has wrapping text."
    }];

    $scope.getStarted = function() {
        $state.go('login');
    }

}).controller('loginCtrl', function($scope, $state, ApiCallService) {

    $scope.loginObj = {};
    $scope.loginFunc = function(loginObj) {
        console.log('login func');
        if (!loginObj.uName) {
            console.log('username is required');
            return;
        }
        if (!loginObj.password) {
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

}).controller('signUpCtrl', function($scope, $state) {

    $scope.signUpObj = {};
    $scope.signUp = function(signUpObj) {
        console.log('signup');
        if (!signUpObj.uName) {
            console.log('user name is required');
            return;
        }
        if (!signUpObj.emailId) {
            console.log('email is required');
            return;
        }
        if (!signUpObj.mobileNo) {
            console.log('mobile number is required');
            return;
        }
        if (signUpObj.mobileNo != 10) {
            console.log('invalid mobile number');
            return;
        }
        if (!signUpObj.password) {
            console.log('password is required');
            return;
        }
        if (signUpObj.password != signUpObj.cPassword) {
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
.controller('publicFacility', function($scope, $state) {
 $scope.slides = [{
        "head":"Welcome to TSR Hall booking app",
        "content": "It is the beginning of a new relationship. With your future spouse and as you will discover, with TSR. Because, once you have chosen TSR, you will look no further when you want every single event in your life to be remembered forever.."
    },
    {
        "head":"Welcome to TSR Hall booking app",
        "content": "This is a basic Card which contains an item that has wrapping text."
    },
    {
        "head":"Welcome to TSR Hall booking app",
        "content": "This is a basic Card which contains an item that has wrapping text."
    }];    
$scope.publicfacility=[
{name:"D'ROYALE HALL",
img:"img/106.jpg"
},
{name:"LE GRAND HALL",
img:"img/201.jpg"},
{name:"PRE FUNCTION HALL",
 img:"img/205.jpg"}
];

})