import { configure, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

const req = require.context('../src/components', true, /\.stories\.js$/);

addParameters({
  options: {
    theme: themes.dark,
  },
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);