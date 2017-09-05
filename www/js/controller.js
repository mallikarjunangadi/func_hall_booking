angular.module('hallBooking.controller', [])
    .controller('mainHomeCtrl', function($scope, $state) {
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
            $state.go('entry');
        }

    })
    .controller('loginCtrl', function($scope, $state, ApiCallService, $location) {

        $scope.loginObj = {};
        $scope.enquiry=function(){
           $state.go('publicEnquiry');
        }
        $scope.login=function(){
           $state.go('login');
        }
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
                $location.path('internalTabs');
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
        $scope.signIn=function(){
            $state.go('login');
        }

    })
    .controller('signUpCtrl', function($scope, $state) {

        $scope.signUpObj = {};
        $scope.contExe = false;
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
    .controller('publicFacility', function($rootScope, $scope, setPublicFacility, $state, $ionicModal, ApiCallService) {
        $scope.publicMsg = {};
        $scope.imgDes = false;
         $scope.publicMsgList = [];
         $scope.facility='';
       var promise = ApiCallService.GetRequest({}, 'http://210.48.150.218/TSRAPI/APIService.svc/GetAllEvents');
        promise.then(function(res) {
            console.log(res);
        }, function() {
            console.log('error')
        })
        var promise = ApiCallService.GetRequest({}, 'http://210.48.150.218/TSRAPI/APIService.svc/GetAllUsers');
        promise.then(function(res) {
            console.log(res);
        }, function() {
            console.log('error')
        })
        var promise = ApiCallService.GetRequest({}, 'http://210.48.150.218/TSRAPI/APIService.svc/GetAllEnquiry');
        promise.then(function(res) {
            console.log(res);
        }, function() {
            console.log('error')
        })
        $scope.slides = [{
                "head": "Welcome to TSR Hall booking app",
                "content": "It is the beginning of a new relationship. With your future spouse and as you will discover, with TSR. Because, once you have chosen TSR, you will look no further when you want every single event in your life to be remembered forever.."
            },
            {
                "head": "Welcome to TSR Hall booking app",
                "content": "This is a basic Card which contains an item that has wrapping text."
            },
            {
                "head": "Welcome to TSR Hall booking app",
                "content": "This is a basic Card which contains an item that has wrapping text."
            }
        ];

        $scope.publicfacility = [{
                name: "D'ROYALE HALL",
                img: "img/106.jpg"
            },
            {
                name: "LE GRAND HALL",
                img: "img/201.jpg"
            },
            {
                name: "PRE FUNCTION HALL",
                img: "img/205.jpg"
            }
        ];
        $scope.model3 = $ionicModal.fromTemplateUrl('templates/publicfacility.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.model3= modal;
        })
         $scope.model2 = $ionicModal.fromTemplateUrl('templates/customerDetails.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.model2 = modal;
        })

         $scope.model1 = $ionicModal.fromTemplateUrl('templates/imgDescription.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.model1 = modal;
        })

    
        
        $scope.getFacilityList = function() {
            console.log('Hai')
           $scope.model2.hide(); 
          $scope.model3.show();
        }
         $scope.getFacilities = function() {
            $scope.imgDes = true;
            $scope.model3.show();

        }
        $scope.selectedFacility = function(facility) {
            if ($scope.imgDes) {
                $scope.image=facility.img;
                $scope.model1.show();
               } else {
                $scope.facility=facility.name;
                $scope.model3.hide();
                $scope.model2.show();
            }
        }
        $scope.selectedFacilitydescription = function(image) {
         $scope.model1.show();
        }
     
        $scope.contactExecut = function() {
          $scope.imgDes=false;  
        $scope.model2.show();
        }
        
        $scope.sendPublicMsg = function() {

            if ($scope.senderMsg == undefined || $scope.senderMsg == "") {
                $rootScope.ShowToast('Hai');
                return false
            }

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


         $scope.closeModel = function(model) {
            console.log(model);
             if(model=='model1'){
               $scope.model1.hide();  
             }else if(model=='model2'){
                $scope.model2.hide(); 
             }else if(model=='model3'){
                 $scope.model3.hide();
             }
         
        }


        $scope.goBack = function() {
            window.history.back();
        }

    })



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


    .controller('openticCtrl', function($scope, $location, myService) {
        $scope.openmesg = [{
            cusName: 'Sowmya',
            agentName: 'Un Usigned',
            img: '../img/user2.jpg',
            bookingDate: '22/10/2017',
            hallName: 'grandHall',
            lastCon: '14/3/2017',
            status: 'online'
        }, {
            cusName: 'Bhagya',
            agentName: 'Chaminda vaas',
            bookingDate: '22/10/2017',
            hallName: 'KRHall',
            img: '../img/user2.jpg',
            lastCon: '14/6/2017',
            status: 'offline'
        }, {
            cusName: 'Mallikarjun',
            agentName: 'Tendulkar',
            bookingDate: '22/10/2017',
            hallName: 'GPHall',
            img: '../img/user2.jpg',
            lastCon: '14/7/2017',
            status: 'waiting'
        }, {
            cusName: 'Sindhu',
            agentName: 'Swagat',
            bookingDate: '22/10/2017',
            hallName: 'ACHall',
            img: '../img/user2.jpg',
            lastCon: '14/10/2017',
            status: 'offline'
        }]
        $scope.msgList = function(x) {
            console.log(x);
            myService.set(x);
            $location.path('msgList');
        }
    }).controller('Messages', function($timeout, $ionicScrollDelegate, $location, myService, $scope, $rootScope) {
        $scope.data = {};
        $scope.myId = '12345';
        $scope.messages = [];
        console.log($scope)
        $scope.$on("$ionicView.beforeEnter", function() {
            console.log('Hai')
            $scope.cusdetail = myService.get();
            console.log($scope.cusdetail);
        })


        $scope.aggent = [{
                img: '../img/user2.jpg',
                agentName: 'Daniel vettori',
                status: 'offline'
            },
            {
                img: '../img/user2.jpg',
                agentName: 'Swagat',
                status: 'offline'
            },
            {
                img: '../img/user2.jpg',
                agentName: 'rosee',
                status: 'online'
            },
            {
                img: '../img/user2.jpg',
                agentName: 'Daniel',
                status: 'waiting'
            }
        ]

        $scope.back = function() {

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

        $scope.closeKeyboard = function() {

        };



    })
    .factory('myService', function() {
        var savedData;

        function set(data) {
            console.log(data);
            savedData = data;
        }

        function get() {
            return savedData;
        }
        return {
            set: set,
            get: get,
        }
    })