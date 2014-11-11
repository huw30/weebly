//handles DOM append and add event exceptionHandlerProvider
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
  listeners.clickToggle($('.setting .icon-toggle-off'));
};

module.exports.insert = function(place, type) {
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
  $(divider).insertBefore($(place));
  $(element).insertBefore($(place));
};


