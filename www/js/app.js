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
      alert(notification.text);
    },
    "onRegister": function(data) {
      console.log(data.token);
      self.dataToken = data.token;
    }
  });

  $ionicPush.register();

  self.postNotification = function(message) {
    var privateKey = SECRET_KEY;
    var tokens = [self.dataToken];
    var appId = "8162197d";

    // Encode your key
    var auth = btoa(privateKey + ':');

    // Build the request object
    var req = {
      method: 'POST',
      url: 'https://push.ionic.io/api/v1/push',
      headers: {
        'Content-Type': 'application/json',
        'X-Ionic-Application-Id': appId,
        'Authorization': 'basic ' + auth
      },
      data: {
        "tokens": tokens,
        "notification": {
          "alert": message
        }
      }
    };

    // Make the API call
    $http(req).success(function(resp){
      // Handle success
      console.log("Ionic Push: Push success!");
    }).error(function(error){
      // Handle error
      console.log("Ionic Push: Push error...");
    });
  };

  self.calculateDelay = function(time) {
    currentTime = new Date
    currentYear = currentTime.getFullYear();
    currentMonth = currentTime.getMonth();
    currentDate = currentTime.getDate();
    time.setFullYear(currentYear);
    time.setMonth(currentMonth);
    time.setDate(currentDate);
    return (time.getTime() - currentTime.getTime());
  };

  self.sendNotification = function(message, time) {
    var delay = self.calculateDelay(time)
    setTimeout(self.postNotification,delay);
  };
});
