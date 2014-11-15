var mongodb = require('mongodb').Db;
var ObjectID = require('mongodb').ObjectID;
var vow = require('vow');
var settings = require('../../settings');

function Page(name) {
  this.name = name;
}

Page.prototype.save = function() {
  var date = +new Date();
  var deferred = vow.defer();
  var name = this.name;

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
      collection.insert({
        date: date,
        name: name
      }, function(err, page) {
        db.close();
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(page[0]);
      });
    });
  });
  return deferred.promise();
};

// Page.getOne = function(id) {
//   var deferred = vow.defer();

//   mongodb.connect(settings.url, function(err, db) {
//     if (err) {
//       db.close();
//       deferred.reject(err);
//     }
//     db.collection('pages',function(err, collection) {
//       if (err) {
//         db.close();
//         deferred.reject(err);
//       }
//       collection.findOne({
//         _id: id
//       }, function(err, page) {
//         db.close();
//         if (err) {
//           deferred.reject(err);
//         }
//         deferred.resolve(page);
//       });
//     });
//   });

//   return deferred.promise();
// };

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
      collection.find().sort({
        date: 1 
      }).toArray(function(err, pages) {
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
  
  var objectid = new ObjectID(id);

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
        _id: objectid
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

  var objectid = new ObjectID(id);
  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      deferred.reject(err);
    }

    db.collection('pages', function(err, collection) {
      if (err) {
        deferred.reject(err);
      }
      collection.remove({
        _id: objectid
      }, {
         w : 1
      }, function(err) {
        if (err) {
          db.close();
          deferred.reject(err);
        }
        db.collection('elements', function(err, collection) {
          if (err) {
            db.close();
            deferred.reject(err);
          }
          collection.remove({
            page: id
          }, function(err) {
            db.close();
            if (err) {
              deferred.reject(err);
            }
            deferred.resolve();
          });
        });
      });
    });
  });
  return deferred.promise();
};


module.exports = Page;