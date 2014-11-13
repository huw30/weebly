//handles DOM append and add event listeners and handlers
var $ = require('jquery');
var listeners = require('./listeners');
var data = {id: 0};
var data1 = {id:1};

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

module.exports.appearance = {
  changeBorderRed: function() {
    $(this).parents('.element-wrapper').css('border-color', '#FE6A6D');
    $(this).siblings('.icon-resize').hide();
    $(this).siblings('.icon-resize-rotate').hide();
  },
  changeBorderBlue: function() {
    $(this).parents('.element-wrapper').css('border-color', '#87C5FF');
    $(this).siblings('.icon-resize').show();
    $(this).siblings('.icon-resize-rotate').show();

  },
  toggleSwitch: function() {
    $(this).toggleClass('icon-toggle-off icon-toggle-on');
  },
  editPage: function() {
    $(this).parent().toggleClass('edit');
    if ($(this).siblings('div').attr('contenteditable') == 'false') {
      $(this).siblings('div').attr('contenteditable', 'true');
    } else {
      $(this).siblings('div').attr('contenteditable', 'false');
      console.log($(this).siblings('div').html());
      //get page tab id and change inner html
    }
  },
  changePageRed: function() {
    $(this).parent().css('background-color', '#FE6A6D');
    $(this).parent().css('border-color', '#FE6A6D');
    // $(this).siblings('.icon-edit').css('visibility', 'hidden');
  },
  changePageBlue: function() {
    $(this).parent().css('background-color', '#488ACD');
    $(this).parent().css('border-color', '#488ACD');
    // $(this).siblings('.icon-edit').css('visibility', 'visible');
  }

};

module.exports.DOMHandle = {
  insertElement: function(place, type) {
    // var divider = $(dividerTemplate())[0];
    if (type === 'text') {
      var element = $(textTemplate(data1))[0];
      listeners.elementDrag(element);
      listeners.droppable($(element).find('.divider')[0]);
      listeners.hoverIconDelete(element);
      listeners.clickIconDelete(element);
    } else if (type === 'image') {
      var element = $(imageTemplate(data))[0];
      listeners.elementDrag(element);
      listeners.droppable($(element).find('.divider')[0]);
      listeners.hoverIconDelete(element);
      listeners.clickIconDelete(element);
    }
    $(element).insertBefore($(place).parent());
  },
  moveElement: function(place, id) {
    $('#'+id).insertBefore($(place).parent());
  },
  deleteElement: function() {
    $(this).parents('.element-divider-wrapper').detach();
  },
  addNewPage: function(element) {
    var name = $(element).siblings('.edit-page').html();
    var page = pageTemplate(name);
    listeners.clickIconEdit($(page.pageButton).find('.icon-edit'));
    listeners.hoverIconDeleteGrey($(page.pageButton).find('.icon-delete-grey'));
    listeners.clickIconDeletGrey($(page.pageButton).find('.icon-delete-grey'));
    $(page.pageButton).insertBefore($('.add-page'));
    $(page.pageTab).appendTo($('.page-tab'));
    $(element).siblings('.edit-page').empty();
    //TODO add listent to tab
  },
  deletePage: function() {
    $(this).parent().detach();
    //TODO delete tab PAGE
  }
};



/*TEMPLATE Functions*/
var textTemplate = JST['frontend/source/templates/element-text.hbs'];
var imageTemplate = JST['frontend/source/templates/element-image.hbs'];
// var dividerTemplate = JST['frontend/source/templates/divider.hbs'];

var pageTemplate = function(name) {
  var pageButton = document.createElement('li'),
  textDiv = document.createElement('div'),
  spanEdit = document.createElement('span'),
  spanDelete = document.createElement('span'),
  pageTab = document.createElement('li');
  spanEdit.className = 'icon-edit';
  spanDelete.className = 'icon-delete-grey';
  pageButton.className = 'page';
  textDiv.innerHTML = name;
  textDiv.contentEditable = 'false';
  pageButton.appendChild(textDiv);
  pageButton.appendChild(spanEdit);
  pageButton.appendChild(spanDelete);
  pageTab.innerHTML = name;
  var page = {
    pageButton: pageButton,
    pageTab: pageTab
  }
  return page;
}


