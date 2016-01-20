twitchTele = angular.module("twitchTele", [])

twitchTele.controller('TeleController', ['$scope','$http',
function($scope, $http) {
  $scope.allUsers = [{name: "We always be here!", bio: "We Good", logo: "http://s10.postimg.org/wm5zuj6nd/thumbnail.jpg", idNum: 513, online: true}];
  $scope.onlineUsers = [{name: "We always be here!", bio: "We Good", logo: "http://s10.postimg.org/wm5zuj6nd/thumbnail.jpg", idNum: 513, online: true}];
  $scope.offlineUsers = [];
  $scope.channelStatus = "all"
  $scope.results;

  var usersToCheck = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

//Returns all streaming channels from comma seperated channel names
  var streamUrl = 'https://api.twitch.tv/kraken/streams?channel=freecodecamp,storbeck,terakilobyte,habathcx,RobotCaleb,thomasballinger,noobs2ninjas,beohoff?stream_type=all&callback=JSON_CALLBACK';

$scope.makeAPICall = function() {
  var userUrl = 'https://api.twitch.tv/kraken/users/';
  var callB = '?callback=JSON_CALLBACK'

//TODO This is pushing seven objects seven times. Should push one object 7 times. Needs a fixin.
  for(var i = 0; i < usersToCheck.length; i++) {
      var userName = usersToCheck[i];
      $http.jsonp(userUrl + userName + callB).
        success(function(data, status) {
          $scope.data = data;
          var name = data.display_name;
          var bio = data.bio;
          var logo = data.logo;
          var idNum = data._id;
          var online = false;
          if(!logo) {
            logo = "http://s10.postimg.org/wm5zuj6nd/thumbnail.jpg";
          }
          if (!bio) {
            bio = "I've got nothing for ya, brother. But consider watching my channel anyway?"
          }
          $scope.allUsers.push({name: name, bio: bio, logo: logo, idNum: idNum, online: online});
          // console.log("ALLUSERS ARRAY Length= ", $scope.allUsers.length );
          $scope.results = $scope.allUsers;
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

            //Checks to see if there are any live users, and sets their identificationnum if so
            if(streamData.streams[0]) {
              $scope.identificationNum = streamData.streams[0].channel._id;
              $scope.status = streamData.streams[0].channel.status;
            }

            //Finds online users, sets their online status to true and gives them a status description--if it exists.
            for(var i = 0; i < $scope.allUsers.length; i++) {
              if($scope.identificationNum == $scope.allUsers[i].idNum) {
                $scope.allUsers[i].online = true;
                $scope.allUsers[i].status = $scope.status;
                console.log("Gotcha! ", $scope.allUsers[i]);
                $scope.onlineUsers.push($scope.allUsers[i]);
              }

            }

            console.log("onlineUsers = ", $scope.onlineUsers );

          }).
          error(function(data) {
            console.log(data);
          })

    }

    $scope.displayOfflineUsers = function() {
      for(var i = 0; i < $scope.allUsers.length; i++) {
        if($scope.allUsers[i].online == false) {
          $scope.offlineUsers.push($scope.allUsers[i]);
        }
      }
      $scope.results = $scope.offlineUsers;
    }

    $scope.displayOnlineUsers = function() {
      $scope.results = $scope.onlineUsers;
    }

    $scope.displayAllUsers = function() {
      $scope.results = $scope.allUsers;
    }



}]);
