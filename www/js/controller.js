angular.module('hallBooking.controller', []).controller('mainHomeCtrl', function($scope, $state) {
    $scope.slides = [{
        "head": "Welcome to TSR Hall booking app",
        "content": "It is the beginning of a new relationship. With your future spouse and as you will discover, with TSR. Because, once you have chosen TSR, you will look no further when you want every single event in your life to be remembered forever.."
    }, {
        "head": "Welcome to TSR Hall booking app",
        "content": "This is a basic Card which contains an item that has wrapping text."
    }, {
        "head": "Welcome to TSR Hall booking app",
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
})//example//

.directive('input', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            'returnClose': '=',
            'onReturn': '&',
            'onFocus': '&',
            'onBlur': '&'
        },
        link: function(scope, element, attr) {
            element.bind('focus', function(e) {
                if (scope.onFocus) {
                    $timeout(function() {
                        scope.onFocus();
                    });
                }
            });
            element.bind('blur', function(e) {
                if (scope.onBlur) {
                    $timeout(function() {
                        scope.onBlur();
                    });
                }
            });
            element.bind('keydown', function(e) {
                if (e.which == 13) {
                    if (scope.returnClose)
                        element[0].blur();
                    if (scope.onReturn) {
                        $timeout(function() {
                            scope.onReturn();
                        });
                    }
                }
            });
        }
    }
})
.controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {

    $scope.hideTime = true;
    $scope.incmessages=[];

    var alternate, isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    $scope.sendMessage = function() {
        console.log('enter');
        

        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

        $scope.messages.push({
            userId:  '12345',
            text: $scope.data.message,
            time: d
            
        });

        
        $timeout(function () {
            $scope.incmessages.push({
            userId:  '12345',
            text: 'hi,hello...',
            time: d
            
        });
        }, 2000)

        delete $scope.data.message;
        $ionicScrollDelegate.scrollBottom(true);

    }
    ;

    $scope.inputUp = function() {
        if (isIOS)
            $scope.data.keyboardHeight = 216;
        $timeout(function() {
            $ionicScrollDelegate.scrollBottom(true);
        }, 300);

    }
    ;

    $scope.inputDown = function() {
        if (isIOS)
            $scope.data.keyboardHeight = 0;
        $ionicScrollDelegate.resize();
    }
    ;

    $scope.closeKeyboard = function() {// cordova.plugins.Keyboard.close();
    }
    ;

    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];

});
