'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rectsToPath = rectsToPath;

var _xmldom = require('xmldom');

var _xmldom2 = _interopRequireDefault(_xmldom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * the maths bit (https://github.com/mailzwj/sstp)
 */
function getPoints(x, y, w, h, deg) {
  var c = { x: x + w / 2, y: y + h / 2 };
  var points = [];
  var r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
  deg = deg * Math.PI / 180;
  var deg1 = Math.PI - Math.acos(w / 2 / r) - parseFloat(deg);
  var deg2 = Math.acos(w / 2 / r) - parseFloat(deg);
  var deg3 = -Math.acos(w / 2 / r) - parseFloat(deg);
  var deg4 = Math.PI + Math.acos(w / 2 / r) - parseFloat(deg);
  points.push({
    x: c.x + r * Math.cos(deg1),
    y: c.y - r * Math.sin(deg1)
  });
  points.push({
    x: c.x + r * Math.cos(deg2),
    y: c.y - r * Math.sin(deg2)
  });
  points.push({
    x: c.x + r * Math.cos(deg3),
    y: c.y - r * Math.sin(deg3)
  });
  points.push({
    x: c.x + r * Math.cos(deg4),
    y: c.y - r * Math.sin(deg4)
  });
  return points;
}

/**
 * rect node values
 */
function getRectNodeValues(rects) {
  var len = rects.length;
  var nodes = [];
  for (var i = 0; i < len; i++) {
    var node = rects.item(i);
    nodes.push({
      x: parseFloat(node.getAttribute('x')),
      y: parseFloat(node.getAttribute('y')),
      w: parseFloat(node.getAttribute('width')),
      h: parseFloat(node.getAttribute('height'))
    });
  }
  return nodes;
}

/**
 * rect path strings
 */
function getRectPaths(rects) {
  if (rects.length < 1) {
    return;
  }
  var nodes = getRectNodeValues(rects);
  var paths = nodes.map(function (node) {
    var points = getPoints(node.x, node.y, node.w, node.h, 0);
    var moveTo = 'M ' + points[0].x.toFixed(3) + ' ' + points[0].y.toFixed(3) + ' ';
    var lineTo1 = 'L ' + points[1].x.toFixed(3) + ' ' + points[1].y.toFixed(3) + ' ';
    var lineTo2 = 'L ' + points[2].x.toFixed(3) + ' ' + points[2].y.toFixed(3) + ' ';
    var lineTo3 = 'L ' + points[3].x.toFixed(3) + ' ' + points[3].y.toFixed(3) + ' ';
    return moveTo + ' ' + lineTo1 + ' ' + lineTo2 + ' ' + lineTo3;
  });
  return paths.join('') + ' Z';
}

/**
 * rects converted to string paths (exported/public)
 */
function rectsToPath(svgString) {
  var doc = new _xmldom2.default.DOMParser().parseFromString(svgString, 'text/xml');
  var svg = doc.getElementsByTagName('svg')[0];
  var rects = svg.getElementsByTagName('rect');
  return getRectPaths(rects);
}

exports.default = { rectsToPath: rectsToPath };
