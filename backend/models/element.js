/*
  Element Object Data Access Layer. 
  Handles: 1. create new element
           2. get all elements
           3. update an element's position
           4. update an element's content
           5. remove a page
*/
var mongodb = require('mongodb').Db;
var ObjectID = require('mongodb').ObjectID;
var vow = require('vow');
var settings = require('../../settings');

function Element(page, type, position, content) {
  this.page = page;
  this.type = type;
  this.position = position;
  this.content = content;
}

Element.prototype.save = function() {
  var deferred = vow.defer();
  
  var element = {
    page: this.page,
    type: this.type,
    position: this.position,
    content: this.content
  }
  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      db.close();
      deferred.reject(err);
    }
    db.collection('elements',function(err, collection) {
      if (err) {
        db.close();
        deferred.reject(err);
      }
      collection.insert(element, {
        safe: true
      }, function(err, element) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(element[0]);
      });
    });
  });
  return deferred.promise();
};

Element.getAll = function(pageId) {
  var deferred = vow.defer();

  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      db.close();
      deferred.reject(err);
    }
    db.collection('elements',function(err, collection) {
      if (err) {
        db.close();
        deferred.reject(err);
      }
      collection.find({
        page: pageId
      }).sort({
        position: 1
      }).toArray(function(err, elements) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(elements);
      });
    });
  });

  return deferred.promise();
};

Element.updatePosition = function(id, position) {
  var deferred = vow.defer();
  
  var objectid = new ObjectID(id);

  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      deferred.reject(err);
    }
    db.collection('elements',function(err, collection) {
      if (err) {
        db.close();
        deferred.reject(err);
      }
      collection.update({
        _id: objectid
      }, {
        $set: {
          position: position
        }
      }, function(err) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve();
      });
    });
  });
  return deferred.promise();
};


Element.updateContent = function(id, content) {
  var deferred = vow.defer();
  
  var objectid = new ObjectID(id);
  
  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      deferred.reject(err);
    }
    db.collection('elements',function(err, collection) {
      if (err) {
        db.close();
        deferred.reject(err);
      }
      collection.update({
        _id: objectid
      }, {
        $set: {
          content: content
        }
      }, function(err) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve();
      });
    });
  });
  return deferred.promise();
};

Element.remove = function(id) {
  var deferred = vow.defer();
  var objectid = new ObjectID(id);
  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      deferred.reject(err);
    }

    db.collection('elements', function(err, collection) {
      if (err) {
        deferred.reject(err);
      }
      collection.remove({
        _id: objectid
      }, {
         w : 1
      }, function(err) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve();
      });
    });
  });
  return deferred.promise();
};


module.exports = Element;