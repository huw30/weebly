/*Add listeners*/

var dragdrop = require('./dragdrop');
var handler = require('./handler');

var listeners = {
  hoverIconDelete: function(element){
    $(element).find('.icon-delete')
    .mouseover(handler.appearance.changeBorderRed)
    .mouseleave(handler.appearance.changeBorderBlue);
  },
  clickIconDelete: function(element) {
    $(element).find('.icon-delete').click(handler.appearance.deleteElement);
  },
  clickIconAdd: function(element) {
    $(element).find('.icon-add').click(handler.appearance.addNewPage);
  },
  clickToggle: function(element) {
    $(element).click(handler.appearance.toggleSwitch);
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
  },
  dropPageContent: function(pageContent) {
    pageContent.addEventListener('dragover' , dragdrop.pageDragOver, false);
    pageContent.addEventListener('dragleave', dragdrop.pageDragLeave, false);
    pageContent.addEventListener('drop', dragdrop.pageDrop, false);
  }
};

module.exports = listeners;