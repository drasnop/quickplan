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
   'yes': 1,
   'no': 2
}, {
   'id': 1,
   'name': 'Les Deux Magots',
   'yes': 2,
   'no': 4
}, {
   'id': 2,
   'name': 'La Tour d\'Argent',
   'yes': 3,
   'no': 1
}]

// Item objects
var Item = function(id, name, yes, no) {
   return {
      'id': id,
      'name': name,
      'yes': yes,
      'no': no,
      'score': function() {
         return yes - no;
      }
   };
}

// populate model.items with the input data
model.items = items.map(function(item) {
   return new Item(item.id, item.name, item.yes, item.no);
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
