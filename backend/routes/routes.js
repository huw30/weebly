var Page = require('../models/page');
var Element = require('../models/element');

module.exports = function(app) {
  app.post('/page/new', function(req, res) {
    var newPage = new Page(req.body.name);
    newPage.save().then(function(page) {
      res.send(page);
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.get('/page/:id', function(req, res) {
    var pageId = req.param.id;
    Page.getOne(pageId).then(function(page) {
      res.send(page);
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.put('/page/:id', function(req, res) {
    var pageId = req.param.id;
    var pageName = req.body.name;
    Page.update(pageId, pageName).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.del('/page/:id', function(req, res) {
    var pageId = req.param.id;
    Page.remove(pageId).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.get('/pages', function(req, res) {
    Page.getAll().then(function(pages) {
      res.send(pages);
    }).fail(function(err){
      res.send(err);
    });
  });

  //**************************************

  app.post('/element/new', function(req, res) {
    var newElement = new Element(req.body.page, req.body.type, req.body.position, req.body.content);
    newElement.save().then(function(element) {
      res.send(element);
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.get('/element/:id', function(req, res) {
    var elementId = req.param.id;
    Element.getOne(elementId).then(function(element) {
      res.send(element);
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.put('/element', function(req, res) {
    // var pageId = req.param.id;
    // var pageName = req.body.name;
    // Page.update(pageId, pageName).then(function() {
    //   res.send({success: true});
    // }).fail(function(err) {
    //   res.send(err);
    // });
  });
  
  app.put('/element/:id', function(req, res) {
    var elementId = req.param.id;
    var content = req.body.content;
    Element.updateContent(elementId, content).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.del('/element/:id', function(req, res) {
    var elementId = req.param.id;
    Element.remove(elementId).then(function() {
      res.send({success: true});
    }).fail(function(err) {
      res.send(err);
    });
  });

  app.get('/elements', function(req, res) {
    var pageId = req.body.pageId;
    Element.getAll(pageId).then(function(elements) {
      res.send(elements);
    }).fail(function(err){
      res.send(err);
    });
  });
}
