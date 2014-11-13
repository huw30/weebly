var mongodb = require('mongodb').Db;
var vow = require('vow');
var settings = require('../../settings');

function Page(name) {
  this.name = name;
}

Page.prototype.save = function() {
  var deferred = vow.defer();
  var page = {
    name: this.name
  }

  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      db.close();
      deferred.reject(err);
    }
    db.collection('pages',function(err, collection) {
      if (err) {
        db.close();
        deferred.reject(err);
      }
      collection.insert(page, {
        safe: true
      }, function(err, page) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(page);
      });
    });
  });
  return deferred.promise();
};

Page.getOne = function(id) {
  var deferred = vow.defer();

  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      db.close();
      deferred.reject(err);
    }
    db.collection('pages',function(err, collection) {
      if (err) {
        db.close();
        deferred.reject(err);
      }
      collection.findOne({
        id: id
      }, function(err, page) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(page);
      });
    });
  });

  return deferred.promise();
};

Page.getAll = function() {
  var deferred = vow.defer();

  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      db.close();
      deferred.reject(err);
    }
    db.collection('pages',function(err, collection) {
      if (err) {
        db.close();
        deferred.reject(err);
      }
      collection.find().toArray(function(err, pages) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(pages);
      });
    });
  });

  return deferred.promise();
};

Page.update = function(id, name) {
  var deferred = vow.defer();
  
  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      deferred.reject(err);
    }
    db.collection('pages',function(err, collection) {
      if (err) {
        db.close();
        deferred.reject(err);
      }
      collection.update({
        id: id
      }, {
        $set: {
          name: name
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

Page.remove = function(id) {
  var deferred = vow.defer();
  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      deferred.reject(err);
    }

    db.collection('pages', function(err, collection) {
      if (err) {
        deferred.reject(err);
      }
      collection.remove({
        id: id
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


module.exports = Page;