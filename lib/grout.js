var sys = require('sys')
var inspect = sys.inspect
var puts = sys.puts

var querystring = require('querystring')

function _pr(fn, proto) {
  fn.prototype = proto
  return fn
}
var Route = (function() {
  var pathRegex = /:(\w+)|(\*)/g
  return _pr(function(template) {
    this.template = template
  }, {
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
      return Route.home() + this.path.apply(this, arguments)
    }
  })
})()

var home;
Route.home = function() {
  if(arguments.length) {
    return home = arguments[0]
  }
  else {
    return home
  }
}

module.exports = Route;
