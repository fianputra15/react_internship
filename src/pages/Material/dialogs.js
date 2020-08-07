import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/dialogs/SimpleDialog').default,
    title: 'Simple Dialog',
    docs: 'https://material-ui.com/api/dialog/'
  },
  {
    js: require('../../utils/demos/dialogs/AlertDialog').default,
    title: 'Alert Dialog',
    docs: 'https://material-ui.com/api/dialog/'
  },
  {
    js: require('../../utils/demos/dialogs/AlertDialogSlide').default,
    title: 'Alert Dialog Slide',
    docs: 'https://material-ui.com/api/dialog/'
  },
  {
    js: require('../../utils/demos/dialogs/ConfirmationDialog').default,
    title: 'Confirmation Dialog',
    docs: 'https://material-ui.com/api/dialog/'
  },
  {
    js: require('../../utils/demos/dialogs/FullScreenDialog').default,
    title: 'Fullscreen Dialog',
    docs: 'https://material-ui.com/api/dialog/'
  },
  {
    js: require('../../utils/demos/dialogs/FormDialog').default,
    title: 'Form Dialog',
    docs: 'https://material-ui.com/api/dialog/'
  },
  {
    js: require('../../utils/demos/dialogs/ResponsiveDialog').default,
    title: 'Responsive Dialog',
    docs: 'https://material-ui.com/api/dialog/'
  }
]

const Dialogs = () => (
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

export default Dialogs;
