twitchTele = angular.module("twitchTele", [])

twitchTele.controller('TeleController', ['$scope','$http',
function($scope, $http) {

  $scope.channelStatus = "all"

  var usersToCheck = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

  //Returns all live channels
  // var url = 'https://api.twitch.tv/kraken/streams?stream_type= '+ $scope.channelStatus + 'all&callback=JSON_CALLBACK';

  var streamUrl = 'https://api.twitch.tv/kraken/streams?channel=freecodecamp,storbeck,terakilobyte,habathcx,RobotCaleb,thomasballinger,noobs2ninjas,beohoff?stream_type='+ $scope.channelStatus + '&callback=JSON_CALLBACK';

$scope.makeAPICall = function() {
  var userUrl = 'https://api.twitch.tv/kraken/users/';
  var callB = '?callback=JSON_CALLBACK'
  $scope.allUsers = [];

  for(var i = 0; i < usersToCheck.length; i++) {
      var userName = usersToCheck[i];
      console.log("URL = ", userUrl);
      $http.jsonp(userUrl + userName + callB).
          success(function(data, status) {
            $scope.data = data;
            var name = data.display_name;
            var bio = data.bio;
            var logo = data.logo;
            $scope.allUsers.push({name: name, bio: bio, logo: logo});
            console.log($scope.allUsers);

          }).
          error(function(data, status, headers, config) {
            console.log(status, data);
          })
  }



    }


}]);
