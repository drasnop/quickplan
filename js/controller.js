// poll controller
app.controller('pollCtrl', ['$scope', function($scope) {
   $scope.model = window.model;
   $scope.sorted = false;

   $scope.getGreenWidth = function(item) {
      return (item.yes / model.nPeople) * 100 + "%";
   }

   $scope.getWhiteWidth = function(item) {
      return ((model.nPeople - item.no) / model.nPeople) * 100 + "%";
   }

   $scope.toggleSort = function() {
      $scope.sorted = !$scope.sorted;
      if ($scope.sorted)
         model.items = model.items.sort();

   }
}]);

// tinkering function: update angular view after manually changing parameters
function apply() {
   angular.element('#poll').scope().$apply();
}
