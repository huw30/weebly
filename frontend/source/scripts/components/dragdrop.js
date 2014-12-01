var view = require('../views/view');

var dragdrop = {
  dragStart: function(event) {
    event.dataTransfer.effectAllowed  = "move";
    //get element type and set to dataTransfer object
    var type = $(this).attr('class').match('-([^/]*)$')[1];
    event.dataTransfer.setData('type', type);
    // this.style.boxShadow = "0px 8px 18px 3px rgba(155,157,155,1)";  //not working, no idea why
    this.style.border = "1px solid #74777B";
    this.style.backgroundColor = "transparent";
    this.style.borderRadius= "5px";
    this.zIndex = '9999';

    //get element's position (original) and height/width
    this.originalY = $(this).offset().top;
    this.originalX = $(this).offset().left;
    this.elHeight = $(this).outerHeight(),
    this.elWidth = $(this).outerWidth(),
    this.posY = $(this).offset().top + this.elHeight - event.pageY,
    this.posX = $(this).offset().left + this.elWidth - event.pageX;
  },

  drag: function(event) {
    this.zIndex = '9999';
    event.dataTransfer.effectAllowed  = "move";
    //let the element move with mousemove
    $(this).offset({
      top: event.pageY + this.posY - this.elHeight,
      left: event.pageX + this.posX - this.elWidth
    });
    event.preventDefault();
  },

  dragEnd: function(event) {
    this.zIndex = '0';
    this.style.border = "none";
    this.style.borderRadius = "";
    //go back to where the element was
    $(this).offset({
      top: this.originalY,
      left: this.originalX
    });
    event.preventDefault();
  },
  dragOver: function(event) {
    //divider get hightlighted on hover
    if (parseInt(event.offsetX) > parseInt($(event.target).width())/4 + parseInt($(event.target).width())/2) {
      $(this).css('border', 'none');
      $(this).css('border-right', '2px dashed #6BBCFF');
    } else if (parseInt(event.offsetX) < parseInt(($(event.target).width())/4)) {
      $(this).css('border', 'none');      
      $(this).css('border-left', '2px dashed #6BBCFF');
    } else if (parseInt(event.offsetY) > parseInt($(event.target).height())/2){
      $(this).css('border', 'none');
      $(this).css('border-bottom', '2px dashed #6BBCFF');
    } else if(parseInt(event.offsetY) < (parseInt($(event.target).height())/2)-1) {
      $(this).css('border', 'none');
      $(this).css('border-top', '2px dashed #6BBCFF');
    }
    event.preventDefault();
    return false;
  },
  dragLeave: function(event) {
    $(this).css('border', 'none');
    event.preventDefault();
  },
  drop: function(event) {
    $(this).css('border', 'none');
    var type = event.dataTransfer.getData('type');
    var id = event.dataTransfer.getData('id');
    //if there's an id, then it means it's an existing element
    if (id) {
      //rearrange
      if (parseInt(event.offsetX) > parseInt($(event.target).width())/4 + parseInt($(event.target).width())/2) {
        //right
      } else if (parseInt(event.offsetX) < parseInt(($(event.target).width())/4)) {
        //left
      } else if (parseInt(event.offsetY) > parseInt($(event.target).height())/2){
        //bottom
        $('#'+id).insertAfter($(this));
      } else if(parseInt(event.offsetY) < (parseInt($(event.target).height())/2)-1) {
        //top
        $('#'+id).insertBefore($(this));
      }
      view.rearrange();
    } else {
      //if no id, then call add new
      //add new
      var pageId = $(this).parents('.page-content').attr('id').slice(0, 24);
      var pos;
      if (parseInt(event.offsetX) > parseInt($(event.target).width())/4 + parseInt($(event.target).width())/2) {
        //right
      } else if (parseInt(event.offsetX) < parseInt(($(event.target).width())/4)) {
        //left
      } else if (parseInt(event.offsetY) > parseInt($(event.target).height())/2){
        //bottom
        pos = 'bottom';
      } else if(parseInt(event.offsetY) < (parseInt($(event.target).height())/2)-1) {
        //top
        pos = 'top';
      }
      view.addNew(this, pos, pageId, type);
    }
    event.preventDefault();
    return false;
  },
  elementDragStart: function(event) {
    event.dataTransfer.effectAllowed  = "move";
    //set the element id when starting drag it
    event.dataTransfer.setData('id', $(event.target).attr('id'));
    $(event.target).css('opacity', '0.2');
    $(event.target).children('div:nth-child(2)').find('div').css('box-shadow', '0px 2px 12px 5px rgba(0,0,0,0.75)');    
  },
  elementDragEnd: function(event) {
    $(event.target).css('opacity', '1');
    $(event.target).children('div:nth-child(2)').find('div').css('box-shadow', 'none');    
    event.preventDefault();
  },

  onPageDragOver: function(event) {
    if ($('.element-divider-wrapper').toArray().length === 0) {
      $('.page-content').css('border-top', '2px dashed #6BBCFF');
    } else if ($('.page-content')[0] === event.target) {
      $('.page-content').children().last().css('border-bottom', '2px dashed #6BBCFF');
    }
    event.preventDefault();
  },
  onPageDragLeave: function(event) {
    $('.page-content').css('border-top', 'none');
    $('.page-content').children().last().css('border-bottom', 'none');
  }, 
  onPageDrop: function(event) {
    //if not drop on any of the divider, then add it underneath the lower-most already existing element
    $('.page-content').css('border-top', 'none');
    $('.page-content').children().last().css('border-bottom', 'none');
    var type = event.dataTransfer.getData('type');
    var id = event.dataTransfer.getData('id');
    var pos;
    if ($('.element-divider-wrapper').toArray().length === 0 || $('.page-content')[0] === event.target) {
      pos = 'none';
      var pageId = $(this).attr('id').slice(0, 24);
      view.addNew(this, pos, pageId, type);
    }
  }
};
module.exports = dragdrop;

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

