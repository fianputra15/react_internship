import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/bottom-navigation/SimpleBottomNavigation').default,
    title: 'Simple Bottom Navigation',
    docs: 'https://material-ui.com/api/bottom-navigation/'
  },
  {
    js: require('../../utils/demos/bottom-navigation/LabelBottomNavigation').default,
    title: 'Label Bottom Navigation',
    docs: 'https://material-ui.com/api/bottom-navigation/'
  }
]

const BottomNavigation = () => (
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

export default BottomNavigation;
