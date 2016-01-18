twitchTele = angular.module("twitchTele", [])

twitchTele.controller('TeleController', ['$scope','$http',
function($scope, $http) {
  $scope.allUsers = [];
  $scope.onlineUsers = [];
  $scope.offlineUsers = [];

  $scope.channelStatus = "all"

  var usersToCheck = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

  //Returns all live channels
  // var url = 'https://api.twitch.tv/kraken/streams?stream_type= '+ $scope.channelStatus + 'all&callback=JSON_CALLBACK';

var streamUrl = 'https://api.twitch.tv/kraken/streams?channel=freecodecamp,storbeck,terakilobyte,habathcx,RobotCaleb,thomasballinger,noobs2ninjas,beohoff?stream_type='+ $scope.channelStatus + '&callback=JSON_CALLBACK';

$scope.makeAPICall = function() {
  var userUrl = 'https://api.twitch.tv/kraken/users/';
  var callB = '?callback=JSON_CALLBACK'
  // $scope.allUsers = [];
  // $scope.onlineUsers = [];

//TODO This is pushing seven objects seven times. Should push one object 7 times. Needs a fixin.
  for(var i = 0; i < usersToCheck.length; i++) {
      var userName = usersToCheck[i];
      console.log("URL = ", userUrl);
      $http.jsonp(userUrl + userName + callB).
          success(function(data, status) {
            $scope.data = data;
            var name = data.display_name;
            var bio = data.bio;
            var logo = data.logo;
            var idNum = data._id;
            var online = false;
            $scope.allUsers.push({name: name, bio: bio, logo: logo, idNum: idNum, online: online});
            console.log($scope.allUsers);

          }).
          error(function(data, status, headers, config) {
            console.log(status, data);
          })
    }
//API Calls returns all users who are live streaming
      $http.jsonp(streamUrl).
          success(function(streamData) {
            $scope.streamData = streamData;
            //TODO This should check for all online users, and not just the first online user!
            $scope.identificationNum = streamData.streams[0].channel._id;
            $scope.status = streamData.streams[0].channel.status;
//Finds online users, sets their online status to true and gives them a status description--if it exists.
            for(var i = 0; i < $scope.allUsers.length; i++) {
                if($scope.identificationNum == $scope.allUsers[i].idNum) {
                  $scope.allUsers[i].online = true;
                  $scope.allUsers[i].status = $scope.status;
                  console.log("Gotcha! ", $scope.allUsers[i]);
                  $scope.onlineUsers.push($scope.allUsers[i]);
              }
              // console.log($scope.identificationNum);

            }

            console.log("onlineUsers = ", $scope.onlineUsers );

          }).
          error(function(data) {
            console.log(data);
          })

    }

    $scope.findOfflineUsers = function() {
      for(var i = 0; i < $scope.allUsers.length; i++) {
        if($scope.allUsers[i].online == false) {
          $scope.offlineUsers.push($scope.allUsers[i]);
        }
      }
      console.log("FROM OFFLINE USERS FUNCTION ", $scope.offlineUsers);
    }


}]);
