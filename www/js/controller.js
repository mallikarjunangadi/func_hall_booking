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

        if (loginObj.EmailId == "public" && loginObj.Password == "123") {
            $location.path('userTabs');
        }
        if (loginObj.EmailId == "internal" && loginObj.Password == "123") {
            $location.path('/mainTab');
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
}).controller('publicFacility', function($scope, setPublicFacility, $state) {
    $scope.publicMsg = {};
    $scope.$on('$ionicView.beforeEnter', function() {
        $scope.facility = setPublicFacility.getFacility();
        console.log($scope.facility);
    })

    $scope.getFacilityList = function() {
        $state.go('publicfacility');
    }
    $scope.selectedFacility = function(name) {
        setPublicFacility.setFacility(name);
        $scope.facility = setPublicFacility.getFacility();
        console.log($scope.facility);
        $state.go('customerDetails')
    }
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
    $scope.publicfacility = [{
        name: "D'ROYALE HALL",
        img: "img/106.jpg"
    }, {
        name: "LE GRAND HALL",
        img: "img/201.jpg"
    }, {
        name: "PRE FUNCTION HALL",
        img: "img/205.jpg"
    }];
    $scope.goBack = function() {
        window.history.back();
    }
    $scope.publicMsgList = [];

    $scope.sendPublicMsg = function() {

        $scope.publicMsg = {
            publicUserId: 1,
            publicImage: 'img/user1.png',
            publicMssge: $scope.senderMsg,
            date: new Date().getTime()
        }
        $scope.managerMsg = {
            managerUserId: 2,
            managerImage: 'img/user2.jpg',
            managerMsg: 'Customer want to book a hall',
            date: new Date()
        }

        $scope.publicMsgList.push({
            publicMsgs: $scope.publicMsg,
            managerMsgs: $scope.managerMsg
        });
        $scope.senderMsg = "";
        console.log($scope.senderMsg);
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

.controller('openticCtrl', function($scope, $location){
    $scope.openmesg = [
                 {cusName:'Daniel Benitez',
                 msg:'for date 22/10/2017,for le grandHall',
                 lastCon:'last contact 14/3/2017'},
                 {cusName:'Espera',
                 msg:'for date 22/10/2017,for le grandHall',
                 lastCon:'last contact 14/3/2017'}
    ]
    $scope.msgList = function(){
        $location.path('msgList')
    }
})
.controller('Messages', function($scope, $timeout, $ionicScrollDelegate, $location) {

    $scope.back = function(){

        $location.path('openTicket');
    }

    $scope.hideTime = true;
    $scope.incmessages = [];

    var alternate, isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    $scope.sendMessage = function() {
        console.log('enter');

        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

        $scope.messages.push({
            userId: 'me',
            text: $scope.data.message,
            time: d

        });

        $timeout(function() {
            $scope.messages.push({
                userId: 'you',
                text: 'hi,hello...',
                time: d

            });
        }, 2000)

        delete $scope.data.message;
        $ionicScrollDelegate.scrollBottom(true);

    };

    $scope.inputUp = function() {
        if (isIOS)
            $scope.data.keyboardHeight = 216;
        $timeout(function() {
            $ionicScrollDelegate.scrollBottom(true);
        }, 300);

    };

    $scope.inputDown = function() {
        if (isIOS)
            $scope.data.keyboardHeight = 0;
        $ionicScrollDelegate.resize();
    };

    $scope.closeKeyboard = function() {// cordova.plugins.Keyboard.close();
    }
    ;

    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];

})
