import React from 'react';
import PropTypes from 'prop-types';
import { FaQuestion, FaVoteYea, FaFish, FaStar } from 'react-icons/fa';
import { IoIosBonfire } from 'react-icons/io';
import style from './Step.module.css';
import Tooltip from '../Tooltip/Tooltip';

const STEPS = {
  STEP_CAMP: {
    label: 'camp',
    icon: <IoIosBonfire />,
  },
  STEP_COMFORT: {
    label: 'camp',
    icon: <FaFish />,
  },
  STEP_IMMUNITY: {
    label: 'camp',
    icon: <FaStar />,
  },
  STEP_VOTE: {
    label: 'camp',
    icon: <FaVoteYea />,
  },
};

export default function Step({ state, timer, type, tooltip, ...rest }) {
  const icon = STEPS[type] ? STEPS[type].icon : <FaQuestion />;

  const label = STEPS[type] ? STEPS[type].label : 'Inconnu';

  const borderStyle = ((state) => {
    switch (state) {
      case 'STEP_DONE':
        return style.border__done;
      case 'STEP_WAIT':
        return style.border__wait;
      default:
        return style.border;
    }
  })(state);

  return (
    <>
      <div
        className={borderStyle}
        data-tip={tooltip}
        data-for={`step_${rest.key}`}
        {...rest}
      >
        <div className={style.container}>{icon}</div>
      </div>
      {tooltip && <Tooltip id={`step_${rest.key}`}>{label}</Tooltip>}
    </>
  );
}

Step.defaultProps = {
  tooltip: false,
  key: 1,
};

Step.propTypes = {
  state: PropTypes.string.isRequired,
  timer: PropTypes.number,
  type: PropTypes.string.isRequired,
  tooltip: PropTypes.bool,
};
