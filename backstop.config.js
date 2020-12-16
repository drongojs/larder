const glob = require('glob');
const fs = require('fs');

// I can't be bothered to write a scenario for every single story so lets just grep for all stories
const files = glob.sync('src/ui/**/*.backstop.tsx');

const viewports = [
  {
    label: 'phone',
    width: 320,
    height: 480,
  },
  {
    label: 'desktop',
    width: 1280,
    height: 768,
  },
];

const scenarios = files.reduce((acc, file) => {
  const scenarios = [];
  const title = file
    .match(/src\/ui\/(.+)\//)[1]
    .replace(/[\\/ ]/g, '-')
    .toLowerCase();
  let src = fs.readFileSync(file, 'utf8');
  let match = src.match(/export const (.*?) = /);
  
  
  while (match) {
    src = src.replace(match[0], '');
    const story = match[1].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const id = `${title}--${story}`;

    const scenario = {
      label: id,
      url: `http://localhost:6006/iframe.html?id=${encodeURIComponent(id)}`,
      mergeImgHack: true,
    };

    scenarios.push(scenario);

    match = src.match(/export const (.*?) = /);
  }

  return acc.concat(scenarios);
}, []);

console.log(`Found ${files.length} files`);
console.log(`Found ${scenarios.length} scenarios`);

scenarios.forEach(x => console.log(x.url));

module.exports = {
  id: 'backstop_default',
  viewports,
  scenarios,
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report',
  },
  report: [ 'browser' ],
  engine: 'puppeteer',
  engineOptions: {
    args: [ '--no-sandbox' ],
    // headless: false,
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};
