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

   function getPollWidth() {
      return $('#poll').width();
   }

   // prevent green bar from overlapping on red bar
   $scope.getGreenWidth = function(item) {
      return Math.min(baseGreenWidth(item), getPollWidth() - baseRedWidth(item));
   }

   function baseGreenWidth(item) {
      return (item.yes() / model.nPeople) * getPollWidth() + item.delta_yes;
   }

   // prevent red bar from overlapping on green bar
   $scope.getRedWidth = function(item) {
      return Math.min(baseRedWidth(item), getPollWidth() - baseRedWidth(item));
   }

   function baseRedWidth(item) {
      return (item.no() / model.nPeople) * getPollWidth();
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
      console.log(item.name, event.direction, event.deltaX);

      // resize indicator bar to follow finger
      item.delta_yes = event.deltaX;

      // to keep bar color consistent, start with temp_vote = current vote
      if (item.temp_vote == null)
         item.temp_vote = item.vote;

      if (item.vote === 0) {
         if (event.deltaX > parameters.dragThreshold) {
            item.temp_vote = 1;
         } else {
            item.temp_vote = 0;
         }
      } else if (item.vote == 1) {
         if (event.deltaX < -parameters.dragThreshold)
            item.temp_vote = 0;
         else
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
      item.vote = item.temp_vote;
      item.temp_vote = null;

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
