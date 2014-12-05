var $ = require('jquery');
var Page = require('../models/page');
var Element = require('../models/element');
var templates = require('../views/templates');
var dragdrop = require('../components/dragdrop');
var pageHandlers = require('../handlers/pageHandlers');
var Route = require('../route');

var router = new Route();

module.exports.init = function() {
  //add new page handler
  createNewPage($('.icon-add'));
  pageHandlers.focusAdd($('.edit-page'));
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
      var id;
      if (router.getId()) {
        id = router.getId();
      } else {
        id = $('.page-list li:first-of-type').attr('id');
        router.set(id, 'page');
      }
      pageHandlers.getAllElements(id);
    }
  }).fail(function(err) {
    console.log(err);
  });
};

module.exports.rearrange = function() {
  elementRearrage();
};

module.exports.addNew = function(place, pos, page, type) {
  var width;
  if (pos == 'top' || pos == 'bottom' || pos == 'none') {
    width = null;
    var sendElement = {
      page: page,
      type: type,
      width: width
    }
    Element.newElement(sendElement).then(function(element) {
    //render element
      var container = templates.renderContainer();
      var el = templates.renderElement(element);
      $(container).append(el);
      
      //insert before place
      if (pos === 'bottom') {
        container.insertAfter($(place).parent());
        elementRearrage();
      } else if (pos === 'top') {
        container.insertBefore($(place).parent());
        elementRearrage();
      } else if (pos === 'none') {
        $(place).append(container);
        elementRearrage();
      }
    }); 
  } else {
    var colNumber = parseInt($(place).parent().children().length) + 1;
    width = Math.floor(100/colNumber);
    var sendElement = {
      page: page,
      type: type,
      width: width.toString()
    }
    Element.newElement(sendElement).then(function(element) {
      var siblings = $(place).parent().children().toArray();
      siblings.forEach(function(sib) {
        var id = $(sib).attr('id');
        Element.updateWidth(id, JSON.stringify({width: width.toString()}));
        $(sib).css('width', width+'%');
      });
      var el = templates.renderElement(element);
      if (pos == 'left') {
        el.insertBefore($(place));
        elementRearrage();
      } else {
        el.insertAfter($(place));
        elementRearrage();
      }
    });
  }
};

function createNewPage(target) {
  target.click(function() {
    var self = this;
    //send request to request new
    //then render pageButton and pageTab
    var name = $(this).siblings('.edit-page').html();
    if (name !== null && name !== '') {
      Page.newPage({name: name}).then(function(page) {
        //insert into dom
        insertPage(page);
        $(self).siblings('.edit-page').html('');
      }).fail(function(err) {
        console.log(err);
      });
    } else {
      alert('Please give a name');
    }
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
};

