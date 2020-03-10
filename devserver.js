const fs = require('fs');
const path = require('path');
const express = require('express');
const babel = require('@babel/core');

const app = express();

const removeExtension = (str) => str
  .split('.')
  .filter((x, i, arr) => i < arr.length -1)
  .join('');

const INDEX = fs.readFileSync('index.html', 'utf8');

const fileMap = {};

app.use('/lib', (req, res) => {
  const x = removeExtension(req.path);
  
  if (!fileMap[x]) {
    const attempts = [
      path.resolve(`src${x}.ts`),
      path.resolve(`src${x}.tsx`),
    ];
    const target = attempts.find((target) => {
      try {
        fs.lstatSync(target);
        return true;
      } catch (e) {
        return false;
      }
    });
    fileMap[x] = target || '404';
    // console.log(`${x} : ${fileMap[x]}`);
  }

  const target = fileMap[x];

  if (target === '404') {
    console.error(`Failed to load ${x}`);
    return res.status(404).send('file not found');
  }

  const raw = fs.readFileSync(target, 'utf8');
  return babel.transform(raw, {
    filename: target,
    sourceMaps: 'inline',
  }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
      return;
    }
    res.set('Content-Type', 'text/javascript');
    res.send(result.code);
  })
});

app.use(express.static('.'));

app.use((req, res) => {
  // res.sendFile(path.resolve('./index.html'));
  if (process.env.BROWSER_REFRESH_URL) {
    res.send(INDEX.replace('</body>', `<script src="${process.env.BROWSER_REFRESH_URL}"></script></body>`));
  }
});

app.listen(8080, () => {
  console.log('listening on http://localhost:8080');
  if (process.send) {
    process.send({
      event: 'online',
      url: 'http://localhost:8080'
    });
  }
});
