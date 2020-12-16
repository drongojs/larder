/* global process */
import init, { renderOnly } from '@storybook/addon-storyshots';

if (process.env.STORY_MODE) {
  global['SKIP_ANIMATIONS'] = true;
  init({
    test: renderOnly,
  });
}

it('storyshots', () => {});
