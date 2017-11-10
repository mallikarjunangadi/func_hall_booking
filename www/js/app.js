// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('hallBooking', ['ionic', 'onezone-datepicker','hallBooking.controller', 'hallBooking.globalcontroller', 'hallBooking.service', 'ngCordova', 'hallBooking.directiv']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}).run(function($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function() {
        console.log('error')
        // Check for network connection
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

    });
})
 
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider /*.state('mainHome', {
        url: '/mainHome',
        templateUrl: 'templates/mainHome.html'


    })*/
    .state('view', {
        url: '/view',
        templateUrl: 'templates/view.html'

    }).state('msgList', {
        url: '/msgList',
        templateUrl: 'templates/msgList.html'
    })/*.state('assign', {
        url: '/assign',
        templateUrl: 'templates/assign.html'
    })*/
    .state('signUp', {
        url: '/signUp',
        templateUrl: 'templates/signUp.html'
    }).state('openTicket', {
        url: '/openTicket',

        templateUrl: 'templates/openTicket.html'

    }).state('customerDetails', {
        url: '/customerDetails',
        controller: 'publicFacility',
        templateUrl: 'templates/customerDetails.html'
    }).state('forgotPwdOtp', {
        url: '/forgotPwdOtp',
        templateUrl: 'templates/forgotPwdOtp.html'
    }).state('changePassword', {
        url: '/changePassword',
        templateUrl: 'templates/changePassword.html'
    }).state('publicfacility', {
        url: '/publicfacility',
        templateUrl: 'templates/publicfacility.html'
    }).state('userTabs', {
        url: '/userTabs',

        templateUrl: 'templates/userTabs.html'

    })/*.state('userTabs.enquiry', {
        url: '/enquiry',
        views:{
             'userTabs-enquiry': {
         templateUrl:  'templates/enquiry.html',
         controller: 'publicFacility'
             }
        }
    })
    .state('userTabs.loginInternalUser', {
        url: '/loginInternalUser',
        views:{
             'userTabs-loginInternalUser': {
         templateUrl:  'templates/login.html',
         controller: 'publicFacility'
             }
        }
    })*/
    .state('publicView', {
        url: '/publicView',

        templateUrl: 'templates/publicView.html'

    })/*.state('internalTabs', {
        url: '/internalTabs',
        templateUrl: 'templates/internalTabs.html'
    }).state('internalTabs.openTicket', {
        url: '/openTicket',
        views: {
            'tab-openTicket': {
                templateUrl: 'templates/openTicket.html'
            }
        }
    }).state('internalTabs.tab2', { 
        url: '/tab2',
        views: {
            'tab-tab2': {
                templateUrl: 'templates/tab2.html'
            }
        }

    }).state('internalTabs.tab3', {
        url: '/tab3',
        views: {
            'tab-tab3': {
                templateUrl: 'templates/tab3.html'
            }
        }

    }).state('internalTabs.tab4', {
        url: '/tab4',
        views: {
            'tab-tab4': {
                templateUrl: 'templates/tab4.html'
            }
        }

    })
    .state('internalTabs.tab5', {
        url: '/tab5',
        views: {
            'tab-tab5': {
                templateUrl: 'templates/tab5.html'
            }
        }
    })*/
    .state('catalogueFacility', {
        url: '/catalogueFacility',
        templateUrl: 'templates/catalogueFacility.html'
    }).state('entry', {
        url: '/entry',
        templateUrl: 'templates/Entry.html'
    }).state('publicLogin', {
        url: '/publicEnquiry',
        templateUrl: 'templates/publicLogin.html'
    }).state('publicEnquiry', {
        url: '/publicEnquiry',
        templateUrl: 'templates/publicEnquiry.html'
    }).state('hall', {
        url: '/hall',

        templateUrl: 'templates/hall.html'

    }).state('buisness', {
        url: '/business',

        templateUrl: 'templates/business.html'

    }).state('pleasure', {
        url: '/pleasure',

        templateUrl: 'templates/pleasure.html'

    }).state('amenities', {
        url: '/amenities',

        templateUrl: 'templates/amenities.html'

    }).state('sideMenu', {
        url: '/sideMenu',
        templateUrl: 'templates/sidemenu.html'
    }).state('contact', {
        url: '/contact',

        templateUrl: 'templates/contact.html'

    }).state('promos', {
        url: '/promos',

        templateUrl: 'templates/promos.html'

    }).state('gallery', {
        url: '/gallery',

        templateUrl: 'templates/gallery.html'

    }).state('enquiry', {
        url: '/enquiry',

        templateUrl: 'templates/enquiry.html'

    }).state('mainHome', {
        url: '/home',

        templateUrl: 'templates/sidemenu.html'

    }).state('login', {
        url: '/login',

        templateUrl: 'templates/login.html'

    })

    .state('eventList', {
        url: '/eventList',
        templateUrl: 'templates/eventList.html'
    })
    .state('calendar', {
        url: '/calendar',
templateUrl: 'templates/calendar.html'
    })
    .state('calendarEvent', {
        url: '/calendarEvent',


        templateUrl: 'templates/calendarEvent.html'

    })
     .state('funcHallname', {
        url: '/funcHallname',

        templateUrl: 'templates/funcHallname.html'

    })
    $urlRouterProvider.otherwise('/sideMenu');

})
