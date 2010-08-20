var sys = require('sys')
var inspect = sys.inspect
var puts = sys.puts

function _pr(fn, proto) {
  fn.prototype = proto
  return fn
}
var Route = (function() {
  var pathRegex = /:(\w+)/g
  return _pr(function(template) {
    this.template = template
  }, {
    path: function() {
      var params = Array.prototype.slice.call(arguments),
          i = 0,
          keys = (typeof params[params.length - 1] === 'object')
            ? params.pop()
            : {}

      return this.template.replace(pathRegex, function(colon, key) {
        if (keys[key]) {
          return keys[key]
        }
        else {
          return params[i++]
        }
      })
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
