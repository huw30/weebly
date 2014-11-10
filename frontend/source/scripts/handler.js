/*
  Handler creates elements, and add event listener to elements.
*/

var $ = require('jquery');
var views = require('./views');
var listeners = require('./listeners');

$('.element-item span:first-of-type').each(function() {
  listeners.draggable(this);
});
$('.divider').each(function() {
  listeners.droppable(this);
});
  

module.exports.createElement = function(type) {
  var divider = views.createDivider();
  listeners.droppable(divider);
  if (type === 'text') {
    var element = views.createTextElement();
    listeners.hoverIconDelete(element);
    listeners.clickIconDelete(element);
  } else if (type === 'image') {
    var element = views.createImageElement();
    listeners.hoverIconDelete(element);
    listeners.clickIconDelete(element);
  }
  var elementWrapper = {
    divider: divider,
    element: element
  };
  return elementWrapper;
}




