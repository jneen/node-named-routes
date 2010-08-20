var Route = require('./../lib/grout')

module.exports = {
  "it's a function": function(assert) {
    assert.ok(typeof Route === 'function');
  },
  "basic route": function(assert) {
    var route = new Route('/foo');
    assert.equal('/foo', route.template)
    assert.equal('/foo', route.path())
  },
  "route with variables": function(assert) {
    var route = new Route('/foo/:bar/baz/:zot')
    assert.equal('/foo/zwibble/baz/42', route.path('zwibble', 42))
  },
  "route with a url": function(assert) {
    Route.home('http://www.example.com/')
    var route = new Route('foo/:bar')
    assert.equal('http://www.example.com/foo/3', route.url(3))
  },
  "route with variables, with object syntax": function(assert) {
    var route = new Route('/fizz/:buzz/:beez')
    assert.equal('/fizz/1/2', route.path({buzz:1,beez:2}))
    assert.equal('/fizz/1/2', route.path(1, {beez:2}))
  }

}
