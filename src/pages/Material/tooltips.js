import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/tooltips/SimpleTooltips').default,
    title: 'Simple Tooltips',
    docs: 'https://material-ui.com/api/tooltip/'
  },
  {
    js: require('../../utils/demos/tooltips/PositionedTooltips').default,
    title: 'Positioned Tooltips',
    docs: 'https://material-ui.com/api/tooltip/'
  },
  {
    js: require('../../utils/demos/tooltips/ControlledTooltips').default,
    title: 'Controlled Tooltips',
    docs: 'https://material-ui.com/api/tooltip/'
  }
]

const Tooltips = () => (
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

export default Tooltips;
