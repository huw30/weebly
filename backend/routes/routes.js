var Page = require('../models/page');
var Element = require('../models/element');
var vow = require('vow');

module.exports = function(app) {
  app.post('/page/new', function(req, res) {
    var newPage = new Page(req.body.name);
    newPage.save().then(function(page) {
      page.tabId = page._id+'-t';
      page.contentId = page._id+'-c';
      res.send(page);
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.post('/page/:id', function(req, res) {
    var pageId = req.params.id;
    var pageName = req.body.name;
    Page.update(pageId, pageName).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.del('/page/:id', function(req, res) {
    var pageId = req.params.id;
    Page.remove(pageId).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.get('/pages', function(req, res) {
    Page.getAll().then(function(pages) {
      pages.forEach(function(page) {
        page.tabId = page._id+'-t';
        page.contentId = page._id+'-c';
      });
      res.send(pages);
    }).fail(function(err){
      res.send(err);
    });
  });

  //********************************Elements**********************

  app.post('/element/new', function(req, res) {
    var newElement = new Element(req.body.page, req.body.type, null, null);
    newElement.save().then(function(element) {
      res.send(element);
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.get('/elements/:id', function(req, res) {
    var pageId = req.params.id;
    Element.getAll(pageId).then(function(elements) {
      res.send(elements);
    }).fail(function(err){
      res.send(err);
    });
  });


  app.post('/elements', function(req, res) {
    var elements = req.body.elements;
    elements.pop();
    var vows = [];

    elements.forEach(function(element, index) {
      vows.push(Element.updatePosition(element, index));
    });

    vow.all(vows).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });
  
  app.put('/element/:id', function(req, res) {
    var elementId = req.params.id;
    var content = req.body.content;
    Element.updateContent(elementId, content).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.del('/element/:id', function(req, res) {
    var elementId = req.params.id;
    Element.remove(elementId).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });
}
