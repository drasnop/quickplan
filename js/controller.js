// poll controller
app.controller('pollCtrl', ['$scope', function($scope) {
   $scope.model = window.model;
   $scope.sorted = false;

   $scope.getTop = function(item) {
      if ($scope.sorted)
         return model.items.indexOfSorted(item) * 72 + 'px';
      else
         return model.items.indexOf(item) * 72 + 'px';
   }

   $scope.getPollHeight = function() {
      return (model.items.length + 1) * 72 + 'px';
   }

   $scope.getGreenWidth = function(item) {
      return (item.yes() / model.nPeople) * 100 + '%';
   }

   $scope.getRedWidth = function(item) {
      return (item.no() / model.nPeople) * 100 + '%';
   }

   $scope.toggleSort = function() {
      $scope.sorted = !$scope.sorted;
   }
}]);

// tinkering function: update angular view after manually changing parameters
function apply() {
   angular.element('#poll').scope().$apply();
}
