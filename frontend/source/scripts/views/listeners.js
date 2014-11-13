/*All listeners are defined here*/

var dragdrop = require('../handlers/dragdrop');
var view = require('./view');
var Page = require('../models/page');

var listeners = {
  hoverIconDelete: function(element){
    $(element).find('.icon-delete')
    .mouseover(view.appearance.changeBorderRed)
    .mouseleave(view.appearance.changeBorderBlue);
  },
  clickIconDelete: function(element) {
    $(element).find('.icon-delete').click(view.DOMHandle.deleteElement);
  },
  clickIconAdd: function(element) {
    $(element).find('.icon-add').click(function(){
      // Page.newPage()
      // view.DOMHandle.addNewPage
    )};
  },
  clickToggle: function(element) {
    $(element).click(view.appearance.toggleSwitch);
  },
  clickIconEdit: function(element) {
    $(element).click(view.appearance.editPage);
  },
  hoverIconDeleteGrey: function(element) {
    $(element)
    .mouseover(view.appearance.changePageRed)
    .mouseleave(view.appearance.changePageBlue);
  },
  clickIconDeletGrey: function(element) {
    $(element).click(view.DOMHandle.deletePage);
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
    pageContent.addEventListener('dragover' , dragdrop.onPageDragOver, false);
    pageContent.addEventListener('dragleave', dragdrop.onPageDragLeave, false);
    pageContent.addEventListener('drop', dragdrop.onPageDrop, false);
  },
  elementDrag: function(draggable) {
    $(draggable).attr('draggable', true);
    draggable.addEventListener('dragstart', dragdrop.elementDragStart, false);
    draggable.addEventListener('dragend', dragdrop.elementDragEnd, false);
  }
};

module.exports = listeners;