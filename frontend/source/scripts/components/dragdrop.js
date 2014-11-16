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
    //go back to where it was
    $(this).offset({
      top: this.originalY,
      left: this.originalX
    });
    event.preventDefault();
  },
  dragOver: function(event) {
    $(this).children().addClass('active');
    event.preventDefault();
    return false;
  },
  dragLeave: function(event) {
    $(this).children().removeClass('active');
    event.preventDefault();
  },
  drop: function(event) {
    $(this).children().removeClass('active');
    var type = event.dataTransfer.getData('type');
    var id = event.dataTransfer.getData('id');
    if (id) {
      //rearrange
      $('#'+id).insertBefore($(this).parent());
      view.rearrange();
    } else {
      //add new
      var pageId = $(this).parents('.page-content').attr('id').slice(0, 24);
      view.addNew(this, pageId, type);
    }
    event.preventDefault();
    return false;
  },
  elementDragStart: function(event) {
    event.dataTransfer.effectAllowed  = "move";
    event.dataTransfer.setData('id', $(event.target).attr('id'));
    $(event.target).css('opacity', '0.2');
  },
  elementDragEnd: function(event) {
    $(event.target).css('opacity', '1');
    event.preventDefault();
  },

  onPageDragOver: function(event) {
    //if usinsertElementer not hover on any of the divider then find the last divider and active it
    if (!isInArray(event.target, $('.divider').toArray())) {
      $('.divider:last').children().addClass('active');
    }
    event.preventDefault();
  },
  onPageDragLeave: function(event) {
    $('.divider:last').children().removeClass('active');
  }, 
  onPageDrop: function(event) {
    $('.divider:last').children().removeClass('active');
    var type = event.dataTransfer.getData('type');
    var id = event.dataTransfer.getData('id');
    if (!isInArray(event.target, $('.divider').toArray())) { 
      if (id) {
        // view.rearrange($('.divider:last'), id);
      } else {
        var pageId = $(this).attr('id').slice(0, 24);
        view.addNew($('.divider:last'), pageId, type);
      }
    }
  }
};
module.exports = dragdrop;

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

