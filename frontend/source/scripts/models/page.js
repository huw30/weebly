var vow = require('vow');

var Page = {
  newPage: function(payload) {
    var deferred = vow.defer();
    $.post('/page/new', payload, function(data) {
      deferred.resolve(data);
    }).fail(function(err) {
      deferred.reject(err);
    });
    return deferred.promise();
  },
  edit: function(id, payload) {
    var deferred = vow.defer();
    $.post('/page/'+id, payload, function(data) {
      deferred.resolve(data);
    }).fail(function(err) {
      deferred.reject(err);
    });
    return deferred.promise();
  },
  getOne: function(id) {
    var deferred = vow.defer();
    $.getJSON('/page/' + id, function(data) {
      deferred.resolve(data);
    }).fail(function(err) {
      deferred.reject(err);
    });
    return deferred.promise();
  },
  getAll: function() {
    var deferred = vow.defer();
    $.getJSON('/pages', function(data) {
      deferred.resolve(data);
    }).fail(function(err) {
      deferred.reject(err);
    });
    return deferred.promise();
  },
  deletePage: function(id) {
    var deferred = vow.defer();
    $.ajax({
      url: '/page/'+ id,
      type: 'DELETE',
      success: function() {
        deferred.resolve();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        deferred.reject(errorThrown);
      }
    });
    return deferred.promise();
  }
};

module.exports = Page;