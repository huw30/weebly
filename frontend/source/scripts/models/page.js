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
  save: function(payload) {
    $.post('/page/edit', payload, function(data) {
      return data;
    }).fail(function(err) {
      console.log(err);
    });
  },
  getOne: function(id) {
    $.getJSON('/page/' + id, function(data) {
      return data;
    }).fail(function(err) {
      console.log(err);
    });
  },
  getAll: function() {
    $.getJSON('/pages', function(data) {
      return data;
    }).fail(function(err) {
      console.log(err);
    });
  }
};

module.exports = Page;


//$.post('script.php', data, function(response) {
    // Do something with the request
// }, 'json');