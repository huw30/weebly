var Page = require('../models/page');
var Element = require('../models/element');
var templates = require('../views/templates');
var dragdrop = require('../components/dragdrop');

var pageHandlers = (function() {
  var handlers = {
    clickToggle: function(target) {
      $(target).click(function() {
        $(this).toggleClass('icon-toggle-off icon-toggle-on');
      });
    },
    buttonHover: function(target) {
      //handle button hover events
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
        //sendRequest to change page name
        Page.edit(id, newName).then(function() {
          //change pageTab's name according to id
          $('#'+id+'-t').html($(self).html());
        }).fail(function(err) {
          console.log(err);
        });
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
          var siblingPage = $(self).parent().prev()?$(self).parent().prev(): $(self).parent().next();
          $(self).parent().detach();
          $('#'+id+'-t').detach();
          $('#'+id+'-c').detach();
          //if there's another page, get that page's all elements 
          if (siblingPage) {
            getAllElements(siblingPage.attr('id'));
          }
          //if not, do nothing
        }).fail(function(err) {
          console.log(err);
        });
      });
    },
    requestElements: function(target, pageId) {
       $(target).click(function() {
        $('.page-content').detach();
        $(this).siblings().each(function() {
          $(this).removeClass('active');
        });
        //request all elements of that page, and call insert function(element array)
        getAllElements(pageId);
        $(this).addClass('active');
      });
    },
    getAllElements: function(pageId) {
      getAllElements(pageId);
    }
  }
  return handlers;
})();

module.exports = pageHandlers;
//get all elements of a page 
//then insert a new page-content container
//add listeners
//and insert all elements into the container order by postion
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
  }).fail(function(err) {
    console.log(err);
  });
};