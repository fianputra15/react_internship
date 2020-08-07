import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/avatars/ImageAvatars').default,
    title: 'Image Avatars',
    docs: 'https://material-ui.com/api/avatar/'
  },
  {
    js: require('../../utils/demos/avatars/IconAvatars').default,
    title: 'Icon Avatars',
    docs: 'https://material-ui.com/api/avatar/'
  },
  {
    js: require('../../utils/demos/avatars/LetterAvatars').default,
    title: 'Letter Avatars',
    docs: 'https://material-ui.com/api/avatar/'
  }
];

const Avatars = () => (
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

export default Avatars;
