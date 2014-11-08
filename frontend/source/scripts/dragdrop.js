module.exports= function($) {
  $.fn.dragdrop = function() {
    var originalX = this.offset().left,
    originalY = this.offset().top;
    this.css('cursor', 'move').on("mousedown", function(e) {
      var element = $(this).addClass('draggable');
      var zIndx = element.css('z-index'),
      elHeight = element.outerHeight(),
      elWidth = element.outerWidth(),
      posY = element.offset().top + elHeight - e.pageY,
      posX = element.offset().left + elWidth - e.pageX;

      element.css('z-index', 9999).parents().on("mousemove", function(e) { 
        $('.draggable').offset({
          top:e.pageY + posY - elHeight,
          left:e.pageX + posX - elWidth
        }).on("mouseup", function() {
          $(this).removeClass('draggable').css('z-index', zIndx);
        });
        e.preventDefault();
      });
    }).on("mouseup", function() {
      $(this).removeClass('draggable').offset({top:originalY, left: originalX});
    });
  }
}(jQuery);