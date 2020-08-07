import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/dividers/ListDividers').default,
    title: 'List Dividers',
    docs: 'https://material-ui.com/api/divider/'
  },
  {
    js: require('../../utils/demos/dividers/InsetDividers').default,
    title: 'Inset Dividers',
    docs: 'https://material-ui.com/api/divider/'
  }
]

const Dividers = () => (
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

export default Dividers;
