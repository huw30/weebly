var $ = require('jquery');
var Page = require('../models/page');
var Element = require('../models/element');
var templates = require('../views/templates');
var dragdrop = require('../components/dragdrop');
var pageHandlers = require('../handlers/pageHandlers');


module.exports.init = function() {
  //add new page handler
  createNewPage($('.icon-add'));
  pageHandlers.clickToggle($('.setting .icon-toggle-off'));
  $('.sidebar').mouseover(function() {
    $('.view-container').addClass('active');
  }).mouseleave(function() {
    $('.view-container').removeClass('active');
  });

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
      // get all elements of first tab
      pageHandlers.getAllElements(id);
    }
  }).fail(function(err) {
    console.log(err);
  });
};

module.exports.rearrange = function() {
  elementRearrage();
},
module.exports.addNew = function(place, pos, page, type) {
  var sendElement = {
    page: page,
    type: type
  }
  //send request to add new [type] return new element with id 
  Element.newElement(sendElement).then(function(element) {
    //render element
    var el = templates.renderElement(element);
    //insert before place
    if (pos === 'bottom') {
      el.insertAfter($(place));
    } else if (pos === 'top') {
      el.insertBefore($(place));
    } else if (pos === 'none') {
      $(place).append(el);
    } else if (pos === 'left') {
      $(place).css('width', '50%');
      $(el).css('width', '50%');
      el.insertBefore($(place));  
    } else {
      //right
      $(place).css('width', '50%');
      $(el).css('width', '50%');
      el.insertAfter($(place));
    }
    elementRearrage();
  }).fail(function(err) {
    console.log(err);
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
    }).fail(function(err) {
      console.log(err);
    });
  });
};

function insertPage(page) {
  var pageButton = templates.renderPageButton(page);
  pageButton.insertBefore($('li.add-page'));
  var pageTab = templates.renderPageTab(page);
  $('.page-tab').append(pageTab);
};

function elementRearrage() {
  var elementArray = [];
  if ($('.element-divider-wrapper').toArray().length !== 0) {
    $('.element-divider-wrapper').each(function() {
      elementArray.push($(this).attr('id'));
    });
    Element.rearrange(elementArray);
  }
}


