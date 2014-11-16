var vow = require('vow');

var Element = {
  newElement: function(payload) {
    var deferred = vow.defer();
    $.post('/element/new', payload, function(data) {
      deferred.resolve(data);
    }).fail(function(err) {
      deferred.reject(err);
    });
    return deferred.promise();
  },
  edit: function(id, payload) {
    var deferred = vow.defer();
    $.ajax({
      type: "PUT",
      url: '/element/'+id,
      contentType: "application/json",
      data: payload,
      success: function() {
        deferred.resolve();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        deferred.reject(errorThrown);
      }
    });
    return deferred.promise();
  },
  rearrange: function(array) {
    var deferred = vow.defer();
    var payload = {
      elements: array
    }
    $.post('/elements', payload, function(data) {
      deferred.resolve(data);
    }).fail(function(err) {
      deferred.reject(err);
    });
    return deferred.promise();
  },
  getAll: function(id) {
    var deferred = vow.defer();
    $.getJSON('/elements/'+id, function(data) {
      deferred.resolve(data);
    }).fail(function(err) {
      deferred.reject(err);
    });
    return deferred.promise();
  },
  deleteElement: function(id) {
    var deferred = vow.defer();
    $.ajax({
      url: '/element/'+id,
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

module.exports = Element;