const fs = require('fs');
const path = require('path');

const kitImagesDir = path.join(__dirname, '../public/kit images');
const kitsImagesDir = path.join(__dirname, '../public/kitsimages');

let kitImagesFiles = [];
let kitsImagesFiles = [];

if (fs.existsSync(kitImagesDir)) {
  kitImagesFiles = fs.readdirSync(kitImagesDir).filter(file => /\.(png|jpg|jpeg|webp|svg)$/i.test(file));
}

if (fs.existsSync(kitsImagesDir)) {
  kitsImagesFiles = fs.readdirSync(kitsImagesDir).filter(file => /\.(png|jpg|jpeg|webp|svg)$/i.test(file));
}

const content = `// This file is auto-generated at build time. Do not edit manually.
export const KIT_IMAGES_FILES = ${JSON.stringify(kitImagesFiles, null, 2)};
export const KITSIMAGES_FILES = ${JSON.stringify(kitsImagesFiles, null, 2)};
`;

const outputPath = path.join(__dirname, '../src/lib/generatedImageMap.ts');
fs.writeFileSync(outputPath, content, 'utf8');
console.log('Successfully generated src/lib/generatedImageMap.ts');
