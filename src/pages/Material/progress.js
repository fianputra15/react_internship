import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/progress/CircularIndeterminate').default,
    title: 'Circular Indeterminate',
    docs: 'https://material-ui.com/demos/progress/'
  },
  {
    js: require('../../utils/demos/progress/CircularIntegration').default,
    title: 'Circular Integration',
    docs: 'https://material-ui.com/demos/progress/'
  },
  {
    js: require('../../utils/demos/progress/CircularDeterminate').default,
    title: 'Circular Determinate',
    docs: 'https://material-ui.com/demos/progress/'
  },
  {
    js: require('../../utils/demos/progress/CircularStatic').default,
    title: 'Circular Static',
    docs: 'https://material-ui.com/demos/progress/'
  },
  {
    js: require('../../utils/demos/progress/LinearIndeterminate').default,
    title: 'Linear Indeterminate',
    docs: 'https://material-ui.com/demos/progress/'
  },
  {
    js: require('../../utils/demos/progress/LinearDeterminate').default,
    title: 'Linear Determinate',
    docs: 'https://material-ui.com/demos/progress/'
  },
  {
    js: require('../../utils/demos/progress/LinearBuffer').default,
    title: 'Linear Buffer',
    docs: 'https://material-ui.com/demos/progress/'
  },
  {
    js: require('../../utils/demos/progress/LinearQuery').default,
    title: 'Linear Query',
    docs: 'https://material-ui.com/demos/progress/'
  },
  {
    js: require('../../utils/demos/progress/DelayingAppearance').default,
    title: 'Delaying Appearance',
    docs: 'https://material-ui.com/demos/progress/'
  }
]

const Progress = () => (
  <Wrapper>
    {demos.map((demo, index) => (
      <Example
        key={index}
        index={index}
        title={demo.title}
        js={demo.js}
        docs={demo.docs}
      />
    ))}
  </Wrapper>
);

export default Progress;
