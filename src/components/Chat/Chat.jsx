import React from 'react';
import PropTypes from 'prop-types';
import style from './Chat.module.css';
import Button from '../Button/Button';
import ChatElement from '../ChatElement/ChatElement';

export default function Chat({ elements, ...props }) {
  return (
    <div className={style.container}>
      <div className={style.scroll}>
        <div className={style.elements}>
          {elements.map((e, index) => (
            <ChatElement style={{ padding: '10px 0', borderTop: 'solid 1px #222' }} key={index} {...e}>
              {e.content}
            </ChatElement>
          ))}
        </div>
      </div>
      <div className={style.actions}>
        <input type="text" placeholder="Ecrire un message" className={style.input} />
        <Button>Envoyer</Button>
      </div>
    </div>
  );
}

Chat.propTypes = {
  elements: PropTypes.array,
};

Chat.defaultProps = {
  elements: [],
};
