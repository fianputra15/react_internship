import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/buttons/TextButtons').default,
    title: 'Text Buttons',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/OutlinedButtons').default,
    title: 'Outlined Buttons',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/ContainedButtons').default,
    title: 'Contained Buttons',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/FloatingActionButtons').default,
    title: 'Floating Action Buttons',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/FloatingActionButtonZoom').default,
    title: 'Floating Action Buttons Zoom',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/ButtonSizes').default,
    title: 'Button Sizes',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/IconButtons').default,
    title: 'Icon Buttons',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/IconLabelButtons').default,
    title: 'Icon Label Buttons',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/CustomizedButtons').default,
    title: 'Customized Buttons',
    docs: 'https://material-ui.com/api/button/'
  },
  {
    js: require('../../utils/demos/buttons/ButtonBases').default,
    title: 'Button Bases',
    docs: 'https://material-ui.com/api/button/'
  }
]

const Buttons = () => (
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

export default Buttons;
