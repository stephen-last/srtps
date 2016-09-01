
# SVG rects to path string (srtps)

Convert SVG `rects` to a single path string.

## Motivation

I needed to generate PDF documents for printing onto labels media. Some of the labels need barcodes, and I wanted everything to be vector, no bitmaps. I decided to use [PDF Kit](http://pdfkit.org/docs/vector.html#svg_paths) which can use SVG path strings to draw vector shapes. So I needed a way to generate an SVG barcode and get an SVG path string to feed to `.path()`.

## API

```javascript
import srtps from './dist/srtps'
const svg = `<svg><rect width='4' height='28' x='10' y='10' /></svg>`
const path = srtps.rectsToPath(svg)
console.log('path =', path)
```

## Credits

- Borrowed some maths from [sstp](https://github.com/mailzwj/sstp)

## Test uses

- [Bardcode](https://github.com/froatsnook/bardcode) (Draw 1-D barcodes)
- [PDFKit](https://github.com/devongovett/pdfkit) (A JavaScript PDF generation library for Node and the browser)
