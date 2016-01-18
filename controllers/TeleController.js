twitchTele = angular.module("twitchTele", [])

twitchTele.controller('TeleController', ['$scope','$http',
function($scope, $http) {

  $scope.words = "Getting goin"

  $scope.makeAPICall = function() {

    //Returns 200 Response for freecodecamp
    // var url = 'https://api.twitch.tv/kraken/streams/freecodecamp?callback=JSON_CALLBACK';

    //Attempt to get all streams
    var url = 'https://api.twitch.tv/kraken/streams?callback=JSON_CALLBACK';

  console.log("URL = ", url);

  $http.jsonp(url).
      success(function(data, status) {
        $scope.data = data;
        $scope.headlines = data[1];
        $scope.descriptions = data[2];
        $scope.links = data[3];
        $scope.responseData = {};
        $scope.responseDataArray = [];
        console.log(" STATUS & DATA = ", status, $scope.data)

      }).
      error(function(data, status, headers, config) {
        console.log(status, data);
      })
    }


}]);
