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
  if(pos === 'bottom' || pos === 'top' || pos === 'none') {
    width = null;
  } else  {
    width = '50';
  }
  var sendElement = {
    page: page,
    type: type,
    width: width
  }
  //send request to add new [type] return new element with id 
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
    } else if (pos === 'left') {
      var width = '50';
      var id = $(place).attr('id');
      console.log($(place).parent().children().length);
      Element.updateWidth(id, JSON.stringify({
        width: width
      })).then(function() {
        $(place).css('width', '50%');
        el.insertBefore($(place)); 
        elementRearrage();
      }); 
    } else {
      //right
      var width = '50';
      var id = $(place).attr('id');
      Element.updateWidth(id, JSON.stringify({
        width: width
      })).then(function() {
        $(place).css('width', '50%');
        el.insertAfter($(place)); 
        elementRearrage();
      }); 
    }
  }).fail(function(err) {
    console.log(err);
  });
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


