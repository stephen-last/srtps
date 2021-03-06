
# SVG rects to path string (srtps)

Convert SVG `rects` to a single path string.

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Version](https://img.shields.io/npm/v/srtps.svg)](https://www.npmjs.com/package/srtps)
[![Downloads](https://img.shields.io/npm/dt/srtps.svg)](https://www.npmjs.com/package/srtps)

## Motivation

I needed to generate PDF documents for printing onto labels media. Some of the labels need barcodes, and I wanted everything to be vector, no bitmaps. I decided to use [PDF Kit](http://pdfkit.org/docs/vector.html#svg_paths) which can use SVG path strings to draw vector shapes. So I needed a way to generate an SVG barcode and get an SVG path string to feed to PDF Kit's `.path()` method.

Only one dependency: [xmldom](https://github.com/jindw/xmldom).

## Install

`npm install srtps`

## Usage

### Basic

```javascript
import srtps from 'srtps'

const svg = `<svg><rect width='4' height='28' x='10' y='10' /></svg>`
const path = srtps.rectsToPath(svg)

console.log(path) // M 10.000 10.000  L 14.000 10.000  L 14.000 38.000  L 10.000 38.000  Z
```

### With Bardcode & PDFKit

```javascript
import fs from 'fs'
import bardcode from 'bardcode'
import PDFKit from 'pdfkit'
import srtps from 'srtps'

const svg = bardcode.drawBarcode('svg', '12345', {})
const path = srtps.rectsToPath(svg)

const pdf = new PDFKit()
pdf.pipe(fs.createWriteStream('./barcodes.pdf'))
pdf.path(path).fill('#000')
pdf.end()
```

## Credits

- Borrowed some maths from [sstp](https://github.com/mailzwj/sstp) (hat tip!)

## Test uses

- [Bardcode](https://github.com/froatsnook/bardcode) (Draw 1-D barcodes)
- [PDFKit](https://github.com/devongovett/pdfkit) (A JavaScript PDF generation library for Node and the browser)
