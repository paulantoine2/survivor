import React from 'react';
import ReactTooltip from 'react-tooltip';
import style from './Tooltip.module.css';

export default function Tooltip(props) {
  const defaultProps = {
    effect: 'solid',
    border: true,
    borderColor: '#c8a96c',
    backgroundColor: '#000912',
    id: props.id,
    // ...props,
  };
  return (
    <ReactTooltip className={style.tooltip} {...defaultProps}>
      {props.children}
    </ReactTooltip>
  );
}
