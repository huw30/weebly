var dragdrop = require('./dragdrop');

var listeners = {
  hoverIconDelete: function(element){
    $(element).find('.icon-delete').mouseover(function() {
      $(this).parents('.element-wrapper').css('border-color', '#FB6A6C');
    }).mouseleave(function() {
      $(this).parents('.element-wrapper').css('border-color', '#87C5FF');
    });
  },
  clickIconDelete: function(element) {
    $(element).find('.icon-delete').click(function() {
      $(this).parents('.element-wrapper').prev().detach();
      $(this).parents('.element-wrapper').detach();
    });
  },
  draggable: function(draggable) {
    $(draggable).attr('draggable', true);
    draggable.addEventListener('dragstart', dragdrop.dragStart, false);
    draggable.addEventListener('drag', dragdrop.drag, false);
    draggable.addEventListener('dragend', dragdrop.dragEnd, false);
  },
  droppable: function(droptarget) {
    /* Drop target event handlers */
    droptarget.addEventListener('dragover' , dragdrop.dragOver, false);
    droptarget.addEventListener('dragleave', dragdrop.dragLeave, false);
    droptarget.addEventListener('drop', dragdrop.drop, false);
  }
};

module.exports = listeners;