import React from 'react';

import Step from './Step';

export default {
  component: Step,
  title: 'Step',
  excludeStories: /.*Data$/,
};

export const Immunity = () => <Step type={'STEP_IMMUNITY'} />;

export const Comfort = () => <Step type={'STEP_COMFORT'} />;

export const Camp = () => <Step type={'STEP_CAMP'} />;

export const Vote = () => <Step type={'STEP_VOTE'} />;

export const CampDone = () => <Step type={'STEP_CAMP'} state={'STEP_DONE'} />;

export const CampWait = () => <Step type={'STEP_CAMP'} state={'STEP_WAIT'} />;
