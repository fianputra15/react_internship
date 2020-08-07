import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/chips/Chips').default,
    title: 'Chips',
    docs: 'https://material-ui.com/api/chip/'
  },
  {
    js: require('../../utils/demos/chips/ChipsArray').default,
    title: 'Chips Array',
    docs: 'https://material-ui.com/api/chip/'
  }
]

const Chips = () => (
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

export default Chips;
