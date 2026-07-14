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

// Map budget category subfolders to avoid runtime fs/readdir calls
const budgetFolders = ["0-250", "250-500", "500-1000", "1000-2500", "2500-5000", "5000+"];
const budgetImagesMap = {};

for (const folder of budgetFolders) {
  const dirPath = path.join(__dirname, '../public', folder);
  if (fs.existsSync(dirPath)) {
    budgetImagesMap[folder] = fs.readdirSync(dirPath).filter(file => /\.(png|jpg|jpeg|webp|svg|avif)$/i.test(file));
  } else {
    budgetImagesMap[folder] = [];
  }
}

const content = `// This file is auto-generated at build time. Do not edit manually.
export const KIT_IMAGES_FILES: string[] = ${JSON.stringify(kitImagesFiles, null, 2)};
export const KITSIMAGES_FILES: string[] = ${JSON.stringify(kitsImagesFiles, null, 2)};
export const BUDGET_IMAGES_MAP: Record<string, string[]> = ${JSON.stringify(budgetImagesMap, null, 2)};
`;

const outputPath = path.join(__dirname, '../src/lib/generatedImageMap.ts');
fs.writeFileSync(outputPath, content, 'utf8');
console.log('Successfully generated src/lib/generatedImageMap.ts');
