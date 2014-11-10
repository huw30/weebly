var handler = require('./handler');
// console.log(handler);
var helper = {
  insert: function(element, type) {
    var newElement = handler.createElement(type);
    $(newElement.divider).insertBefore($(element));
    $(newElement.element).insertBefore($(element));
  }
};

module.exports = helper;