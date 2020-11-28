const glob = require('glob');
const fs = require('fs');

// I can't be bothered to write a scenario for every single story so lets just grep for all stories
const files = glob.sync('src/ui/{modules,screens}/**/__stories__/**.stories.tsx');
const scenarios = files.reduce((acc, file) => {
  // to work out the url path to each story we need to examine both the default export
  // and then each exported constant from the story file
  // so something like this
  /*
  export default { title: 'screens/home' };

  export const myStory = ...
  */
  // becomes something like "screens-home--my-story"
  let content = fs.readFileSync(file, 'utf8');
  const title = content.match(/title: '(.*?)'/)[1].replace(/\//g, '-');
  let match = content.match(/export const (.*?) = /);
  const scenarios = [];

  while (match) {
    content = content.replace(match[0], '');
    const story = match[1].replace(/([a-z])([A-Z])/g, '$1-$2');
    const id = `${title}--${story}`.toLowerCase();

    const scenario = {
      label: id,
      url: `http://localhost:6006/iframe.html?id=${encodeURIComponent(id)}`,
      delay: 1000,
      // misMatchThreshold: 1,
      requireSameDimensions: false,
    };

    scenarios.push(scenario);

    match = content.match(/export const (.*?) = /);
  }



  return acc.concat(scenarios);
}, []);

console.log(`Found ${scenarios.length} scenarios`);

module.exports = {
  id: 'backstop_default',
  viewports: [
    {
      label: 'phone',
      width: 320,
      height: 480,
    },
  ],
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
