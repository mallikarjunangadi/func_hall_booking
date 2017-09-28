angular.module('hallBooking.controller', [])
    .controller('mainHomeCtrl', function($scope, $state, loginCrd) {

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


    })
    .controller('loginCtrl', function(loginCrd, $scope, $state, ApiCallService, $location, $rootScope, $http) {

        $scope.loginObj = {};
        $rootScope.loginUser = "";
        $rootScope.admin = false;
        
        $scope.enquiry = function() {
            $state.go('publicEnquiry');
        }
        loginCred = JSON.parse(loginCrd.getLoinCredentials());
            console.log(loginCred);
            if (loginCred != undefined || loginCred != null) {

                if (loginCred.username != undefined && loginCred.password != undefined) {
                    var promise = ApiCallService.GetRequest(loginCred, '/Login')
                    promise.then(function(res) {
                        console.log(res)
                        if (res.data.UserId == 1) {
                            $rootScope.admin=true;
                            console.log('admin')
                            loginCrd.setCurrentUserId(res.data.UserId);
                            $location.path('/internalTabs')
                        } else if (res.data.UserId > 1) {
                            loginCrd.setCurrentUserId(res.data.UserId);
                            console.log('internale user')
                            $location.path('/internalTabs')
                        } else {
                            $rootScope.ShowToast('failed to Login')
                            console.log('failed Login')
                        }
                    }, function(err) {
                        $rootScope.ShowToast('failed to Login')
                        console.log(err)
                    })

                }
            }

        $scope.publicLogin = function() {
            $state.go('publicLogin');
        }
        //loginCrd.removeCredentials();
        $scope.login = function() {
             
                if (!$scope.loginObj.username) {
                    console.log('email id is required');
                    return;
                }
                if (!$scope.loginObj.password) {
                    console.log('password is required');
                    return;
                }

                loginCrd.setLoginCredentials($scope.loginObj);
                console.log($scope.loginObj);
                $rootScope.loginUser = $scope.loginObj.username;
                var promise = ApiCallService.GetRequest($scope.loginObj, '/Login')
                promise.then(function(res) {
                    console.log(res)
                    if (res.data.UserId == 1) {
                        loginCrd.setCurrentUserId(res.data.UserId);
                        $rootScope.admin=true
                        console.log('admin')
                         $location.path('/internalTabs')
                    } else if (res.data.UserId > 1) {
                        loginCrd.setCurrentUserId(res.data.UserId);
                         $location.path('/internalTabs/openTicket')
                        console.log('internale user')
                    } else {
                        $rootScope.ShowToast('failed to Login')
                        console.log('failed')
                    }
                }, function(err) {
                    $rootScope.ShowToast('failed to Login')
                    console.log(err)
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
        $scope.goBack = function() {
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
        var phnoNum = {};
        var loginObj = {};
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
        $scope.Assignee = {};
        $scope.MessagesList = [];
        var getAllMessages = function() {
            loginObj = JSON.parse(loginCrd.getPhoneNumber());
            console.log(loginObj)
            var promise = ApiCallService.GetRequest(loginObj, '/GetEnquirybyPhoneNo');
            promise.then(function(res) {
                console.log(res.data[0])
                if(res.data[0]==undefined||res.data[0]==null){
                     
                }else{
                   $scope.Assignee = res.data[0].Assignee;   
                }

                
                var promise = ApiCallService.GetRequest({
                    TicketNo: res.data[0].TicketNo
                }, '/GetEnquiryReplybyTicket');
                promise.then(function(res) {
                    $scope.MessagesList = res.data;
                    console.log($scope.MessagesList)
                }, function(err) {

                })

            }, function(err) {
                console.log(err);
            })
        }
        getAllMessages();
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
                var promise = ApiCallService.PostRequest($scope.publicMsg, '/CreateEnquiryReply')
                promise.then(function(res) {}, function(err) {
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
    })
    .controller('interCtrl', function($timeout, $http, $ionicHistory,$ionicScrollDelegate, $location, myService, $scope, $rootScope, ApiCallService, loginCrd) {
        $scope.data = {};
        $scope.myId = '12345';
        $scope.messages = [];
        $scope.hideTime = true;
        $scope.incmessages = [];
        $scope.MessagesLst=[];
        $scope.Assignee;
        $scope.cusdetail={};
          $scope.currentUserId;
          console.log($rootScope.loginUser);
        var alternate, isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
            
        $scope.$on("$ionicView.beforeEnter", function() {
            console.log('Hai')
            $scope.MessagesLst= myService.get();
           $scope.Assignee= myService.getAssigne();
            $scope.cusdetail.EnquiryId=myService.getEnquiry();
            $scope.currentUserId=JSON.parse(loginCrd.getCurrentUserId());
            console.log($scope.currentUserId);
            var promise=ApiCallService.GetRequest({},'/GetAllEnquiry').then(function(res){
                $scope.openmesg = res.data;
            console.log(res.data);
            console.log($scope.openmesg);
            },function(err){
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

        $http.get("http://210.48.150.218/TSRAPI/APIService.svc/GetAllUsers").then(function(response) {
            console.log(response);
            $scope.aggent = response.data;
            console.log(response.data);
        })

        $scope.msgList = function(x) {
            console.log(x);
            myService.set(x);
            $location.path('msgList');
        }
        
        $scope.internalUserMesg=function(userMsg){
         console.log(userMsg.EnquiryId); 
           myService.setEnquiry(userMsg.EnquiryId);
         var promise=ApiCallService.GetRequest({TicketNo:userMsg.TicketNo},'/GetEnquiryReplybyTicket')
         promise.then(function(res){
          myService.setAssigne(userMsg.Assignee)
          myService.set(res.data)
        console.log($scope.MessagesLst);
          $location.path('msgList');
         },function(err){
            console.log(err) 
         })
        }



        $scope.sendMessage = function() {
            console.log('enter');


            var pushMessObj = {
                EnquiryId: $scope.cusdetail.EnquiryId,
                Message: $scope.data.message,
                ReplyFrom: 2,
                UserId: 3
            }
            var promise = ApiCallService.PostRequest(pushMessObj, '/CreateEnquiryReply');
            promise.then(function(res) {
                console.log(res);
            }, function(err) {
                console.log(err);
            })


            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

            $scope.MessagesLst.push({
                ReplyFrom:2,
                Message: $scope.data.message,
                MessageDateTime: d

            });


            /*$timeout(function() {
                $scope.MessagesLst.push({
                    ReplyFrom:1,
                    text: 'hi,hello...',
                    time: d

                });
            },)*/

            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        };

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
            $rootScope.admin=false;
            loginCrd.removeCredentials();
             
	      $ionicHistory.clearCache();
	      $ionicHistory.clearHistory();
            $location.path('/userTabs');

        }

        $scope.back = function() {
        window.history.back();
        }




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


    })