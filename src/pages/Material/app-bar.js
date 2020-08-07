import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    title: 'Simple App Bar',
    js: require('../../utils/demos/app-bar/SimpleAppBar').default,
    docs: 'https://material-ui.com/api/app-bar/'
  },
  {
    title: 'Button App Bar',
    js: require('../../utils/demos/app-bar/ButtonAppBar').default,
    docs: 'https://material-ui.com/api/app-bar/'
  },
  {
    title: 'Menu App Bar',
    js: require('../../utils/demos/app-bar/MenuAppBar').default,
    docs: 'https://material-ui.com/api/app-bar/'
  }
];

const AppBar = () => (
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

export default AppBar;
