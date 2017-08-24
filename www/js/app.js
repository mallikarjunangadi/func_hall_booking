// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('hallBooking', ['ionic', 'hallBooking.controller', 'hallBooking.service'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}) 

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('mainHome', {
        url: '/mainHome',
        templateUrl: 'templates/mainHome.html'

    })
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html'

    })
    .state('view', {
        url: '/view',
        templateUrl: 'templates/view.html'

    })

    .state('msgList', {
        url: '/msgList',
        templateUrl: 'templates/msgList.html'

    })

    .state('client', {
        url: '/client',
        templateUrl: 'templates/client.html'

    })

    .state('signUp', {
        url: '/signUp',
        templateUrl: 'templates/signUp.html' 
    })

    .state('openTicket', {
        url: '/openTicket',
        templateUrl: 'templates/openTicket.html' 
    })
     
    .state('userTabs', {
        url: '/userTabs',
        templateUrl: 'templates/userTabs.html' 
    })
    .state('customerDetails', {
        url: '/customerDetails',
        templateUrl: 'templates/customerDetails.html' 
    })
    .state('forgotPwdOtp', {
        url: '/forgotPwdOtp',
        templateUrl: 'templates/forgotPwdOtp.html' 
    })
     
    $urlRouterProvider.otherwise('/mainHome');
})
