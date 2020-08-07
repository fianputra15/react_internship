import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/selection-controls/Checkboxes').default,
    title: 'Checkboxes',
    docs: 'https://material-ui.com/demos/selection-controls/'
  },
  {
    js: require('../../utils/demos/selection-controls/CheckboxLabels').default,
    title: 'Checkbox Labels',
    docs: 'https://material-ui.com/demos/selection-controls/'
  },
  {
    js: require('../../utils/demos/selection-controls/CheckboxesGroup').default,
    title: 'Checkboxes Group',
    docs: 'https://material-ui.com/demos/selection-controls/'
  },
  {
    js: require('../../utils/demos/selection-controls/RadioButtonsGroup').default,
    title: 'Radio Buttons Group',
    docs: 'https://material-ui.com/demos/selection-controls/'
  },
  {
    js: require('../../utils/demos/selection-controls/RadioButtons').default,
    title: 'Radio Buttons',
    docs: 'https://material-ui.com/demos/selection-controls/'
  },
  {
    js: require('../../utils/demos/selection-controls/Switches').default,
    title: 'Switches',
    docs: 'https://material-ui.com/demos/selection-controls/'
  },
  {
    js: require('../../utils/demos/selection-controls/SwitchLabels').default,
    title: 'Switch Labels',
    docs: 'https://material-ui.com/demos/selection-controls/'
  },
  {
    js: require('../../utils/demos/selection-controls/SwitchesGroup').default,
    title: 'Switches Group',
    docs: 'https://material-ui.com/demos/selection-controls/'
  },
  {
    js: require('../../utils/demos/selection-controls/CustomizedSwitches').default,
    title: 'Customized Switched',
    docs: 'https://material-ui.com/demos/selection-controls/'
  }
]

const SelectionControls = () => (
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

export default SelectionControls;
