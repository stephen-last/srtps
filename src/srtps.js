
import dom from 'xmldom'

/**
 * the maths bit (https://github.com/mailzwj/sstp)
 */
function getPoints (x, y, w, h) {
  const c = { x: x + w / 2, y: y + h / 2 }
  const r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2
  const deg1 = Math.PI - Math.acos((w / 2) / r)
  const deg2 = Math.acos((w / 2) / r)
  const deg3 = -Math.acos((w / 2) / r)
  const deg4 = Math.PI + Math.acos((w / 2) / r)
  return [
    { x: c.x + r * Math.cos(deg1), y: c.y - r * Math.sin(deg1) },
    { x: c.x + r * Math.cos(deg2), y: c.y - r * Math.sin(deg2) },
    { x: c.x + r * Math.cos(deg3), y: c.y - r * Math.sin(deg3) },
    { x: c.x + r * Math.cos(deg4), y: c.y - r * Math.sin(deg4) }
  ]
}

/**
 * rect node values
 */
function getRectNodeValues (rects) {
  const len = rects.length
  const nodes = []
  for (let i = 0; i < len; i++) {
    const node = rects.item(i)
    nodes.push({
      x: parseFloat(node.getAttribute('x')),
      y: parseFloat(node.getAttribute('y')),
      w: parseFloat(node.getAttribute('width')),
      h: parseFloat(node.getAttribute('height'))
    })
  }
  return nodes
}

/**
 * rect path strings
 */
function getRectPaths (rects) {
  if (rects.length < 1) { return }
  const nodes = getRectNodeValues(rects)
  const paths = nodes.map(node => {
    const points = getPoints(node.x, node.y, node.w, node.h)
    const moveTo = `M ${ points[0].x.toFixed(3) } ${ points[0].y.toFixed(3) }`
    const lineTo1 = `L ${ points[1].x.toFixed(3) } ${ points[1].y.toFixed(3) }`
    const lineTo2 = `L ${ points[2].x.toFixed(3) } ${ points[2].y.toFixed(3) }`
    const lineTo3 = `L ${ points[3].x.toFixed(3) } ${ points[3].y.toFixed(3) }`
    return `${moveTo} ${lineTo1} ${lineTo2} ${lineTo3}`
  })
  return `${ paths.join('') } Z`
}

/**
 * rects converted to string paths (public)
 */
export function rectsToPath (svgString) {
  const doc = new dom.DOMParser().parseFromString(svgString, 'text/xml')
  const svg = doc.getElementsByTagName('svg')[0]
  const rects = svg.getElementsByTagName('rect')
  return getRectPaths(rects)
}

export default { rectsToPath }
