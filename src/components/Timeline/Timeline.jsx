import React from 'react';
import PropTypes from 'prop-types';
import Step from '../Step/Step';
import { container } from './Timeline.module.css';

export default function Timeline({ stepTypes, activeStep }) {
  return (
    <div className={container}>
      {stepTypes.map((type, i) => {
        let state = null;
        if (activeStep > i + 1) state = 'STEP_DONE';
        if (activeStep < i + 1) state = 'STEP_WAIT';
        return <Step key={i} type={type} state={state} />;
      })}
    </div>
  );
}

Timeline.propTypes = {
  stepTypes: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
};
