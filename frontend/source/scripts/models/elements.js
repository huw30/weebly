module.exports.getElements = function() {
  $.getJSON('/shoes', function(data) {
    var theTemplate = JST['frontend/source/templates/test.hbs'];
    $(".shoesNav").append(theTemplate(data));
  });
}