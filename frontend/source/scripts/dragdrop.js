var helper = require('./dragdropHelper');

var dragdrop = {
  /* Draggable event handlers */
  dragStart: function(event) {
    event.dataTransfer.effectAllowed  = "move";
    event.dataTransfer.dropEffect     = "move";
    //get element type and set to dataTransfer object
    var type = $(this).attr('class').match('-([^/]*)$')[1];
    event.dataTransfer.setData('type', type);

    // this.style.zIndex = 9999; //not working, no idea why
    // this.style.boxShadow = "0px 8px 18px 3px rgba(155,157,155,1)";  //not working, no idea why
    this.style.border = "1px solid #74777B";
    this.style.borderRadius = "5px";

    this.originalY = $(this).offset().top;
    this.originalX = $(this).offset().left;
    this.elHeight = $(this).outerHeight(),
    this.elWidth = $(this).outerWidth(),
    this.posY = $(this).offset().top + this.elHeight - event.pageY,
    this.posX = $(this).offset().left + this.elWidth - event.pageX;
  },

  drag: function(event) {
    event.dataTransfer.effectAllowed  = "move";
    event.dataTransfer.dropEffect     = "move";

    $(this).offset({
      top: event.pageY + this.posY - this.elHeight,
      left: event.pageX + this.posX - this.elWidth
    });
  },

  dragEnd: function(event) {
    this.style.border = "none";
    this.style.borderRadius = "";
    //go back to where it was
    $(this).offset({
      top: this.originalY,
      left: this.originalX
    });
  },


  dragOver: function(event) {
    $(this).children().addClass('active');
    event.preventDefault();
    return false;
  },

  dragLeave: function(event) {
    $(this).children().removeClass('active');
  },

  drop: function(event) {
    $(this).children().removeClass('active');
    var type = event.dataTransfer.getData('type');
    helper.insert(this, type);
    // console.log(handler);
    event.preventDefault();
    return false;
  }
};

module.exports = dragdrop;

