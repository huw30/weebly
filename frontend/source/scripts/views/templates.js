// var $ = require('jquery');
var pageHandlers = require('../handlers/pageHandlers');
var elementHandlers = require('../handlers/elementHandlers');

var handlebars = {
  text: JST['frontend/source/templates/element-text.hbs'],
  image: JST['frontend/source/templates/element-image.hbs'],
  title: JST['frontend/source/templates/element-title.hbs'],
  pageButton: JST['frontend/source/templates/page-button.hbs'],
  pageTab: JST['frontend/source/templates/page-tab.hbs'],
  pageContent: JST['frontend/source/templates/page-content.hbs']
};

module.exports.renderPageButton = function(page) {
  var pageButton = $(handlebars.pageButton(page)); //get dom elements
  pageHandlers.buttonHover(pageButton);
  pageHandlers.edit(pageButton.find('.icon-edit'));
  pageHandlers.focusOut(pageButton.find('div:first-of-type'), page._id);
  pageHandlers.deletePageHover(pageButton.find('.icon-delete-grey'));
  pageHandlers.deletePage(pageButton.find('.icon-delete-grey'), page._id);
  return pageButton;
};

module.exports.renderPageTab = function(page) {
  var pageTab = $(handlebars.pageTab(page));
  pageHandlers.requestElements(pageTab, page._id);
  return pageTab;
};

module.exports.renderElement = function(data) {
  var element;
  if (data.type === 'text') {
    element = $(handlebars.text(data));
    elementHandlers.changeContent(element.find('.element-text'), data._id);
  } else if (data.type === 'image') {
    element = $(handlebars.image(data));
  } else if (data.type === 'title') {
    element = $(handlebars.title(data));
    elementHandlers.changeContent(element.find('.element-title'), data._id);
  }
  elementHandlers.deleteElementHover(element.find('.icon-delete'));
  elementHandlers.deleteElement(element.find('.icon-delete'), data._id);
  elementHandlers.dragElement(element[0]);
  elementHandlers.dropElement(element.find('.divider')[0]);
  return element;
};

module.exports.renderPageContent = function(data) {
  var pageContent = $(handlebars.pageContent(data));
  elementHandlers.dropElement(pageContent.find('.divider')[0]);
  return pageContent;
}