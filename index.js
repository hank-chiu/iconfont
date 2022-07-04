const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const fs = require('fs');
const fontStream = new SVGIcons2SVGFontStream({
  fontName: 'gofreight',
});

// Setting the font destination
fontStream
  .pipe(fs.createWriteStream('icon.svg'))
  .on('finish', function () {
    console.log('Font successfully created!');

  })
  .on('error', function (err) {
    console.log(err);
  });

// Writing glyphs
const glyph1 = fs.createReadStream('icons/copy_to.svg');
glyph1.metadata = {
  unicode: ['copy_to'],
  name: 'copy_to',
};
fontStream.write(glyph1);


// Do not forget to end the stream
fontStream.end();