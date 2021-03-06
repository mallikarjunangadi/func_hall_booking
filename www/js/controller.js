angular.module('hallBooking.controller', []).controller('mainHomeCtrl', function($scope, $state, loginCrd, $location, $ionicPlatform, $ionicPopup) {
    var loginCred = {};
    /* $scope.slides = [{
        "head": "Welcome to TSR Hall booking app",
        "content": "Browse through our halls, see our catalog. To Book any hall simply select the days you are planning organise your event, and click communicate button. Instantly our executive come online to help you, to understand your needs. They help through out the process of booking hall.."
    }, {
        "head": "Welcome to TSR Hall booking app",
        "content": "Organising your event was never this simple before, just say what you are looking for, rest assured we will bring your needs to event venue."
    }, {
        "head": "Welcome to TSR Hall booking app",
        "content": "You get dedicated event executive for your every single event, they customize our halls according to your needs"
    }];*/

    var exitConfirm = function() {
        if ($location.path() == '/sideMenu' || $location.path() == '/main/recharge') {
            $ionicPopup.confirm({
                title: 'Exit App',
                content: 'Do you want to exit?',
                okText: 'OK',
                cancelText: 'Cancel'
            }).then(function(res) {
                if (res) {
                    navigator.app.exitApp();
                }
            });
        }
    }

    var removeConfirm = angular.noop();
    if ($location.path() == '/sideMenu' || $location.path() == '/main/recharge') {
        removeConfirm = $ionicPlatform.registerBackButtonAction(exitConfirm, 100, 111111111111);
    } else {
        removeConfirm();
    }
    

    /* $scope.getStarted = function() {
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
             }
        $state.go('userTabs');
    }*/

}).controller('loginCtrl', function(loginCrd, $scope, $state, ApiCallService, $location, $rootScope, $http, $ionicPopup, $ionicPlatform, $ionicLoading, $timeout) {

    $scope.loginObj = {};
    $rootScope.loginUser = "";
    $rootScope.admin = false;

    $scope.enquiry = function() {
        $state.go('publicEnquiry');
    }
     $scope.$on("$ionicView.beforeEnter", function() {
         console.log('Hi am in before Enter Login')
       loginCred =JSON.parse(loginCrd.getLoinCredentials())
    if (loginCred != undefined || loginCred != null) {
         
        if (loginCred.username != undefined && loginCred.password != undefined) {
          $rootScope.calenderView=true;
           var promise = ApiCallService.GetRequest(loginCred, '/Login')
            promise.then(function(res) {
                console.log(res)
                if (res.data.UserId == 1) {
                    $rootScope.admin = true;
                     loginCrd.setCurrentUserIdUsername(res.data);
                    $location.path('/openTicket')
                } else if (res.data.UserId > 1) {
                   loginCrd.setCurrentUserIdUsername(res.data);
                    console.log('internale user')
                    $location.path('/openTicket')
                } else {
                    $rootScope.ShowToast('Incorrect Login or passwrd')
                    console.log('failed Login')
                }
            }, function(err) {
                $rootScope.ShowToast('failed to Login')
                console.log(err)
            })

        }
    }
     })
     
   

    $scope.publicLogin = function() {
        $state.go('publicLogin');
    }
    //loginCrd.removeCredentials();
    $scope.login = function() {

      $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

   $timeout(function () {
    $ionicLoading.hide();
  }, 2000);
  

        if (!$scope.loginObj.username) {
            console.log('email id is required');
            return;
        }
        if (!$scope.loginObj.password) {
            console.log('password is required');
            return;
        }

        
       
        $rootScope.loginUser = $scope.loginObj.username;
        var promise = ApiCallService.GetRequest($scope.loginObj, '/Login')
        promise.then(function(res) {
            console.log(res)
            if (res.data.UserId == 1) {
                loginCrd.setLoginCredentials($scope.loginObj);
                loginCrd.setCurrentUserIdUsername(res.data);
                $rootScope.admin = true
                console.log('admin')
                $rootScope.calenderView=true;
                $scope.loginObj={}
                $location.path('/openTicket')
                
            } else if (res.data.UserId > 1) {
                 console.log($scope.loginObj);
                $rootScope.calenderView=true;
                loginCrd.setLoginCredentials($scope.loginObj);
                loginCrd.setCurrentUserIdUsername(res.data);
                $scope.loginObj={}
                $location.path('/openTicket')
                console.log('internale user')
            } else {
                $rootScope.ShowToast('failed to Login')
                console.log('failed')
            }
        }, function(err) {
           if (window.Connection) {

            if (navigator.connection.type == Connection.NONE) {

                $ionicPopup.confirm({
                    title: 'No Internet Connection',
                    content: 'Please reconnect and try again.'
                }).then(function(result) {
                    if (!result) {

                       ionic.Platform.exitApp();
                    }
                });
            }
        }

        })

    

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


        /* var req = {
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
        /*  $http(req).then(function(res) {
                  console.log(res);
                  if (res.data.UserId == 0) {
                      alert('invalid username and password');
                      console.log('invalid user name or password')
                  } else {
                      $location.path('/internalTabs')
                  }
              }, function(res) {
                  console.log(res);
              })*/

    }
    $scope.signIn = function() {
        $state.go('login');
    }
    $scope.goBack = function() {

        $location.path('/sidemenu');
    }
    /* $http.get("http://210.48.150.218/TSRAPI/APIService.svc/GetAllUsers").then(function(response) {
                console.log(response);
                //$scope.aggent = response.data;
            })*/
}).controller('signUpCtrl', function($scope, $state) {

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
    $scope.goBack = function() {
        window.history.back();
    }

}).controller('publicFacility', function($filter, loginCrd, $rootScope, $scope, $state, $ionicModal, ApiCallService, ionicTimePicker, $ionicPopup) {

    $scope.publicMsg = {};
    $scope.imgDes = false;
    $scope.publicMsgList = [];
    $scope.facility = '';
    $scope.senderMsg = "";
    $scope.enquiryObj = {};
    $scope.events = [];
    $scope.neWMeassage = false;
    var phnoNum = {};
    var loginObj = {};
    $scope.Assignee = "";

      var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
    // $scope.enquiryObj.FromTime=''+ selectedTime.getUTCHours()+':'+ selectedTime.getUTCMinutes();
     var suffix = (selectedTime.getUTCHours() >= 12) ? "PM":"AM"; 
         hours = (selectedTime.getUTCHours() > 12)? selectedTime.getUTCHours() -12 : selectedTime.getUTCHours();
            hours = (hours == '00')? 12 : hours;
             $scope.enquiryObj.FromTime=''+ hours+':'+ selectedTime.getUTCMinutes() + ' ' + suffix;
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 30,           //Optional
    setLabel: 'Set'    //Optional
  };
  
     var ipObj2 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
   //   $scope.enquiryObj.ToTime=''+ selectedTime.getUTCHours()+':'+ selectedTime.getUTCMinutes();
      var suffix = (selectedTime.getUTCHours() >= 12) ? "PM":"AM"; 
         hours = (selectedTime.getUTCHours() > 12)? selectedTime.getUTCHours() -12 : selectedTime.getUTCHours();
            hours = (hours == '00')? 12 : hours;
             $scope.enquiryObj.ToTime=''+ hours+':'+ selectedTime.getUTCMinutes() + ' ' + suffix;


     // $scope.enquiryObj.ToTime = ((selectedTime.getUTCHours + 11) % 12 + 1) + selectedTime.getUTCMinutes() + '' + suffix;
      console.log($scope.enquiryObj.FromTime);
      }
       
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 30,           //Optional
    setLabel: 'Set'    //Optional
  };  

    $scope.StartTimePicker = function(){
// console.log(''+ipObj1.selectedTime.getUTCHours()+ipObj1.selectedTime.getUTCMinutes());
        ionicTimePicker.openTimePicker(ipObj1);
       

    }

 $scope.EndTimePicker = function(){
     ionicTimePicker.openTimePicker(ipObj2);
    // $scope.enquiryObj.FromTime= ipObj2.SelectedTime;

    }

    $scope.$on("$ionicView.beforeEnter", function() {
        $scope.publicMesges = [];
        getAllMessages();
      
       /* $scope.$watch('MessagesList', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.neWMeassage = true;
            } else {
                $scope.neWMeassage = false;
            }
        });*/

        
    })
     console.log('Hi am in Public View')
        loginCred =JSON.parse(loginCrd.getLoinCredentials());
        console.log(loginCred)
       if(loginCred!=undefined||loginCred!=null){
           $rootScope.calenderView=true;
        }
       
