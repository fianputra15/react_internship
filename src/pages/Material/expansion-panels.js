import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/expansion-panels/DetailedExpansionPanel').default,
    title: 'Detailed Expansion Panel',
    docs: 'https://material-ui.com/api/expansion-panel/'
  },
  {
    js: require('../../utils/demos/expansion-panels/SimpleExpansionPanel').default,
    title: 'Simple Expansion Panel',
    docs: 'https://material-ui.com/api/expansion-panel/'
  },
  {
    js: require('../../utils/demos/expansion-panels/ControlledExpansionPanels').default,
    title: 'Controlled Expansion Panel',
    docs: 'https://material-ui.com/api/expansion-panel/'
  }
]

const ExpansionPanels = () => (
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

export default ExpansionPanels;
