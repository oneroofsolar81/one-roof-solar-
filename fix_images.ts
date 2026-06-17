import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let replaced = false;

  // Replace `<img ` with `<img referrerPolicy="no-referrer" `
  let newContent = content.replace(/<img(?!\s*referrerPolicy="no-referrer")/g, '<img referrerPolicy="no-referrer"');
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    replaced = true;
    console.log(`Updated ${filePath}`);
  }
}

function processDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

processDir('./src');
