/*
Page model. Handles all ajax calls to backend

newPage: create a new page, send with page name
and returns the page object

edit: edit the page's name

getAll: get all pages that is in the database (if auth is seted up, need to send with user id)

deleteElement: delete an page with id
*/

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