const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'www');

const COPY_DIRS = ['en', 'ar', 'ku', 'albums', 'content', 'images'];
const COPY_FILES = ['styles.css'];
const EXCLUDE_DIRS = new Set(['admin', 'node_modules', 'www', 'android', 'ios', 'scripts']);

const ENTRY_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0; url=/en/index.html" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Karosh Group</title>
  <script>location.replace('/en/index.html');</script>
</head>
<body></body>
</html>
`;

const MOBILE_SCRIPT = `<script src="/js/mobile.js"></script>`;

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) rmDir(target);
    else fs.unlinkSync(target);
  }
  fs.rmdirSync(dir);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function walkHtml(dir, callback) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(target, callback);
    else if (entry.name.endsWith('.html')) callback(target);
  }
}

function injectMobileScript(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  if (html.includes('/js/mobile.js')) return;

  if (html.includes('</body>')) {
    html = html.replace('</body>', `${MOBILE_SCRIPT}\n</body>`);
  } else {
    html += `\n${MOBILE_SCRIPT}\n`;
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

function main() {
  console.log('Building www/ for Capacitor...');

  if (fs.existsSync(OUT)) rmDir(OUT);
  fs.mkdirSync(OUT, { recursive: true });

  for (const dir of COPY_DIRS) {
    const src = path.join(ROOT, dir);
    if (!fs.existsSync(src)) {
      console.warn(`Skipping missing directory: ${dir}`);
      continue;
    }
    copyDir(src, path.join(OUT, dir));
    console.log(`Copied ${dir}/`);
  }

  for (const file of COPY_FILES) {
    const src = path.join(ROOT, file);
    if (!fs.existsSync(src)) {
      console.warn(`Skipping missing file: ${file}`);
      continue;
    }
    fs.copyFileSync(src, path.join(OUT, file));
    console.log(`Copied ${file}`);
  }

  const assetsSrc = path.join(ROOT, 'assets');
  if (fs.existsSync(assetsSrc)) {
    copyDir(assetsSrc, path.join(OUT, 'assets'));
    console.log('Copied assets/');
  }

  const jsSrc = path.join(ROOT, 'js');
  if (fs.existsSync(jsSrc)) {
    copyDir(jsSrc, path.join(OUT, 'js'));
    console.log('Copied js/');
  }

  fs.writeFileSync(path.join(OUT, 'index.html'), ENTRY_HTML, 'utf8');
  console.log('Created www/index.html entry redirect');

  walkHtml(OUT, (filePath) => {
    if (path.basename(filePath) === 'index.html' && path.dirname(filePath) === OUT) return;
    injectMobileScript(filePath);
  });
  console.log('Injected mobile.js into HTML pages');
  console.log('Done.');
}

main();