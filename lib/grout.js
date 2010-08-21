var querystring = require('querystring')


var pathRegex = /:(\w+)|(\*)/g

var getHome = function(route) {
  if(route.home) { return route.home }
  return Route.home
}

var Route = function(template) {
  this.template = template
}

Route.prototype = {
  path: function() {
    //hack to get arguments as a legit Array
    var params = Array.prototype.slice.call(arguments),
        i = 0,
        keys = (typeof params[params.length - 1] === 'object')
          ? params.pop()
          : {}

    var path = this.template.replace(pathRegex, function(_, key) {
      if (keys[key]) {
        var ret = keys[key]
        delete keys[key]
        return ret;
      }
      else {
        return params[i++]
      }
    })

    var query = querystring.encode(keys)

    return query
      ? path + '?' + query
      : path
  },
  url: function() {
    return getHome(this) + this.path.apply(this, arguments)
  }
}

Route.draw = function(home, map) {
  var routes = {}
  for(name in map) { if (map.hasOwnProperty(name)) {
    routes[name] = new Route(map[name])
    routes[name].home = home
  } }
  return routes
}

module.exports = Route;
