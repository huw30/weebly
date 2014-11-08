var $ = require('jquery');
var elements = require('./models/elements');
require('./dragdrop');

$('.element-item span:first-of-type').each(function(){
  $(this).dragdrop();
});


