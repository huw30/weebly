function Route(){};

Route.prototype.set = function(id, action) {
  if (!id && !action) {
    location.hash = '';
  } else if (!id) {
    location.hash = '#' + action;
  } else {
    location.hash = '#' + action + '/' + id;
  }
}

Route.prototype.getId = function() {
  var url = window.location.hash.substr(1);
  var id = url.split('/')[1];
  return id;
}

module.exports = Route;