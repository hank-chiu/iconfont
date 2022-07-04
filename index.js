const FontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const fs = require('fs');

const fontStream = new FontStream({
  fontName: 'gofreight',
  fontHeight: 1000,
  normalize: true,
});

const fontSvg = 'icon.svg';
const fontTtf = 'icon.ttf';
const svgSource = 'icons';

// Setting the font destination
fontStream
  .pipe(fs.createWriteStream(fontSvg))
  .on('finish', function () {
    const ttf = svg2ttf(fs.readFileSync(fontSvg, 'utf8', {}));
    fs.writeFileSync(fontTtf, Buffer.from(ttf.buffer));
    console.log('Font successfully created!');
  })
  .on('error', function (err) {
    console.log(err);
  });

const sources = fs.readdirSync(svgSource);

// Writing glyphs
sources.forEach((svgFile) => {
  const name = svgFile.split('.')[0];
  const glyph = fs.createReadStream(`${svgSource}/${svgFile}`);
  glyph.metadata = {
    unicode: [name],
    name,
  };
  fontStream.write(glyph);
  console.log('write glyph:', svgFile)
});


// Do not forget to end the stream
fontStream.end();
