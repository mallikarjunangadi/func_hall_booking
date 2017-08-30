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

}).controller('loginCtrl', function($scope, $state, ApiCallService, $location) {

    $scope.loginObj = {};
    $scope.loginFunc = function(loginObj) {
        console.log('login func');
        if (!loginObj.EmailId) {
            console.log('email id is required');
            return;
        }
        if (!loginObj.Password) {
            console.log('password is required');
            return;
        }

        if(loginObj.EmailId == "public" && loginObj.Password == "12345") {
            $location.path('customerDetails')
        } 

/*
        var promise = ApiCallService.PostRequest($scope.loginObj, '/loginAuth');
        promise.then(function(res) {
            console.log(res);
        }, function() {
            console.log('error')
        })
*/        
    }

}).controller('signUpCtrl', function($scope, $state) {

    $scope.signUpObj = {};

    $scope.signUp = function(signUpObj) {
        console.log('signup');
        
        if (!signUpObj.PhoneNumber) {
            console.log('mobile number is required');
            return;
        }
        
        if (signUpObj.PhoneNumber != 10) {
            console.log('invalid mobile number');
            return;
        }
        
        if (!signUpObj.EmailId) {
            console.log('email is required');
            return;
        }
        
        if (!signUpObj.Password) {
            console.log('password is required');
            return;
        }
        if (signUpObj.Password != signUpObj.cPassword) {
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
.controller('publicFacility', function($scope, setPublicFacility,$state) {
    $scope.publicMsg={};
    $scope.$on('$ionicView.beforeEnter', function(){
    $scope.facility=setPublicFacility.getFacility();
   console.log($scope.facility);
   })
 
   $scope.getFacilityList=function(){
   $state.go('publicfacility');  
  }
  $scope.selectedFacility=function(name){
      setPublicFacility.setFacility(name);
      $scope.facility=setPublicFacility.getFacility();
      console.log($scope.facility);
      $state.go('customerDetails')
  }  
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

$scope.publicMsgList=[];

$scope.sendPublicMsg=function(){

    $scope.publicMsg={
        publicUserId:1,
        publicImage:'img/user1.png',
        publicMssge:$scope.senderMsg,
        date:new Date().getTime()
    }
    $scope.managerMsg={
        managerUserId:2,
        managerImage:'img/user2.jpg',
        managerMsg:'Customer want to book a hall',
        date:new Date()
    }

$scope.publicMsgList.push({publicMsgs:$scope.publicMsg,managerMsgs:$scope.managerMsg});
$scope.senderMsg="";
console.log($scope.senderMsg);
}

})