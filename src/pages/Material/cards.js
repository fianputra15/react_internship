import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/cards/SimpleCard').default,
    title: 'Simple Card',
    docs: 'https://material-ui.com/api/card/'
  },
  {
    js: require('../../utils/demos/cards/MediaCard').default,
    title: 'Simple Media Card',
    docs: 'https://material-ui.com/api/card/'
  },
  {
    js: require('../../utils/demos/cards/MediaControlCard').default,
    title: 'Media Control Card',
    docs: 'https://material-ui.com/api/card/'
  },
  {
    js: require('../../utils/demos/cards/RecipeReviewCard').default,
    title: 'Recipe Review Card',
    docs: 'https://material-ui.com/api/card/'
  }
]

const Cards = () => (
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

export default Cards;
