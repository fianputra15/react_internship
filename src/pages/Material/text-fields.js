import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/text-fields/TextFields').default,
    title: 'Text Fields',
    docs: 'https://material-ui.com/api/text-field/'
  },
  {
    js: require('../../utils/demos/text-fields/ComposedTextField').default,
    title: 'Composed Text Field',
    docs: 'https://material-ui.com/api/text-field/'
  },
  {
    js: require('../../utils/demos/text-fields/TextFieldMargins').default,
    title: 'Text Field Margins',
    docs: 'https://material-ui.com/api/text-field/'
  },
  {
    js: require('../../utils/demos/text-fields/InputAdornments').default,
    title: 'Input Adornments',
    docs: 'https://material-ui.com/api/text-field/'
  },
  {
    js: require('../../utils/demos/text-fields/Inputs').default,
    title: 'Inputs',
    docs: 'https://material-ui.com/api/text-field/'
  },
  {
    js: require('../../utils/demos/text-fields/FormattedInputs').default,
    title: 'Formatted Inputs',
    docs: 'https://material-ui.com/api/text-field/'
  },
  {
    js: require('../../utils/demos/text-fields/CustomizedInputs').default,
    title: 'Customized Inputs',
    docs: 'https://material-ui.com/api/text-field/'
  },
  {
    js: require('../../utils/demos/text-fields/InputWithIcon').default,
    title: 'Input With Icon',
    docs: 'https://material-ui.com/api/text-field/'
  }
]

const TextFields = () => (
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

export default TextFields;
