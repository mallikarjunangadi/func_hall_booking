angular.module('hallBooking.controller', []).controller('mainHomeCtrl', function($scope, $state, loginCrd) {

        var loginCred = {};
        $scope.slides = [{
            "head": "Welcome to TSR Hall booking app",
            "content": "Browse through our halls, see our catalog. To Book any hall simply select the days you are planning organise your event, and click communicate button. Instantly our executive come online to help you, to understand your needs. They help through out the process of booking hall.."
        }, {
            "head": "Welcome to TSR Hall booking app",
            "content": "Organising your event was never this simple before, just say what you are looking for, rest assured we will bring your needs to event venue."
        }, {
            "head": "Welcome to TSR Hall booking app",
            "content": "You get dedicated event executive for your every single event, they customize our halls according to your needs"
        }];

        $scope.getStarted = function() {
           /* loginCred = JSON.parse(loginCrd.getLoinCredentials());
            console.log(loginCred);

            if (loginCred == undefined || loginCred == null) {

                $state.go('entry');
            } else if (loginCred.phoneNumb != undefined && loginCred.phoneNumb != "") {
                $state.go('userTabs');
            } else if (loginCred.emailId != undefined && loginCred.passwrd != undefined) {
                $state.go('internalTabs');
            } else {
                $state.go('entry');
            }*/
            $state.go('userTabs');

        }
    

}).controller('loginCtrl', function(loginCrd, $scope, $state, ApiCallService, $location, $rootScope, $http) {

    $scope.loginObj = {};
    $rootScope.loginUser = "";

    $scope.enquiry = function() {
        $state.go('publicEnquiry');
    }

    $scope.publicLogin = function() {
        $state.go('publicLogin');
    }

    $scope.login = function() {
        loginCred = JSON.parse(loginCrd.getLoinCredentials());
        console.log(loginCred);
        if (loginCred == undefined || loginCred == null) {
            $state.go('login');
        } else if (loginCred.emailId != undefined && loginCred.passwrd != undefined) {
            $state.go('internalTabs');
        }
    }
    $scope.publicView = function() {
        if ($scope.loginObj.PhoneNumber == undefined) {
            return false;
        }
        loginCrd.setLoginCredentials($scope.loginObj)
        $state.go('userTabs');
    }
    $scope.publicLogin = function() {
        loginCred = JSON.parse(loginCrd.getLoinCredentials());
        console.log(loginCred);
        if (loginCred == undefined || loginCred == null) {
            $state.go('publicLogin');
        } else if (loginCred.phoneNumb != undefined && loginCred.phoneNumb != null) {
            $state.go('userTabs');
        }
    }
    $scope.intrernalogin = function() {
        console.log('login func');
        if (!$scope.loginObj.EmailId) {
            console.log('email id is required');
            return;
        }
        if (!$scope.loginObj.Password) {
            console.log('password is required');
            return;
        }

        loginCrd.setLoginCredentials($scope.loginObj);
        console.log($scope.loginObj);
        $rootScope.loginUser = $scope.loginObj.EmailId;

        var req = {
            method: 'get',
            url: "http://210.48.150.218/TSRAPI/APIService.svc/Login?username=admin&password=admin",
            data: jQuery.param({
                username: $scope.loginObj.EmailId,
                password: $scope.loginObj.Password
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        /* if ($scope.loginObj.EmailId == "internal" && $scope.loginObj.Password == "123") {

                 console.log('internal')
              $scope.loginObj={}
            $location.path('/internalTabs')
        } else if ($scope.loginObj.EmailId == "executive" && $scope.loginObj.Password == "123") {
            console.log('executive')
              $scope.loginObj={}
              $location.path('/internalTabs')


       }


       

    /*    $http(req).then(function(res) {
            
if(res.data.UserId==0)
{
     $location.path('/internalTabs')
    console.log('invalid user name or password')    

       }*/
        $http(req).then(function(res) {
            console.log(res);
            if (res.data.UserId == 0) {

                alert('invalid username and password');

                console.log('invalid user name or password')

            } else {
                $location.path('/internalTabs')
            }

        }, function(res) {
            console.log(res);

        })

    }
    $scope.signIn = function() {
        $state.go('login');
    }

    /* $http.get("http://210.48.150.218/TSRAPI/APIService.svc/GetAllUsers").then(function(response) {
            console.log(response);
            //$scope.aggent = response.data;
        })*/
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

    }
    $scope.goBack=function(){
        window.history.back();
    }
   
    })
  .controller('publicFacility', function($filter, loginCrd, $rootScope, $scope, $state, $ionicModal, ApiCallService) {

        $scope.publicMsg = {};
        $scope.imgDes = false;
        $scope.publicMsgList = [];
        $scope.facility = '';
     
        $scope.enquiryObj = {};
        $scope.events = [];
        var phnoNum={};
        var loginObj={};
        $scope.publicSignOut = function() {

            loginCrd.removeCredentials()
            $state.go('mainHome')
        }
        var promise = ApiCallService.GetRequest({}, '/GetAllEvents');
        promise.then(function(res) {
            console.log(res.data)
            $scope.events = res.data;
        }, function() {
            console.log('error')
        })
        var promise = ApiCallService.GetRequest({}, '/GetAllUsers');
        promise.then(function(res) {
            console.log(res);
        }, function() {
            console.log('error')
        })
        var promise = ApiCallService.GetRequest({}, '/GetAllEnquiry');
        promise.then(function(res) {
            console.log(res);
        }, function() {
            console.log('error')
        })

        $scope.enquiryForm = function() {
            if ($scope.enquiryObj.FirstName == undefined || $scope.enquiryObj.FirstName == "") {
                $rootScope.ShowToast('Enter First Name')
                console.log('Enter First Name')
                return false;
            }
            if ($scope.enquiryObj.LastName == undefined || $scope.enquiryObj.LastName == "") {
                $rootScope.ShowToast('Enter Last Name')
                console.log('Enter Last Name')
                return false;
            }
            if ($scope.enquiryObj.ContactNo == undefined || $scope.enquiryObj.ContactNo == "") {
                $rootScope.ShowToast('Enter Contact No')
                console.log('Enter Contact No')
                return false;
            }
            if ($scope.enquiryObj.Email == undefined || $scope.enquiryObj.Email == "") {
                $rootScope.ShowToast('Enter Email')
                return false;
            }
            if ($scope.enquiryObj.EventId == undefined || $scope.enquiryObj.EventId == "") {
                $rootScope.ShowToast('Enter Event Id')
                return false;
            }
            if ($scope.enquiryObj.EventDate == undefined || $scope.enquiryObj.EventDate == "") {
                $rootScope.ShowToast('Enter EventDate')
                return false;
            }

           
            $scope.enquiryObj.EventDate = $filter('date')($scope.enquiryObj.EventDate, 'dd/MM/yyyy');

            console.log($scope.enquiryObj);
            var promise = ApiCallService.PostRequest($scope.enquiryObj, 'http://210.48.150.218/TSRAPI/APIService.svc/CreateEnquiry');

            //var promise = ApiCallService.PostRequest(enquiryObj, 'http://210.48.150.218/TSRAPI/APIService.svc/CreateEnquiry');

            promise.then(function(res) {
                if (res.data == true) {
                    $rootScope.ShowToast('Enquiry Form Added Successfully')
                   phnoNum.PhoneNumber =$scope.enquiryObj.ContactNo
                    loginCrd.setPhoneNumber(phnoNum);
                    $scope.enquiryObj = {};
                } else {
                    $rootScope.ShowToast('Failed to Add Enquiry ')
                }

            }, function(err) {
                console.log(err)
            })

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
        $scope.model3 = $ionicModal.fromTemplateUrl('templates/publicfacility.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.model3 = modal;
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
                $scope.image = facility.img;
                $scope.model1.show();
            } else {
                $scope.facility = facility.name;
                $scope.model3.hide();
                $scope.model2.show();
            }
        }
        $scope.selectedFacilitydescription = function(image) {
            $scope.model1.show();
        }

        $scope.contactExecut = function() {
            $scope.imgDes = false;
            $scope.model2.show();
        }
       
        $scope.sendPublicMsg = function() {
            if ($scope.senderMsg == undefined || $scope.senderMsg == "") {
                $rootScope.ShowToast('Enter Message');
                return false
            }
            loginObj = JSON.parse(loginCrd.getPhoneNumber());
            console.log(loginObj)

            if(loginObj==null||loginObj==undefined){
                console.log('Enter Enquiry Form');
               $rootScope.ShowToast('Enter Enquiry Form'); 
               return false;
            }else if(loginObj.PhoneNumber==null||loginObj.PhoneNumber==undefined){
               console.log('Enter Enquiry Form');
               $rootScope.ShowToast('Enter Enquiry Form'); 
               return false; 
            }
         
        var promise = ApiCallService.GetRequest({PhoneNo:"1234567890"}, '/GetEnquirybyPhoneNo');
        promise.then(function(res) {
            console.log(res);
        }, function(err) {
            console.log(err)
        })
           
            $scope.publicMsg = {
                EnquiryId: 1,
                Message:'Hello Pubic Message',
                ReplyFrom:1,
                UserId:null
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
            if (model == 'model1') {
                $scope.model1.hide();
            } else if (model == 'model2') {
                $scope.model2.hide();
            } else if (model == 'model3') {
                $scope.model3.hide();
            }

        }

        $scope.goBack = function() {
            window.history.back();
        }

    }).directive('input', function($timeout) {
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
}).controller('openticCtrl', function($scope, $location, myService, $http, ApiCallService) {

    $http.get("http://210.48.150.218/TSRAPI/APIService.svc/GetAllEnquiry").then(function(response) {
        console.log(response);
        $scope.openmesg = response.data;
        console.log(response.data);
    })

    /*var req = {
            method: 'POST',
            url: "http://210.48.150.218/TSRAPI/APIService.svc/AssignEnquiry",
            data: jQuery.param(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    
        $http(req).then(function(res) {
            console.log(res);
        })*/

    /*$scope.openmesg = [{
            cusName: 'Sowmya',
            agentName: 'Un Usigned',
            img: 'img/user2.jpg',
            bookingDate: '22/10/2017',
            hallName: 'grandHall',
            lastCon: '14/3/2017',
            status: 'online'
        }, {
            cusName: 'Bhagya',
            agentName: 'Chaminda vaas',
            bookingDate: '22/10/2017',
            hallName: 'KRHall',
            img: 'img/user2.jpg',
            lastCon: '14/6/2017',
            status: 'offline'
        }, {
            cusName: 'Mallikarjun',
            agentName: 'Tendulkar',
            bookingDate: '22/10/2017',
            hallName: 'GPHall',
            img: 'img/user2.jpg',
            lastCon: '14/7/2017',
            status: 'waiting'
        }, {
            cusName: 'Sindhu',
            agentName: 'Swagat',
            bookingDate: '22/10/2017',
            hallName: 'ACHall',
            img: 'img/user2.jpg',
            lastCon: '14/10/2017',
            status: 'offline'
        }]*/
    $scope.msgList = function(x) {
        console.log(x);
        myService.set(x);
        $location.path('msgList');
    }
}).controller('Messages', function($timeout, $http, $ionicScrollDelegate, $location, myService, $scope, $rootScope, ApiCallService) {
    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];
    console.log($scope)
    $scope.$on("$ionicView.beforeEnter", function() {
        console.log('Hai')
        $scope.cusdetail = myService.get();
        console.log($scope.cusdetail);
    })
    $http.get("http://210.48.150.218/TSRAPI/APIService.svc/GetEnquiryReplybyTicket?TicketNo=EQ10001").then(function(response) {
        console.log(response);
        $scope.EnqReply = response.data[0];
        console.log(response.data);
    })

    $http.get("http://210.48.150.218/TSRAPI/APIService.svc/GetAllUsers").then(function(response) {
        console.log(response);
        $scope.aggent = response.data;
        console.log(response.data);
    })

    /* $scope.aggent = [
        {
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
        ]}*/

    $scope.back = function() {

        $location.path('internalTabs');
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

    $scope.closeKeyboard = function() {}
    ;

    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];

    var pushMessObj = {
            EnquiryId:16,
            Message:$scope.data.message,
            ReplyFrom:2,
            UserId: 'me'
        }
 var promise = ApiCallService.PostRequest(pushMessObj, '/CreateEnquiryReply');
        promise.then(function(res) {
            console.log(res);
        }, function(err) {
            console.log(err);
        })

    $scope.moveAssigner = function(y) {
        console.log(y);
        var assignObj = {
            EnquiryId: $scope.cusdetail.EnquiryId,
            AssignId: y.UserId
        }
        var promise = ApiCallService.PostRequest(assignObj, '/AssignEnquiry');
        promise.then(function(res) {
            console.log(res);
            if (res.data == true) {

                alert('Assign sucessfuly');

                console.log('Assign sucessfuly')

            } else {
                alert('Not Assigned');

                console.log('Not Assigned')

            }

        }, function(err) {
            console.log(err);
        })
        //$location.path('assign');
    }

}).controller('interCtrl', function($scope, $location, loginCrd) {
    $scope.logout = function() {
        console.log('Hai')
        loginCrd.removeCredentials();
        $location.path('/userTabs');

    }
})

/*.controller('assignerCtrl', function($scope, $timeout, $ionicScrollDelegate, $location, myService) {
     
$scope.$on('$ionicView.beforeEnter', function() {
        $scope.cusdetail = myService.get();
        console.log($scope.cusdetail);
    })
     $scope.$on('$ionicView.beforeEnter', function() {
        $scope.Aggentdetail = myService.getAggent();
        console.log($scope.Aggentdetail);
    })

    
    $scope.back = function() {

        $location.path('internalTabs');
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


})*/
