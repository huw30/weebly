/*
  Handler creates elements, add event listener to elements, insert to DOM and send Ajax calls(model)
*/

var $ = require('jquery');
var listeners = require('./listeners');
var createDOM = require('./DOMElements');

module.exports.init = function() {
  $('.element-item span:first-of-type').each(function() {
    listeners.draggable(this);
  });
  $('.divider').each(function() {
    listeners.droppable(this);
  });
  listeners.dropPageContent($('.page-content')[0]);
  listeners.clickIconAdd($('.add-page'));
};
  

module.exports.createElement = function(type) {
  var divider = createDOM.divider();
  listeners.droppable(divider);
  if (type === 'text') {
    var element = createDOM.textElement();
    listeners.hoverIconDelete(element);
    listeners.clickIconDelete(element);
  } else if (type === 'image') {
    var element = createDOM.imageElement();
    listeners.hoverIconDelete(element);
    listeners.clickIconDelete(element);
  }
  var elementWrapper = {
    divider: divider,
    element: element
  };
  return elementWrapper;
};


module.exports.addPage = function(name) {

}



