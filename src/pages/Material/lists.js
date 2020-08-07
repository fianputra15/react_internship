import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/lists/SimpleList').default,
    title: 'Simple List',
    docs: 'https://material-ui.com/api/list/'
  },
  {
    js: require('../../utils/demos/lists/FolderList').default,
    title: 'Folder List',
    docs: 'https://material-ui.com/api/list/'
  },
  {
    js: require('../../utils/demos/lists/InsetList').default,
    title: 'Inset List',
    docs: 'https://material-ui.com/api/list/'
  },
  {
    js: require('../../utils/demos/lists/NestedList').default,
    title: 'Nested List',
    docs: 'https://material-ui.com/api/list/'
  },
  {
    js: require('../../utils/demos/lists/PinnedSubheaderList').default,
    title: 'Pinned Subheader List',
    docs: 'https://material-ui.com/api/list/'
  },
  {
    js: require('../../utils/demos/lists/CheckboxList').default,
    title: 'Checkbox List',
    docs: 'https://material-ui.com/api/list/'
  },
  {
    js: require('../../utils/demos/lists/CheckboxListSecondary').default,
    title: 'Checkbox List Secondary',
    docs: 'https://material-ui.com/api/list/'
  },
  {
    js: require('../../utils/demos/lists/SwitchListSecondary').default,
    title: 'Switch List Secondary',
    docs: 'https://material-ui.com/api/list/'
  },
  {
    js: require('../../utils/demos/lists/InteractiveList').default,
    title: 'Interactive List',
    docs: 'https://material-ui.com/api/list/'
  }
]

const Lists = () => (
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

export default Lists;
