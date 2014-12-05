var Page = require('../models/page');
var Element = require('../models/element');
var templates = require('../views/templates');
var dragdrop = require('../components/dragdrop');
var Route = require('../route');

var pageHandlers = (function() {
  var router = new Route();
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
    edit: function(target, id) {
      target.click(function() {
        router.set(id, 'edit');
        $(this).parent().css('border-color', '#4C657C');
        $(this).parent().css('background-color', 'transparent');      
        $(this).siblings('div').attr('contenteditable', 'true');
        $(this).css('visibility', 'hidden');
      });
    },
    focusAdd: function(target) {
      var id;
      target.focus(function() {
        id = router.getId();
        router.set(null, 'add');
      });
      target.blur(function() {
        router.set(id, 'page');
      });
    },
    focusOut: function(target, id) {
      target.blur(function() {
        var presentId = $('ul.page-tab li.active').attr('id');
        router.set(presentId.split('-')[0],'page');
        var self = this;
        $(this).parent().css('border-color', '#488ACD');
        $(this).parent().css('background-color', '#488ACD');
        $(this).attr('contenteditable', 'false');
        var newName = {name: $(this).text()};
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
          router.set(null,null);
          $(self).parent().detach();
          $('#'+id+'-c').detach();
          $('#'+id+'-t').detach();
        }).fail(function(err) {
          console.log(err);
        });
      });
    },
    requestElements: function(target, pageId) {
       $(target).click(function() {
        router.set(pageId, 'page');
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
    var i = 0;
    while (i < elements.length) {
      if (elements[i].width == "" || elements[i].width == 100) {
        var container = templates.renderContainer();
        var el = templates.renderElement(elements[i]);
        $(container).append(el);
        $('.page-content').append(container);
        i++;
      } else if (parseInt(elements[i].width) == 50) {
        var container = templates.renderContainer();
        var el1 = templates.renderElement(elements[i]);
        var el2 = templates.renderElement(elements[i+1]);
        $(container).append(el1);
        $(container).append(el2);
        $('.page-content').append(container);
        i = i+2;
      }
    }
  }).fail(function(err) {
    console.log(err);
  });
};