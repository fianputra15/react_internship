import React from 'react';

import { Wrapper, Example } from '../../components';

const demos = [
  {
    js: require('../../utils/demos/steppers/HorizontalLinearAlternativeLabelStepper').default,
    title: 'Horizontal Linear Alternative Label Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/HorizontalLinearStepper').default,
    title: 'Horizontal Linear Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/HorizontalNonLinearAlternativeLabelStepper').default,
    title: 'Horizontal Non Linear Alternative Label Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/HorizontalNonLinearStepper').default,
    title: 'Horizontal Non Linear Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/VerticalLinearStepper').default,
    title: 'Vertical Linear Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/HorizontalNonLinearStepperWithError').default,
    title: 'Horizontal Non Linear Stepper With Error',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/TextMobileStepper').default,
    title: 'Text Mobile Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/SwipeableTextMobileStepper').default,
    title: 'Swipeable Text Mobile Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/DotsMobileStepper').default,
    title: 'Dots Mobile Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  },
  {
    js: require('../../utils/demos/steppers/ProgressMobileStepper').default,
    title: 'Progress Mobile Stepper',
    docs: 'https://material-ui.com/api/stepper/'
  }
]

const Steppers = () => (
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

export default Steppers;
