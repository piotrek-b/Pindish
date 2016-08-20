// Module initialization
var app = angular.module('pindish', []);

app.directive('navigationBar', function() {
  return {
    restrict : 'E',
    templateUrl : 'navigation.xhtml'
  };
});
