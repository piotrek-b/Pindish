// Module initialization
angular.module('pindish', ['ngDialog'])

.directive('navigationBar', function() {
  return {
    restrict : 'A',
    templateUrl : 'navigation.xhtml'
  };
})

.controller('dialogController', ['$scope', 'ngDialog', function ($scope, ngDialog) {
  $scope.clickToOpen = function() {
    ngDialog.open({ template: 'popupTml.xhtml', className: 'ngdialog-theme-default' });
  };
}]);
