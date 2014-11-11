/*
  Handler creates elements, add event listener to elements, insert to DOM and send Ajax calls(model)
*/

module.exports.appearance = {
  changeBorderRed: function() {
    $(this).parents('.element-wrapper').css('border-color', '#FB6A6C');
  },
  changeBorderBlue: function() {
    $(this).parents('.element-wrapper').css('border-color', '#87C5FF');
  },
  deleteElement: function() {
    $(this).parents('.element-wrapper').prev().detach();
    $(this).parents('.element-wrapper').detach();
  },
  addNewPage: function() {
    // $(this).
    console.log($(this).siblings('.edit-page').html());
  },
  toggleSwitch: function() {
    $(this).toggleClass('icon-toggle-off icon-toggle-on');
  }
}



