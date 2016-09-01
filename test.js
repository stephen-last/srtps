
var fs = require('fs')
var bardcode = require('bardcode')
var PDFKit = require('pdfkit')

var srtps = require('./dist/srtps')

/**
 * multiplier for converting mm to 72 ppi (72 / 25.4) (1 inch = 25.4 mm)
 * pdf kit creates pdf docs at 72 ppi
 */
function mm (num) {
  var multiplier = 2.834645669291339
  return num * multiplier
}

/**
 * generate svg and convert all 'rects' to a path
 */
function svgPath (str, h) {
  var options = {
    type: 'Code 128', // barcode type. others: Codabar, Code 39, EAN-8, EAN-13, FIM, ITF (interleaved 2 of 5), and UPC-A
    moduleWidth: 1.5, // width of thinnest bar. defaults to 2.892.
    height: mm(h),    // barcode height. defaults to 90.72.
    quietZoneSize: 0  // number of moduleWidths in quiet zone on either side. defaults to 10.
  }
  var svg = bardcode.drawBarcode('svg', str, options)
  var path = srtps.rectsToPath(svg)
  return path
}

/**
 * write a barcode to the pdf doc
 */
function barcode (pdf, barcode, h, x, y) {
  pdf.save()
  pdf.translate(mm(x), mm(y))
  pdf.path(svgPath(barcode, h)).fill('#000')
  pdf.text(barcode, mm(0), (mm(h) + mm(2)), { align: 'left' })
  pdf.restore()
}

// generate pdf
var pdf = new PDFKit()
pdf.pipe(fs.createWriteStream('./barcodes.pdf'))
barcode(pdf, '12345', 10, 10, 10)
barcode(pdf, '3946', 10, 10, 30)
barcode(pdf, 'hello', 10, 10, 50)
barcode(pdf, 'scan-me', 10, 10, 70)
barcode(pdf, '.PL46521', 10, 10, 90)
pdf.end()
