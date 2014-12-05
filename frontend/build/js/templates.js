this["JST"] = this["JST"] || {};

this["JST"]["frontend/source/templates/element-image.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"element-divider-wrapper\" id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " draggable=\"true\">\n    <div class=\"inner-container\">\n        <div class=\"element-wrapper-image\" style=\"height: "
    + escapeExpression(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"height","hash":{},"data":data}) : helper)))
    + "px; width: "
    + escapeExpression(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"width","hash":{},"data":data}) : helper)))
    + "%\">\n            <span class=\"icon-delete\"></span>\n            <span class=\"icon-resize\"></span>\n            <span class=\"icon-resize\"></span>\n            <span class=\"icon-resize-rotate\"></span>\n            <div class=\"element-image\">\n                <span class=\"icon-image-placeholder\"></span>\n                <span class=\"add-image-text\">ADD IMAGE <span>+</span></span>\n            </div> \n        </div>\n    </div>\n</div>";
},"useData":true});



this["JST"]["frontend/source/templates/element-text.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"element-divider-wrapper\" id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " draggable=\"true\">\n    <div class=\"inner-container\">\n        <div class=\"element-wrapper-text\" style=\"height: "
    + escapeExpression(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"height","hash":{},"data":data}) : helper)))
    + "px; width: "
    + escapeExpression(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"width","hash":{},"data":data}) : helper)))
    + "%\">\n            <span class=\"icon-delete\"></span>\n            <span class=\"icon-resize\"></span>\n            <span class=\"icon-resize\"></span>\n            <span class=\"icon-resize-rotate\"></span>\n            <div class=\"element-text\" contenteditable=\"true\" data-placeholder=\"Click here to edit\">"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n    </div>\n</div>";
},"useData":true});



this["JST"]["frontend/source/templates/element-title.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"element-divider-wrapper\" id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " draggable=\"true\">\n    <div class=\"inner-container\">\n        <div class=\"element-wrapper-title\" style=\"height: "
    + escapeExpression(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"height","hash":{},"data":data}) : helper)))
    + "px; width: "
    + escapeExpression(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"width","hash":{},"data":data}) : helper)))
    + "%\">\n            <span class=\"icon-delete\"></span>\n            <span class=\"icon-resize-rotate\"></span>\n            <div class=\"element-title\" contenteditable=\"true\" data-placeholder=\"Add Title Here\">"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n    </div>\n</div>";
},"useData":true});



this["JST"]["frontend/source/templates/page-button.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li class=\"page\" id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n    <div contenteditable=\"false\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n    <span class=\"icon-edit\"></span>\n    <span class=\"icon-delete-grey\"></span>\n</li>\n";
},"useData":true});



this["JST"]["frontend/source/templates/page-content.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"page-content\" id="
    + escapeExpression(((helper = (helper = helpers.contentId || (depth0 != null ? depth0.contentId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"contentId","hash":{},"data":data}) : helper)))
    + "></div>";
},"useData":true});



this["JST"]["frontend/source/templates/page-tab.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li id="
    + escapeExpression(((helper = (helper = helpers.tabId || (depth0 != null ? depth0.tabId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tabId","hash":{},"data":data}) : helper)))
    + ">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</li>";
},"useData":true});