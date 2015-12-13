var app = angular.module('QuickPlan', []);

// a global object holding the current state
var model = {
   'nPeople': 10,
   'items': []
}

// input data
var items = [{
   'id': 0,
   'name': 'Le Pot de Fer',
   'other_yes': 1,
   'other_no': 2
}, {
   'id': 1,
   'name': 'Les Deux Magots',
   'other_yes': 2,
   'other_no': 4
}, {
   'id': 2,
   'name': 'La Tour d\'Argent',
   'other_yes': 3,
   'other_no': 1
}]

// Item objects
var Item = function(id, name, other_yes, other_no) {
   return {
      'id': id,
      'name': name,
      'other_yes': other_yes,
      'other_no': other_no,
      'vote': 0,

      'yes': function() {
         return this.other_yes + (this.vote == 1 ? 1 : 0);
      },
      'no': function() {
         return this.other_no + (this.vote == -1 ? 1 : 0);
      },
      'score': function() {
         return this.yes() - this.no();
      },
   };
}

// populate model.items with the input data
model.items = items.map(function(item) {
   return new Item(item.id, item.name, item.other_yes, item.other_no);
})

// sad workaround because of the way Angular handles reordering of a list
// find index of item is the array was sorted by decreasing score (= best at the top)
model.items.indexOfSorted = function(item) {
   var index = 0;
   for (var i = 0; i < this.length; ++i) {
      if (this[i].score() > item.score())
         index++;
   }
   return index;
}
