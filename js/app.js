var app = angular.module('QuickPlan', []);

// a global object holding the current state
var model = {
   'nPeople': 10,
   'items': []
}

// input data
var items = [{
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

// Item objects
var Item = function(name, yes, no) {
   return {
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
   return new Item(item.name, item.yes, item.no);
})
