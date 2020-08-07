import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/snackbars/SimpleSnackbar').default,
    title: 'Simple Snackbar',
    docs: 'https://material-ui.com/api/snackbar/'
  },
  {
    js: require('../../utils/demos/snackbars/LongTextSnackbar').default,
    title: 'Long Text Snackbar',
    docs: 'https://material-ui.com/api/snackbar/'
  },
  {
    js: require('../../utils/demos/snackbars/PositionedSnackbar').default,
    title: 'Positioned Snackbar',
    docs: 'https://material-ui.com/api/snackbar/'
  },
  {
    js: require('../../utils/demos/snackbars/DirectionSnackbar').default,
    title: 'Direction Snackbar',
    docs: 'https://material-ui.com/api/snackbar/'
  },
  {
    js: require('../../utils/demos/snackbars/FadeSnackbar').default,
    title: 'Fade Snackbar',
    docs: 'https://material-ui.com/api/snackbar/'
  },
  {
    js: require('../../utils/demos/snackbars/FabIntegrationSnackbar').default,
    title: 'Fab Integration Snackbar',
    docs: 'https://material-ui.com/api/snackbar/'
  },
  {
    js: require('../../utils/demos/snackbars/ConsecutiveSnackbars').default,
    title: 'Consecutive Snackbar',
    docs: 'https://material-ui.com/api/snackbar/'
  },
  {
    js: require('../../utils/demos/snackbars/CustomizedSnackbars').default,
    title: 'Customized Snackbar',
    docs: 'https://material-ui.com/api/snackbar/'
  }
]

const SnackBars = () => (
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

export default SnackBars;
