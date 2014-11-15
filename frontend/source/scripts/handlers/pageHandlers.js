var Page = require('../models/page');
var view = require('../views/view');

var pageHandlers = {
  buttonHover: function(target) {
    target.hover(
      function() {
        $(this).css('border-color', '#4C657C');
        $(this).css('background-color', '#4C657C');
        $(this).find('.icon-edit').css('visibility', 'visible');
        $(this).find('.icon-delete-grey').css('visibility', 'visible');
      },
      function() {
        $(this).css('border-color', '#488ACD');
        $(this).css('background-color', '#488ACD');
        $(this).find('.icon-edit').css('visibility', 'hidden');
        $(this).find('.icon-delete-grey').css('visibility', 'hidden');
      }
    );
  },
  edit: function(target) {
    target.click(function() {
      $(this).parent().css('border-color', '#4C657C');
      $(this).parent().css('background-color', 'transparent');      
      $(this).siblings('div').attr('contenteditable', 'true');
      $(this).css('visibility', 'hidden');
    });
  },
  focusOut: function(target, id) {
    target.blur(function() {
      var self = this;
      $(this).parent().css('border-color', '#488ACD');
      $(this).parent().css('background-color', '#488ACD');
      $(this).attr('contenteditable', 'false');
      var newName = {name: $(this).html()};
      //sendRequest change name
      Page.edit(id, newName).then(function() {
        //change pageTab's name according to id
        $('#'+id+'-t').html($(self).html());
      })
    });
  },
  deletePageHover: function(target) {
    $(target)
    .mouseover(function() {
      $(this).parent().css('background-color', '#FE6A6D');
      $(this).parent().css('border-color', '#FE6A6D');
      $(this).siblings('.icon-edit').css('visibility', 'hidden');
    }).mouseleave(function() {
      $(this).parent().css('background-color', '#488ACD');
      $(this).parent().css('border-color', '#488ACD');
      $(this).siblings('.icon-edit').css('visibility', 'visible');
    });
  },
  deletePage: function(target, id) {
    //send request to delete page
    $(target).click(function() {
      var self = this;
      Page.deletePage(id).then(function() {
        //then detach page button
        $(self).parent().detach();
        $('#'+id+'-t').detach();
        $('#'+id+'-c').detach();
        //if there's another page, get that page's all elements 
        //if not, do nothing
      });
    });
  },
  requestElements: function(target) {
     $(target).click(function() {
      //request all elements of that page, and call insert function(element array)
      //then
      // $(this).addClass('active');
    });
  }
};

module.exports = pageHandlers;