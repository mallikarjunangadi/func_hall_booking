angular.module('hallBooking.controller', [])

.controller('loginCtrl', function($scope, $state) {
    
    $scope.goToSignUp = function() {
        $state.go('signUp');
    }

    $scope.loginObj = {}; 
    $scope.loginFunc = function() {
       console.log('login func') 
    }

})

.controller('signUpCtrl', function($scope, $state) { 

   $scope.goToLogin = function() {
       $state.go('login')
   }
   
   $scope.signUpObj = {};
   $scope.signUp = function() {
       console.log('signup')
   }
})