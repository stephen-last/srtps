
var srtps = require('./dist/srtps')

var svg = '<svg><rect width=\'4\' height=\'28\' x=\'10\' y=\'10\' /></svg>'
var path = srtps.rectsToPath(svg)

console.log(path) // M 10.000 10.000  L 14.000 10.000  L 14.000 38.000  L 10.000 38.000  Z
