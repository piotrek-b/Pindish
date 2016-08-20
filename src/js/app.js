// Module initialization
var app = angular.module('pindish', []);

app.directive('navigationBar', function() {
  return {
    restrict : 'A',
    templateUrl : 'navigation.xhtml'
  };
});
