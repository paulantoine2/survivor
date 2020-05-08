import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { GiVerticalBanner } from 'react-icons/gi';
import style from './ChatElement.module.css';
import UserFrame from '../UserFrame/UserFrame';

/*
  Types de messages :
  - teamWin : Victoire d'une equipe lors d'un jeu
  - soloWin : Victoire d'un joueur lors d'un jeu
  - elimination : Elimination d'un joueur
  - trinketUse : Utilisation d'un collier d'immunité
  - fishingSuccess: Pêche reussie
  - foodFound: Nourriture raportée de la foret
  - fireSuccess: Feu allumé
  - riceDone: Plus de reserve de riz
  - homeDone: Cabane construite
*/

const INFO_TYPES = {
  TEAM_WIN: 'teamWin',
  SOLO_WIN: 'soloWin',
  ELIMINATION: 'elimination',
  TRINKET_USE: 'trinketUse',
  FISHING_SUCCESS: 'fishingSuccess',
  FOOD_FOUND: 'foodFound',
  FIRE_SUCCESS: 'fireSucess',
  RICE_DONE: 'riceDone',
  HOME_DONE: 'homeDone',
};

export default function ChatElement({ type, children, user, teamColor, infoType, ...props }) {
  if (type === 'message')
    return (
      <div {...props} className={cn(style.message, style[user.teamColor])}>
        <UserFrame user={user} tooltipPlacement="right" />
        <div className={style.content}>
          <div className={style.username}>{user.userName}</div>
          <div className={style.text}>{children}</div>
        </div>
      </div>
    );

  if (type === 'info')
    switch (infoType) {
      case INFO_TYPES.TEAM_WIN:
        return (
          <div className={cn(style[infoType])}>
            <div className={style.icon}>
              <GiVerticalBanner />
            </div>
            <div className={style.content}>{children}</div>
          </div>
        );
      default:
        return <div>...</div>;
    }
}

ChatElement.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['info', 'message']).isRequired,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    userName: PropTypes.string.isRequired,
    teamColor: PropTypes.string.isRequired,
  }),
  teamColo: PropTypes.string,
  infoType: PropTypes.oneOf(['teamWin', 'soloWin', 'elimination', 'trinketUse']),
};
