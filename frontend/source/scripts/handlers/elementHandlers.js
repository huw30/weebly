var dragdrop = require('../components/dragdrop');
var Element = require('../models/element');
var view = require('../views/view');
var placeholder = require('../placeholder');

var elementHandlers = {
  resizeElement: function(target, id) {
    target.mousedown(function() {
      event.preventDefault();
      var current = this;
      current.originalPosition = parseInt(event.pageY);
      current.parent = $(current).parent();
      var startHeight = parseInt($(current).parent().height());
      var divType = $(current).siblings('div').attr('class');
      if ($(current).siblings('div').html() == '') {
        if (divType === 'element-text') {
          $(current).siblings('div').html(placeholder.text);
          var content = $(current).siblings('div').text();
          Element.edit(id, JSON.stringify({content: content}));
        } else if (divType === 'element-title') {
          $(current).siblings('div').html(placeholder.title);
          var content = $(current).siblings('div').text();
          Element.edit(id, JSON.stringify({content: content}));
        }
      }
      $(document).mousemove(function() {
        event.preventDefault();
        current.parent.addClass('bordered');
        current.parent.height(
          startHeight + (event.pageY - current.originalPosition)
        );
      }).mouseup(function() {
        current.parent.removeClass('bordered');
        $(this).off('mousemove');
        var grandParent = target.parents('.element-divider-wrapper');
        var height = target.parent().height();
        // var width = Math.floor( 100 * parseFloat(grandParent.css('width')) / parseFloat(grandParent.parent().css('width')));
        Element.updateHeight(id, JSON.stringify({
          height: height
        }));
      });
    }).mouseup(function() {
      $(this).off('mousemove');
    });
  },
  changeContent: function(target, id) {
    target.blur(function() {
      var content = $(this).text();
      //send request to change element content
      Element.edit(id, JSON.stringify({content: content}));
    });
  },
  dragElement: function(target) {
    //add listeners to the existing element
    target.addEventListener('dragstart', dragdrop.elementDragStart, false);
    target.addEventListener('dragend', dragdrop.elementDragEnd, false);
  },
  deleteElement: function(target, id) {
    target.click(function() {
      //send request to delete the element
      var self = this;
      Element.deleteElement(id).then(function() {
        //after the element is deleted in database, datach the DOM element
        var rest = $(self).parents('.element-divider-wrapper').siblings('.element-divider-wrapper');
        var siblings = rest.toArray();
        if(siblings.length !== 0) {
          var colNumber = parseInt(siblings.length);
          width = Math.floor(100/colNumber);
          siblings.forEach(function(sib) {
            var id = $(sib).attr('id');
            Element.updateWidth(id, JSON.stringify({width: width.toString()}));
            $(sib).css('width', width+'%');
            $(self).parents('.element-divider-wrapper').detach();
          });
        } else {
          $(self).parents('.element-divider-wrapper').detach();
        }
        //rearrange the element position
        view.rearrange();
      }).fail(function(err) {
        console.log(err);
      });
    });
  },
  deleteElementHover: function(target) {
    //handles the mouse action on the element
    target.mouseover(function() {
      $(this).parent().css('border-color', '#FE6A6D');
      $(this).siblings('.icon-resize').hide();
      $(this).siblings('.icon-resize-rotate').hide();
    }).mouseleave(function() {
      $(this).parent().css('border-color', '#87C5FF');
      $(this).siblings('.icon-resize').show();
      $(this).siblings('.icon-resize-rotate').show();
    });
  },
  dropElement: function(target) {
    //add event listener to each divider
    target.addEventListener('dragover' , dragdrop.dragOver, false);
    target.addEventListener('dragleave', dragdrop.dragLeave, false);
    target.addEventListener('drop', dragdrop.drop, false);
  }
};

module.exports = elementHandlers;