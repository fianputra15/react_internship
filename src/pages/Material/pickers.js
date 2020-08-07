import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/pickers/DatePickers').default,
    title: 'Date Pickers',
    docs: 'https://material-ui.com/demos/pickers/'
  },
  {
    js: require('../../utils/demos/pickers/TimePickers').default,
    title: 'Time Pickers',
    docs: 'https://material-ui.com/demos/pickers/'
  },
  {
    js: require('../../utils/demos/pickers/DateAndTimePickers').default,
    title: 'Date And Time Pickers',
    docs: 'https://material-ui.com/demos/pickers/'
  }
]

const Pickers = () => (
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

export default Pickers;
