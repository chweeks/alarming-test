// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var alarming = angular.module('alarming', ['ionic', 'ionic.service.core', 'ionic.service.push'])

alarming.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

alarming.controller('notificationCtrl', function($http, $ionicPush) {

  var self = this;

  self.dataToken = '';

  $ionicPush.init({
    "debug": true,
    "onNotification": function(notification) {
      var payload = notification.payload;
      console.log(notification, payload);
    },
    "onRegister": function(data) {
      console.log(data.token);
      self.dataToken = data.token;
    }
  });

  $ionicPush.register();

  self.postNotification = function() {
    var postNotification = {
                              "tokens":[
                                self.dataToken
                              ],
                              "notification":{
                                "alert":"Hello World!",
                                "ios":{
                                  "badge":1,
                                  "sound":"ping.aiff",
                                  "expiry": 1423238641,
                                  "priority": 10,
                                  "contentAvailable": 1,
                                  "payload":{
                                    "key1":"value",
                                    "key2":"value"
                                  }
                                }
                              }
                            };
    $http.post('https://push.ionic.io/api/v1/push', postNotification, 'POST').then(function successCallback(response){
      var user_id = angular.fromJson(response).data;
      console.log(user_id)
   });
  };
});
