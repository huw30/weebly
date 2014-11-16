var dragdrop = require('../components/dragdrop');
var Element = require('../models/element');
var view = require('../views/view');

var elementHandlers = {
  changeContent: function(target, id) {
    target.blur(function() {
      var content = $(this).html();
      //send request to change content
      Element.edit(id, JSON.stringify({content: content}));
    });
  },
  dragElement: function(target) {
    target.addEventListener('dragstart', dragdrop.elementDragStart, false);
    target.addEventListener('dragend', dragdrop.elementDragEnd, false);
  },
  deleteElement: function(target, id) {
    target.click(function() {
      //send request to delete
      var self = this;
      Element.deleteElement(id).then(function() {
        $(self).parents('.element-divider-wrapper').detach();
        view.rearrange();
      });
    });
  },
  deleteElementHover: function(target) {
    target.mouseover(function() {
      $(this).parent().css('border-color', '#FE6A6D');
      $(this).siblings('.icon-resize').hide();
      $(this).siblings('.icon-resize-rotate').hide();
    }).mouseleave(function() {
      $(this).parent().css('border-color', '#87C5FF');
      $(this).siblings('.icon-resize').show();
      $(this).siblings('.icon-resize-rotate').show();
    });
  },
  dropElement: function(target) {
    target.addEventListener('dragover' , dragdrop.dragOver, false);
    target.addEventListener('dragleave', dragdrop.dragLeave, false);
    target.addEventListener('drop', dragdrop.drop, false);
  }
};

module.exports = elementHandlers;