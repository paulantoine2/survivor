import React from 'react';

import Tooltip from './Tooltip';
import style from './Tooltip.module.css';
import Step from '../Step/Step';
import '../../index.css';

export default {
  component: Tooltip,
  title: 'Tooltip',
  excludeStories: /.*Data$/,
  decorators: [
    (el) => (
      <div style={{ padding: '100px' }}>
        <Step type={'STEP_COMFORT'} data-tip data-for="story" />
        {el()}
      </div>
    ),
  ],
};

export const Default = () => <Tooltip id="story">EPREUVE DE CONFORT</Tooltip>;
export const WithHTML = () => (
  <Tooltip id="story">
    <div className={style.tooltip__title}>Epreuve de confort</div>
    <div className={style.tooltip__body}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non
      <br />
      vehicula diam. Nullam eu lectus ut lectus fermentum pretium at a justo.
      <br />
      Pellentesque ex libero, feugiat id eros quis, luctus semper tellus.
      <br />
    </div>
  </Tooltip>
);
