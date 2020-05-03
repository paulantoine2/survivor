import React from 'react';

import Timeline from './Timeline';

export default {
  component: Timeline,
  title: 'Timeline',
  excludeStories: /.*Data$/,
};

export const defaultTypesData = ['STEP_CAMP', 'STEP_COMFORT', 'STEP_CAMP', 'STEP_IMMUNITY', 'STEP_VOTE'];

export const Active1 = () => <Timeline stepTypes={defaultTypesData} activeStep={1} />;
export const Active3 = () => <Timeline stepTypes={defaultTypesData} activeStep={3} />;
