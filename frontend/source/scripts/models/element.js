/*
Element model. Handles all ajax calls to backend

newElement: create a new element, send with type and page that it belongs to 
and returns the element object

edit: edit the element's content, for text and title element.

rearrange: this is called anytime there's a change to the element: drag below or above, 
delete and insert new.

getAll: get all elements of one page

deleteElement: delete an element with id
*/
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
  updateHeight: function(id, payload) {
    var deferred = vow.defer();
    $.ajax({
      type: "POST",
      url: '/element/height/'+id,
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
  updateWidth: function(id, payload) {
    var deferred = vow.defer();
    $.ajax({
      type: "POST",
      url: '/element/width/'+id,
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