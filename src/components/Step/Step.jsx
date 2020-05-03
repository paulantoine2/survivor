import React from 'react';
import PropTypes from 'prop-types';
import { FaQuestion } from 'react-icons/fa';
import { GiCampfire, GiTotem, GiCookingPot, GiVote } from 'react-icons/gi';
import style from './Step.module.css';

const STEPS = {
  STEP_CAMP: {
    label: 'camp',
    icon: <GiCampfire />,
  },
  STEP_COMFORT: {
    label: 'Epreuve de confort',
    icon: <GiCookingPot />,
  },
  STEP_IMMUNITY: {
    label: "Epreuve d'immunité",
    icon: <GiTotem />,
  },
  STEP_VOTE: {
    label: 'Votes',
    icon: <GiVote />,
  },
};

export default function Step({ state, timer, type, tooltip, ...rest }) {
  const icon = STEPS[type] ? STEPS[type].icon : <FaQuestion />;

  // const label = STEPS[type] ? STEPS[type].label : 'Inconnu';

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
      <div className={borderStyle} data-tip={tooltip} data-for={`step_${rest.key}`} {...rest}>
        <div className={style.container}>{icon}</div>
      </div>
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
