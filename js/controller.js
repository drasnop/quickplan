// poll controller
app.controller('pollCtrl', ['$scope', function($scope) {
   $scope.model = window.model;
   $scope.sorted = false;

   $scope.getTop = function(item) {
      if ($scope.sorted)
         return model.items.indexOfSorted(item) * parameters.itemHeight - 1 + 'px';
      else
         return model.items.indexOf(item) * parameters.itemHeight - 1 + 'px';
   }

   $scope.getPollHeight = function() {
      return (model.items.length + 1) * parameters.itemHeight - 1 + 'px';
   }

   $scope.getGreenWidth = function(item) {
      return (item.yes() / model.nPeople) * $('#poll').width() + item.delta_yes;
   }

   $scope.getRedWidth = function(item) {
      return (item.no() / model.nPeople) * $('#poll').width();
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

   $scope.drag = function(event) {

      // workaround: sometimes a last drag event is fired just after the dragend event
      if (event.timeStamp - model.dragEndTimeStamp < parameters.reDragDelay)
         return;

      // retrieve target item
      var item = model.items[$(event.target).attr('data')];
      console.log(item.name, event.direction, event.deltaX, event);

      item.delta_yes = event.deltaX;

      if (event.deltaX > parameters.dragThreshold) {
         item.temp_vote = 1;
      }

      // no transition, allow the bar to jump to the finger's most recent position
      $(event.target).siblings('.bar.indicator.green').addClass('notransition');
   }

   $scope.dragend = function(event) {
      model.dragEndTimeStamp = event.timeStamp;

      // retrieve target item
      var item = model.items[$(event.target).attr('data')];
      console.log(item.name, "end", event.direction, event.deltaX, event);

      // convert a temporary vote into an actual one
      if (item.temp_vote !== 0)
         item.vote = item.temp_vote;

      // reset bars to their normal length
      item.delta_yes = 0;

      // allow smooth transition back to normal width
      $(event.target).siblings('.bar.indicator').removeClass('notransition');
   }


}]);

// tinkering function: update angular view after manually changing parameters
function apply() {
   angular.element('#poll').scope().$apply();
}
