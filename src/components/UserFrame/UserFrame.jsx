import React from 'react';
import PropTypes from 'prop-types';
import style from './UserFrame.module.css';
import { GiVerticalBanner, GiTotem } from 'react-icons/gi';
import { FaFlag, FaUserPlus } from 'react-icons/fa';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '../Button/Button';
// import texture from './texture.jpg';
import cn from 'classnames';
import { Fade } from '@material-ui/core';

const UserTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 16,
    fontFamily: 'Avenir',
    fontWeight: 'normal',
    border: 'solid 2px #795c28',
    borderRadius: 0,
    color: '#cdbe91',
    backgroundColor: '#1e2328',
    padding: 0,
  },
}))(Tooltip);

export default function UserFrame({ user, tooltipPlacement, actionPm, actionReport, actionAddFriend, ...props }) {
  return (
    <UserTooltip
      interactive
      placement={tooltipPlacement}
      TransitionComponent={Fade}
      title={
        <React.Fragment>
          <div className={cn(style.tooltip, style[user.teamColor])}>
            <div className={style.team}>
              {/* <img src={texture} alt="" /> */}
              <GiVerticalBanner />
            </div>
            <div className={style.top}>
              <img src={user.avatarUrl} alt={user.userName} className={style.avatar} />
              <div className={style.username}>{user.userName}</div>
            </div>
            <ul className={style.stats}>
              {user.teamWinCount && (
                <li>
                  <span className={style.number}>{user.teamWinCount}</span> Victoire(s) en équipe
                </li>
              )}
              {user.soloWinCount && (
                <li>
                  <span className={style.number}>{user.soloWinCount}</span> Victoire(s) individuelle(s)
                </li>
              )}
              {user.totem && (
                <li className={style.immunity}>
                  <span className={style.number}>
                    <GiTotem />
                  </span>{' '}
                  Immunisé
                </li>
              )}
            </ul>
            <div className={style.actions}>
              {actionPm && <Button>Discuter</Button>}
              {actionAddFriend && (
                <Button>
                  <FaUserPlus />
                </Button>
              )}
              {actionReport && (
                <Button>
                  <FaFlag />
                </Button>
              )}
            </div>
          </div>
        </React.Fragment>
      }
    >
      <div className={cn(style.container, style[user.teamColor])}>
        <img src={user.avatarUrl} alt={user.userName} className={style.avatar} />
        <div className={style.flag}>
          <GiVerticalBanner />
        </div>
      </div>
    </UserTooltip>
  );
}

UserFrame.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    teamColor: PropTypes.string.isRequired,
    teamWinCount: PropTypes.number,
    soloWinCount: PropTypes.number,
  }),
  tooltipPlacement: PropTypes.string,
  actionPm: PropTypes.bool,
  actionAddFriend: PropTypes.bool,
  actionReport: PropTypes.bool,
};

UserFrame.defaultProps = {
  tooltipPlacement: 'bottom',
  actionPm: false,
  actionAddFriend: false,
  actionReport: true,
};
