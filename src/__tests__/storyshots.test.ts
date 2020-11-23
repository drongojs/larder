/* global process */
import init, { renderOnly } from '@storybook/addon-storyshots';

if (process.env.STORY_MODE) {
  init({
    test: renderOnly,
  });
}

test('storyshots', () => {});
