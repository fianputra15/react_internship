import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/drawers/TemporaryDrawer').default,
    title: 'Temporary Drawer',
    docs: 'https://material-ui.com/api/drawer/'
  },
  {
    js: require('../../utils/demos/drawers/SwipeableTemporaryDrawer').default,
    title: 'Swipeable Temporary Drawer',
    docs: 'https://material-ui.com/api/drawer/'
  },
  {
    js: require('../../utils/demos/drawers/PermanentDrawer').default,
    title: 'Permanent Drawer',
    docs: 'https://material-ui.com/api/drawer/'
  },
  {
    js: require('../../utils/demos/drawers/PersistentDrawer').default,
    title: 'Persistent Drawer',
    docs: 'https://material-ui.com/api/drawer/'
  },
  {
    js: require('../../utils/demos/drawers/MiniDrawer').default,
    title: 'Mini Drawer',
    docs: 'https://material-ui.com/api/drawer/'
  },
  {
    js: require('../../utils/demos/drawers/ResponsiveDrawer').default,
    title: 'Responsive Drawer',
    docs: 'https://material-ui.com/api/drawer/'
  },
  {
    js: require('../../utils/demos/drawers/ClippedDrawer').default,
    title: 'Clipped Drawer',
    docs: 'https://material-ui.com/api/drawer/'
  }
]

const Drawers = () => (
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

export default Drawers;
