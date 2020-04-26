import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './Gage.module.css';
import { IoIosFlash } from 'react-icons/io';

export default function Gage({ value, min, max, theme, preview }) {
  let units = [];
  for (let i = 0; i < max; i++) {
    if (!preview) {
      units.push(i < value ? 'unit__filled' : 'unit');
    } else {
      if (i < value + preview) units.push('unit__filled');
      else if (i < value) units.push('unit__dimmed');
      else units.push('unit');
    }
  }
  return (
    <div className={style.wrapper}>
      <div className={style.icon__border}>
        <div className={style.icon}>
          <IoIosFlash />
        </div>
      </div>
      <div className={style.border}>
        <div className={style.container}>
          {units.map((unitType) => (
            <div className={cn(style[unitType], style['unit__' + theme])}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
Gage.defaultProps = {
  min: 0,
  theme: 'default',
};
Gage.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
  theme: PropTypes.string,
  preview: PropTypes.number,
};
