import React from 'react';
import style from './Button.module.css';

export default function Button({ children, loading, ...props }) {
  return (
    <div className={style.border}>
      <button {...props} className={style.button}>
        {loading ? `...` : children}
      </button>
    </div>
  );
}
