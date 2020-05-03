import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

export default function Button({ children, loading, ...props }) {
  return (
    <div className={style.border}>
      <button {...props} className={style.button}>
        {children}
        {loading && (
          <div className={style.loading}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </button>
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
