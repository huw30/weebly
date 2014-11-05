var test = require('./test/test');

var $ = require('jquery');



var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];
//Get the HTML from the template in the script tag​
// var theTemplateScript = $("#shoe-template").html();
// console.log(theTemplateScript);
//Compile the template​
var theTemplate = JST['source/templates/test.hbs'];

$(".shoesNav").append(theTemplate(shoesData));