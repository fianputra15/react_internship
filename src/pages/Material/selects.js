import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/selects/SimpleSelect').default,
    title: 'Simple Select',
    docs: 'https://material-ui.com/demos/selects/'
  },
  {
    js: require('../../utils/demos/selects/NativeSelects').default,
    title: 'Native Selects',
    docs: 'https://material-ui.com/demos/selects/'
  },
  {
    js: require('../../utils/demos/selects/MultipleSelect').default,
    title: 'Multiple Select',
    docs: 'https://material-ui.com/demos/selects/'
  },
  {
    js: require('../../utils/demos/selects/DialogSelect').default,
    title: 'Dialog Select',
    docs: 'https://material-ui.com/demos/selects/'
  },
  {
    js: require('../../utils/demos/selects/ControlledOpenSelect').default,
    title: 'Controlled Open Select',
    docs: 'https://material-ui.com/demos/selects/'
  }
]

const Selects = () => (
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

export default Selects;
