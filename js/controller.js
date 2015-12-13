var app = angular.module('QuickPlan', []);

// a global object for storing parameters
var model = {
   'nPeople': 10,

   'items': [{
      'name': 'La Tour d\'Argent',
      'yes': 3,
      'no': 1
   }, {
      'name': 'Les Deux Magots',
      'yes': 2,
      'no': 4
   }, {
      'name': 'Le Pot de Fer',
      'yes': 1,
      'no': 2
   }]
}

app.controller('pollCtrl', ['$scope', function($scope) {
   $scope.model = window.model;

   $scope.getGreenWidth = function(item) {
      return (item.yes / model.nPeople) * 100 + "%";
   }

   $scope.getWhiteWidth = function(item) {
      return ((model.nPeople - item.no) / model.nPeople) * 100 + "%";
   }
}]);

// tinkering function: update angular view after manually changing parameters
function apply() {
   angular.element('#poll').scope().$apply();
}
