var $ = require('jquery');
var Page = require('../models/page');
var Element = require('../models/element');
var templates = require('../views/templates');
var dragdrop = require('../components/dragdrop');

module.exports.init = function() {
  //add new page handler
  createNewPage($('.icon-add'));

  //init drag items
  $('.element-item span:first-of-type').each(function() {
    this.addEventListener('dragstart', dragdrop.dragStart, false);
    this.addEventListener('drag', dragdrop.drag, false);
    this.addEventListener('dragend', dragdrop.dragEnd, false);
  });

  //get all pages
  Page.getAll().then(function(pages) {
    if (pages.length > 0) {
      pages.forEach(function(page) {
        insertPage(page);
      });
      var id = $('.page-list li:first-of-type').attr('id');
      //get all elements of first tab
      getAllElements(id);
    }
  });
};

module.exports.rearrange = function(place, id) {
    console.log('hey');
    //findAllElement
    //send request to rearrange [get all id] //need test 
    //then
    // $('#'+id).insertBefore($(place).parent());
},
module.exports.addNew = function(place, page, type) {
  var sendElement = {
    page: page,
    type: type
  }
  //send request to add new [type] return new element with id 
  Element.newElement(sendElement).then(function(element) {
    //render element
    var el = templates.renderElement(element);
    //insert before place
    el.insertBefore($(place).parent());
  });
}

function createNewPage(target) {
  target.click(function() {
    var self = this;
    //send request to request new
    //then render pageButton and pageTab
    var name = $(this).siblings('.edit-page').html();
    Page.newPage({name: name}).then(function(page) {
      //insert into dom
      insertPage(page);
      $(self).siblings('.edit-page').html('');
    });
  });
};

function insertPage(page) {
  var pageButton = templates.renderPageButton(page);
  pageButton.insertBefore($('li.add-page'));
  var pageTab = templates.renderPageTab(page);
  $('.page-tab').append(pageTab);
};

function getAllElements(pageId) {
  $('#'+pageId+'-t').addClass('active');
  var pageContent = templates.renderPageContent({contentId: pageId+'-c'});
  pageContent[0].addEventListener('dragover' , dragdrop.onPageDragOver, false);
  pageContent[0].addEventListener('dragleave', dragdrop.onPageDragLeave, false);
  pageContent[0].addEventListener('drop', dragdrop.onPageDrop, false);
  $('.view-container').append(pageContent);
  Element.getAll(pageId).then(function(elements){
    elements.forEach(function(element) {
      var el = templates.renderElement(element);
      el.insertBefore($('#default'));
    });
  });
};


