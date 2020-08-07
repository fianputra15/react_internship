import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/menus/SimpleMenu').default,
    title: 'Simple Menu',
    docs: 'https://material-ui.com/api/menu/'
  },
  {
    js: require('../../utils/demos/menus/SimpleListMenu').default,
    title: 'Simple List Menu',
    docs: 'https://material-ui.com/api/menu/'
  },
  {
    js: require('../../utils/demos/menus/LongMenu').default,
    title: 'Long Menu',
    docs: 'https://material-ui.com/api/menu/'
  },
  {
    js: require('../../utils/demos/menus/MenuListComposition').default,
    title: 'Menu List Composition',
    docs: 'https://material-ui.com/api/menu/'
  },
  {
    js: require('../../utils/demos/menus/ListItemComposition').default,
    title: 'List Item Composition',
    docs: 'https://material-ui.com/api/menu/'
  },
  {
    js: require('../../utils/demos/menus/FadeMenu').default,
    title: 'Fade Menu',
    docs: 'https://material-ui.com/api/menu/'
  }
]

const Menus = () => (
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

export default Menus;
