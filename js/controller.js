// poll controller
app.controller('pollCtrl', ['$scope', function($scope) {
   $scope.model = window.model;
   $scope.sorted = false;

   $scope.getTop = function(item) {
      if ($scope.sorted)
         return model.items.indexOfSorted(item) * 73 - 1 + 'px';
      else
         return model.items.indexOf(item) * 73 - 1 + 'px';
   }

   $scope.getPollHeight = function() {
      return (model.items.length + 1) * 73 - 1 + 'px';
   }

   $scope.getGreenWidth = function(item) {
      return (item.yes() / model.nPeople) * 100 + '%';
   }

   $scope.getRedWidth = function(item) {
      return (item.no() / model.nPeople) * 100 + '%';
   }

   $scope.toggleSort = function() {
      $scope.sorted = !$scope.sorted;

      // hackish: manually add shadows on elements moving up
      model.items.forEach(function(item) {
         if ($scope.sorted) {
            if (model.items.indexOfSorted(item) < item.id())
               $('#' + item.id()).addClass('raised');
         } else {
            if (model.items.indexOfSorted(item) > item.id())
               $('#' + item.id()).addClass('raised');
         }
      });

      // remove shadows at the end of the animation
      setTimeout(function() {
         $('.item').removeClass('raised');
      }, 800)
   }

   $scope.upvote = function($event) {
      console.log($event);
   }
}]);

// tinkering function: update angular view after manually changing parameters
function apply() {
   angular.element('#poll').scope().$apply();
}
