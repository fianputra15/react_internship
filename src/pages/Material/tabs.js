import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/tabs/SimpleTabs').default,
    title: 'Simple Tabs',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/TabsWrappedLabel').default,
    title: 'Tabs Wrapped Label',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/FullWidthTabs').default,
    title: 'Full Width Tabs',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/CenteredTabs').default,
    title: 'Centered Tabs',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/ScrollableTabsButtonAuto').default,
    title: 'Scrollable Tabs Button Auto',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/ScrollableTabsButtonForce').default,
    title: 'Scrollable Tabs Button Force',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/ScrollableTabsButtonPrevent').default,
    title: 'Scrollable Tabs Button Prevent',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/IconTabs').default,
    title: 'Icon Tabs',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/IconLabelTabs').default,
    title: 'Icon Label Tabs',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/DisabledTabs').default,
    title: 'Disabled Tabs',
    docs: 'https://material-ui.com/api/tab/'
  },
  {
    js: require('../../utils/demos/tabs/CustomizedTabs').default,
    title: 'Customized Tabs',
    docs: 'https://material-ui.com/api/tab/'
  }
]

const Tabs = () => (
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

export default Tabs;
