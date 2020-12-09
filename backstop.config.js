const glob = require('glob');
const fs = require('fs');

// I can't be bothered to write a scenario for every single story so lets just grep for all stories
const files = glob.sync('src/ui/**/__stories__/*.backstop.tsx');

console.log(`Found ${files.length} scenarios`);

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
]

const scenarios = files.reduce((acc, file) => {
  const title = file
    .replace(/^src\/ui\//, '')
    .replace(/\/__stories__\/.*/, '')
    .replace(/[\\/]/g, '-')
    .toLowerCase();
  const id = `${title}--backstop`;

  console.log(id);

  const scenario = {
    label: id,
    url: `http://localhost:6006/iframe.html?id=${encodeURIComponent(id)}`,
    mergeImgHack: true,
    selectors: [ 'body' ],
  };
  if (file.includes('Screen')) {
    scenario.viewports = viewports.map(x => ({
      ...x,
      height: 2000,
    }));
  }

  return acc.concat(scenario);
}, []);


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
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};
