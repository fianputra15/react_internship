import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/grid-list/ImageGridList').default,
    title: 'Image Grid List',
    docs: 'https://material-ui.com/api/grid-list/'
  },
  {
    js: require('../../utils/demos/grid-list/TitlebarGridList').default,
    title: 'Titlebar Grid List',
    docs: 'https://material-ui.com/api/grid-list/'
  },
  {
    js: require('../../utils/demos/grid-list/AdvancedGridList').default,
    title: 'Advanced Grid List',
    docs: 'https://material-ui.com/api/grid-list/'
  },
  {
    js: require('../../utils/demos/grid-list/SingleLineGridList').default,
    title: 'Single Line Grid List',
    docs: 'https://material-ui.com/api/grid-list/'
  }
]

const GridList = () => (
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

export default GridList;