$scope.loginView=function(){
         loginCred =JSON.parse(loginCrd.getLoinCredentials());
         if(loginCred!=undefined||loginCred!=null){
           $state.go('openTicket');
        }else{
            $rootScope.loginFlag=true;
           $state.go('login');
        }
        }
    $scope.publicSignOut = function() {

        loginCrd.removeCredentials()
        $state.go('mainHome')
    }
    var promise = ApiCallService.GetRequest({}, '/GetAllEvents');
    promise.then(function(res) {
        console.log(res.data)
        $scope.events = res.data;
    }, function(err) {
        console.log('error')
        if (window.Connection) {

            if (navigator.connection.type == Connection.NONE) {

                $ionicPopup.confirm({
                    title: 'No Internet Connection',
                    content: 'Please reconnect and try again.'
                }).then(function(result) {
                    if (!result) {

                       ionic.Platform.exitApp();
                    }
                });
            }
        }
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
       // if ($scope.enquiryObj.LastName == undefined || $scope.enquiryObj.LastName == "") {
       //     $rootScope.ShowToast('Enter Last Name')
       //     console.log('Enter Last Name')
       //     return false;
       // }
       $scope.enquiryObj.LastName ='';
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
        $scope.enquiryObj.NoOfPersons = parseInt($scope.enquiryObj.NoOfPersons);

        $scope.enquiryObj.EventDate = $filter('date')($scope.enquiryObj.EventDate, 'dd/MM/yyyy');

   if ($scope.enquiryObj.FromTime == undefined || $scope.enquiryObj.EventDate == "") {
            $rootScope.ShowToast('Enter Start Time')
            return false;
        }

   if ($scope.enquiryObj.ToTime == undefined || $scope.enquiryObj.EventDate == "") {
            $rootScope.ShowToast('Enter End Time')
            return false;
        }
        console.log($scope.enquiryObj);
        var promise = ApiCallService.PostRequest($scope.enquiryObj, '/CreateEnquiry');

        //var promise = ApiCallService.PostRequest(enquiryObj, 'http://210.48.150.218/TSRAPI/APIService.svc/CreateEnquiry');

        promise.then(function(res) {
            if (res.data == true) {
                $rootScope.ShowToast('Enquiry Form Added Successfully')
                phnoNum.PhoneNumber = $scope.enquiryObj.ContactNo
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

    $scope.MessagesList = [];
    var getAllMessages = function() {
        loginObj = JSON.parse(loginCrd.getPhoneNumber());
        console.log(loginObj)
        var promise = ApiCallService.GetRequest(loginObj, '/GetEnquirybyPhoneNo');
        promise.then(function(res) {
            console.log(res.data[0])
            if (res.data[0] == undefined || res.data[0] == null) {
            } else {
                console.log(res.data[0])
                $scope.Assignee = res.data[0].FirstName + " " + res.data[0].LastName;
                var promise = ApiCallService.GetRequest({
                    TicketNo: res.data[0].TicketNo
                }, '/GetEnquiryReplybyTicket');
                promise.then(function(res) {
                    $scope.MessagesList = res.data;
                    console.log($scope.MessagesList)
                }, function(err) {})

            }
        }, function(err) {
            console.log(err);
        })
    }

    $scope.publicMesges = [];
    var date = new Date();
    $scope.sendPublicMsg = function() {
        console.log($scope.senderMsg)
        if ($scope.senderMsg == undefined || $scope.senderMsg == "") {
            $rootScope.ShowToast('Enter Message');
            return false
        }
        loginObj = JSON.parse(loginCrd.getPhoneNumber());
        console.log(loginObj)

        if (loginObj == null || loginObj == undefined) {
            console.log('Enter Enquiry Form');
            $rootScope.ShowToast('Enter Enquiry Form');
            return false;
        } else if (loginObj.PhoneNo == null || loginObj.PhoneNo == undefined) {
            console.log('Enter Enquiry Form');
            $rootScope.ShowToast('Enter Enquiry Form');
            return false;
        }

        var promise = ApiCallService.GetRequest(loginObj, '/GetEnquirybyPhoneNo');
        promise.then(function(res) {
            console.log(res.data[0]);
            $scope.publicMsg = {
                EnquiryId: res.data[0].EnquiryId,
                Message: $scope.senderMsg,
                ReplyFrom: 1,
                UserId: null
            }
            $scope.publicMesges.push({
                message: $scope.publicMsg.Message,
                date: new Date()
            });
            var promise = ApiCallService.PostRequest($scope.publicMsg, '/CreateEnquiryReply')
            promise.then(function(res) {
                console.log(res)
                if (res.data == true) {
                    $scope.senderMsg = "";
                }
            }, function(err) {
                console.log(err)
            })

        }, function(err) {
            console.log(err)
        })

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
        console.log('goBack')
        window.history.back();
        $scope.publicMsg = {};
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
}).controller('interCtrl', function($state,$timeout, $http, $ionicHistory, $ionicScrollDelegate, $location, myService, $scope, $rootScope, ApiCallService, loginCrd) {
    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];
    $scope.hideTime = true;
    $scope.incmessages = [];
    $scope.MessagesLst = [];
    $scope.Assignee = "";
    $scope.cusdetail = {};
    $scope.currentUserId;
    $scope.pushMessage = [];
    console.log($rootScope.loginUser);
    var alternate, isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    var date = new Date();
    $scope.$on("$ionicView.beforeEnter", function() {
        $scope.pushMessage = []
        console.log('Hai')
        console.log(date)
        $scope.MessagesLst = myService.get();
        //$scope.Assignee = myService.getAssigne();
        //console.log($scope.Assignee);
        var enquiryDetalis = myService.getEnquiry();
        $scope.cusdetail.EnquiryId = enquiryDetalis.EnquiryId;
        console.log($scope.cusdetail.EnquiryId);
        $scope.Assignee = enquiryDetalis.FirstName + " " + enquiryDetalis.LastName;
        console.log($scope.Assignee);
        var curUserDetails = JSON.parse(loginCrd.getCurrentUserIdUsername());
        $scope.currentUserId = curUserDetails.UserId;

        console.log($scope.currentUserId);
        var promise = ApiCallService.GetRequest({}, '/GetAllEnquiry').then(function(res) {
            $scope.openmesg = res.data;
            console.log(res.data);
            console.log($scope.openmesg);
        }, function(err) {
            console.log(err);
        });
    })

    /*$http.get("http://210.48.150.218/TSRAPI/APIService.svc/GetAllEnquiry").then(function(response) {
            console.log(response);
            $scope.openmesg = response.data;
            console.log(response.data);
        })*/
    /*  $http.get("http://210.48.150.218/TSRAPI/APIService.svc/GetEnquiryReplybyTicket?TicketNo=EQ10001").then(function(response) {
            console.log(response);
            $scope.EnqReply = response.data[0];
            console.log(response.data);
        })*/

    $http.get("http://58.26.82.11/tsrapi/APIService.svc/GetAllUsers").then(function(response) {
        console.log(response);
        $scope.aggent = response.data;
        console.log(response.data);
    })


    $scope.goBack=function(){
        $state.go('sideMenu')
    }
    $scope.msgList = function(x) {
        console.log(x);
        myService.set(x);
        $location.path('msgList');
    }

    $scope.internalUserMesg = function(userMsg) {
        myService.setEnquiry(userMsg);
        var promise = ApiCallService.GetRequest({
            TicketNo: userMsg.TicketNo
        }, '/GetEnquiryReplybyTicket')
        promise.then(function(res) {
            // myService.setAssigne(userMsg.Assignee)
            myService.set(res.data)
            console.log($scope.MessagesLst);
            $location.path('msgList');
        }, function(err) {
            console.log(err)
        })
    }

    $scope.sendMessage = function() {
        console.log('enter');

        $scope.pushMessObj = {
            EnquiryId: $scope.cusdetail.EnquiryId,
            Message: $scope.data.message,
            ReplyFrom: 2,
            UserId: 3
        }
        $scope.pushMessage.push({
            message: $scope.pushMessObj.Message,
            date: new Date()
        });
        var promise = ApiCallService.PostRequest($scope.pushMessObj, '/CreateEnquiryReply');
        promise.then(function(res) {
            if (res.data == true) {
                $scope.data.message = "";
            }
        }, function(err) {
            console.log(err);
        })

        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

        /*  $scope.MessagesLst.push({
                userId: 'me',
                text: $scope.data.message,
                time: d
            });
*/

        /* $timeout(function() {
                $scope.MessagesLst.push({
                    userId: 'you',
                    text: 'hi,hello...',
                    time: d
                });
            }, 2000)
            delete $scope.data.message;*/
        $ionicScrollDelegate.scrollBottom(true);

    }
    ;
    $scope.moveAssigner = function(y) {
        console.log(y);
        var assignObj = {
            EnquiryId: $scope.cusdetail.EnquiryId,
            AssigneeId: y.UserId
        }
        var promise = ApiCallService.PostRequest(assignObj, '/AssignEnquiry');
        promise.then(function(res) {
            console.log(res);
            if (res.data == true) {

                $rootScope.ShowToast('Assign sucessfuly');
                return false;

            }

        }),
        function(err) {
            console.log(err);
        }
        //$location.path('assign');
    }

    $scope.logout = function() {
        console.log('Hai')
        $rootScope.admin = false;
        loginCrd.removeCredentials();
        $rootScope.calenderView=false;
        window.history.back();
        $rootScope.loginFlag=false;

    }

    $scope.back = function() {
        window.history.back();
        $scope.pushMessObj = {};
    }

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

}).controller('slideImgage', function($scope, $ionicSlideBoxDelegate, $ionicModal) {
    $scope.modelImg = '';

    $scope.next = function() {
        console.log('Hello')
        $ionicSlideBoxDelegate.next();
    }
    ;
    $scope.previous = function() {
        console.log('Hai')
        $ionicSlideBoxDelegate.previous();
    }
    ;
    $ionicModal.fromTemplateUrl('templates/staticImageModel.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;

    });
    $scope.srcImg = ''
    var slideImageDisplay = function(name, index) {
        console.log('Hai')
        $scope.imageArray = [];
        if (name == 'droyale') {
            $scope.imageArray = ['img/IRDKL_Banquet (25).jpg', 'img/IRDKL_Chair W Cover (37).jpg', 'img/IRDKL_ExtrasConference (2).jpg', 'img/Pre Conference Hall Level 17 (2).jpg', 'img/IRDKL_Banquet (37)a.jpg', 'img/IRDKL_Chair W Cover (28).jpg']

            $scope.srcImg = $scope.imageArray[index];
            console.log($scope.srcImg)
        } else if (name == 'legrand') {
            $scope.imageArray = ['img/IRDKL_PreConference (11).jpg', 'img/IRDKL_PreConference (10).jpg', 'img/IRDKL_PreConference (9).jpg', 'img/IRDKL_Conference Room (1).jpg', 'img/IRDKL_Conference Room (1).jpg', 'img/DSC_2312.jpg','img/IRDKl_ToiletEntrance (2).jpg']

            $scope.srcImg = $scope.imageArray[index];
            console.log($scope.srcImg)
        } else if (name == 'prefunction') {
            $scope.imageArray = ['img/Pre Conference Hall Level 17 (1).jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/2.jpg']
            $scope.srcImg = $scope.imageArray[index];
            console.log($scope.srcImg)
        } else if (name == 'catering') {
            $scope.imageArray = ['img/cat1.jpg', 'img/cat3.jpg', 'img/cat4.jpg', 'img/cat5.jpg', 'img/cat6.jpg', 'img/cat3.jpg']

            $scope.srcImg = $scope.imageArray[index];
            console.log($scope.srcImg)
        }
    }
    $scope.openModal = function(name, index) {
        console.log('Hai')
        slideImageDisplay(name, index)
        $scope.modal.show();
    }
    ;
    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.srcImg = '';
        $scope.imageArray = []
    }
    ;
    $scope.goBack = function() {
        window.history.back();
    }

}).controller('goBackCtrl', function($scope, $location) {

    $scope.goBack = function() {
        window.history.back();
    }

})
.controller('CalendarCtrl', function ($rootScope,$scope,ApiCallService,$state,myService,$ionicModal) {
$scope.hallEvents=[];

$scope.onezoneDatepicker = {
    date: new Date(), // MANDATORY                    
    mondayFirst: false,             
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    showDatepicker: true,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: [],
   callback: function(value){
      
    }
};


 $scope.$on("$ionicView.beforeEnter", function() {
     console.log('I am before')
 $rootScope.getEventList(myService.getEvent(),new Date().getMonth()+1)  
 })

 var promise = ApiCallService.GetRequest({}, '/GetALLHalls');
    promise.then(function(res) {
      
    $scope.hallEvents= res.data;
     console.log($scope.hallEvents)
    }, function() {
        console.log('error')
    })
var eventDetailsObj={};

$rootScope.getEventList=function (eventList,month) {
  var eventArr=[];
  eventDetailsObj={};
  eventList.Month = month;
 var promise = ApiCallService.GetRequest(eventList, '/SelectAllBookingbyHallMonth');
    promise.then(function(res) {
     //eventDetailsArr=res.data;// $scope.onezoneDatepicker.highlights=[]
    console.log(res);
        for (var i = 0; i < res.data.length; i++) {
            console.log(res.data[i].EventDate);
            console.log(res.data[i]);
            if(eventDetailsObj[res.data[i].EventDate]!=undefined){
                eventArr.push(eventDetailsObj[res.data[i].EventDate]);
                eventArr.push({data:res.data[i]});
               
               eventDetailsObj[res.data[i].EventDate]=eventArr;
            }else{
            eventDetailsObj[res.data[i].EventDate]={data:res.data[i]};
           }
           var d=new Date(parseInt(res.data[i].EventDate.slice(6)),parseInt( res.data[i].EventDate.slice(3, 5))-1, parseInt(res.data[i].EventDate.slice(0, 2)))
            console.log(d);
            $scope.onezoneDatepicker.date=d;
            $scope.onezoneDatepicker.highlights.push({
                date: d,
             
            });
          
        }
        console.log(eventDetailsObj['23/11/2017']);

    })
}
var selectEventDetils=[];

$rootScope.eventDiscription=(selecteDte)=>{
    console.log(selecteDte);
    console.log(eventDetailsObj[selecteDte]);
     var evntDetails=eventDetailsObj[selecteDte];
    if(evntDetails==undefined){
       $scope.NoRecord=true; 
       $scope.value="No Records Found";
    }else if(angular.isArray(evntDetails)){
       $scope.evntArrDetails=true;
         $scope.value=eventDetailsObj[selecteDte];
    }else{
      $scope.evntObjDetails=true; 
     $scope.value=eventDetailsObj[selecteDte];
    }

   $scope.openModal();
}
$ionicModal.fromTemplateUrl('templates/eventDetails.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
      $scope.NoRecord=false;
      $scope.evntArrDetails=false;
      $scope.evntObjDetails=false;
    $scope.modal.hide();
  };



$scope.event=function(eventId){
var events={};
events.HallId=eventId;
//events.Month=new Date().getMonth();
console.log(events);
myService.setEvent(events)
 $state.go('calendarEvent');
}

$scope.back = function() {
 window.history.back();
 }

/*var mesos = [
    'January',
    'February',
    'Marçh',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

var dies = [
    'Diumenge',
    'Dilluns',
    'Dimarts',
    'Dimecres',
    'Dijous',
    'Divendres',
    'Dissabte'
];

var dies_abr = [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat'
];

Number.prototype.pad = function(num) {
    var str = '';
    for(var i = 0; i < (num-this.toString().length); i++)
        str += '0';
    return str += this.toString();
}*/
/*function calendari(widget, data)
{
   console.log(data.getMonth());
    var original = widget.getElementsByClassName('actiu')[0];

    if(typeof original === 'undefined')
    {
        original = document.createElement('table');
        original.setAttribute('data-actual',
			      data.getFullYear() + '/' +
			      data.getMonth().pad(2) + '/' +
			      data.getDate().pad(2))
        widget.appendChild(original);
    }

    var diff = data - new Date(original.getAttribute('data-actual'));

    diff = new Date(diff).getMonth();

    var e = document.createElement('table');

    e.className = diff  === 0 ? 'amagat-esquerra' : 'amagat-dreta';
    e.innerHTML = '';

    widget.appendChild(e);

    e.setAttribute('data-actual',
                   data.getFullYear() + '/' +
                   data.getMonth().pad(2) + '/' +
                   data.getDate().pad(2))
     $scope.currentMonth=data.getMonth();
    var fila = document.createElement('tr');
    var titol = document.createElement('th');
    titol.setAttribute('colspan', 7);

    var boto_prev = document.createElement('button');
    boto_prev.className = 'boto-prev';
    boto_prev.innerHTML = '&#9666;';

    var boto_next = document.createElement('button');
    boto_next.className = 'boto-next';
    boto_next.innerHTML = '&#9656;';

    titol.appendChild(boto_prev);
    titol.appendChild(document.createElement('span')).innerHTML = 
        mesos[data.getMonth()] + '<span class="any">' + data.getFullYear() + '</span>';

    titol.appendChild(boto_next);

    boto_prev.onclick = function() {
        data.setMonth(data.getMonth() - 1);
        calendari(widget, data);
    };

    boto_next.onclick = function() {
        data.setMonth(data.getMonth() + 1);
        calendari(widget, data);
    };

    fila.appendChild(titol);
    e.appendChild(fila);

    fila = document.createElement('tr');

    for(var i = 1; i < 7; i++)
    {
        fila.innerHTML += '<th>' + dies_abr[i] + '</th>';
    }

    fila.innerHTML += '<th>' + dies_abr[0] + '</th>';
    e.appendChild(fila);

    /* Obtinc el dia que va acabar el mes anterior 
    var inici_mes =
        new Date(data.getFullYear(), data.getMonth(), -1).getDay();
      console.log(inici_mes);
    var actual = new Date(data.getFullYear(),
			  data.getMonth(),
			  -inici_mes);
       
    /* 6 setmanes per cobrir totes les posiblitats
     *  Quedaria mes consistent alhora de mostrar molts mesos 
     *  en una quadricula 
    for(var s = 0; s < 6; s++)
    {
        var fila = document.createElement('tr');

        for(var d = 1; d < 8; d++)
        {
	    var cela = document.createElement('td');
	    var span = document.createElement('span');

	    cela.appendChild(span);

            span.innerHTML = actual.getDate();
            
            if(actual.getMonth() !== data.getMonth())
                cela.className = 'fora';

            /* Si es avui el decorem 
            if(data.getDate() == actual.getDate() &&
	       data.getMonth() == actual.getMonth())
		cela.className = 'avui';
		if($scope.dat!=undefined){
		console.log($scope.dat.length)
		for(var i=0;i<$scope.dat.length;i++){
		    console.log($scope.dat[i])
     if(actual.getDate()==$scope.dat[i]){
        cela.className = 'avui'; 
     }}}
	    actual.setDate(actual.getDate()+1);
            fila.appendChild(cela);
        }

        e.appendChild(fila);
    }

    setTimeout(function() {
        e.className = 'actiu';
        original.className +=
        diff === 0 ? ' amagat-dreta' : ' amagat-esquerra';
    }, 20);

    original.className = 'inactiu';

    setTimeout(function() {
        var inactius = document.getElementsByClassName('inactiu');
        for(var i = 0; i < inactius.length; i++)
            widget.removeChild(inactius[i]);
    }, 1000);

}

if(document.getElementById('calendari')!=null){
 calendari(document.getElementById('calendari'), new Date());
 }*/


})


.controller('hallnameCtrl', function ($scope, $http, $location) {

    $scope.back = function() {
        window.history.back();
        
    }

    $scope.calendarEvent = function(x) {
        console.log(x);
        
        $location.path('calendarEvent');
    }
 $http.get("http://58.26.82.11/tsrapi/APIService.svc/GetALLHalls").then(function(response) {
        console.log(response);
       $scope.hallName = response.data;
        console.log(response.data);
    })



 })

