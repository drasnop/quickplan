var app = angular.module('QuickPlan', ['angular-gestures']);

app.config(function(hammerDefaultOptsProvider) {
   hammerDefaultOptsProvider.set({
      'recognizers': [
         [Hammer.Pan, {
            direction: Hammer.DIRECTION_HORIZONTAL
         }]
      ]
   });
});

// a global object holding the current state
var model = {
   'nPeople': 10,
   'items': [],
   'dragEndTimeStamp': 0
}

// a global object holding static parameters
var parameters = {
   'itemHeight': 73,
   'dragThreshold': 75,
   'reDragDelay': 200
}

// input data
var items = [{
   'name': 'Le Pot de Fer',
   'other_yes': 2,
   'other_no': 2
}, {
   'name': 'La Tour d\'Argent',
   'other_yes': 5,
   'other_no': 1
}, {
   'name': 'L\' Amateur',
   'other_yes': 0,
   'other_no': 4
}, {
   'name': 'Les Deux Magots',
   'other_yes': 2,
   'other_no': 5
}]

// Item object
var Item = function(name, other_yes, other_no) {
   return {
      'name': name,
      'other_yes': other_yes,
      'other_no': other_no,
      'vote': 0,
      'temp_vote': null,
      'delta_yes': 0,
      'delta_no': 0,

      'yes': function() {
         return this.other_yes + (this.vote == 1 ? 1 : 0);
      },
      'no': function() {
         return this.other_no + (this.vote == -1 ? 1 : 0);
      },
      'score': function() {
         return this.yes() - this.no();
      },
      'id': function() {
         return model.items.indexOf(this);
      }
   };
}

// populate model.items with the input data
model.items = items.map(function(item) {
   return new Item(item.name, item.other_yes, item.other_no);
})

// sad workaround because of the way Angular handles reordering of a list
// find index of item is the array was sorted by decreasing score (= best at the top)
model.items.indexOfSorted = function(item) {
   var index = 0;
   for (var i = 0; i < this.length; ++i) {
      if ((this[i].score() > item.score()) ||
         (this[i].score() == item.score() && this[i].yes() > item.yes()) ||
         (this[i].score() == item.score() && this[i].yes() == item.yes() && this[i].name > item.name))
         index++;
   }
   return index;
}
