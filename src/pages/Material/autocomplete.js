import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/autocomplete/IntegrationDownshift').default,
    title: 'Downshift',
    docs: 'https://material-ui.com/demos/autocomplete/'
  },
  {
    js: require('../../utils/demos/autocomplete/IntegrationAutosuggest').default,
    title: 'react-autosuggest',
    docs: 'https://material-ui.com/demos/autocomplete/'
  },
  {
    js: require('../../utils/demos/autocomplete/IntegrationReactSelect').default,
    title: 'rect-select',
    docs: 'https://material-ui.com/demos/autocomplete/'
  }
]

const Autocomplete = () => (
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

export default Autocomplete;
