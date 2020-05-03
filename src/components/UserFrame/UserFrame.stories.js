import React from 'react';

import UserFrame from './UserFrame';

export default {
  component: UserFrame,
  title: 'User frame',
  excludeStories: /.*Data$/,
  decorators: [(el) => <div style={{ padding: '100px' }}>{el()}</div>],
};

export const userData = {
  userName: 'MaitreClaude',
  avatarUrl: 'https://static1.purepeople.com/articles/7/38/65/67/@/5565428-claude-candidat-de-koh-lanta-2020-sa-624x600-2.jpg',
  teamColor: 'red',
};

export const statsData = {
  soloWinCount: 2,
  teamWinCount: 3,
  totem: true,
};

export const RedTeam = () => <UserFrame user={{ ...userData, teamColor: 'red' }} />;
export const YellowTeam = () => <UserFrame user={{ ...userData, teamColor: 'yellow' }} />;
export const BlueTeam = () => <UserFrame user={{ ...userData, teamColor: 'blue' }} />;
export const BlackTeam = () => <UserFrame user={{ ...userData, teamColor: 'black' }} />;
export const WithStats = () => <UserFrame user={{ ...userData, ...statsData, teamColor: 'white' }} />;
export const WithActions = () => <UserFrame actionAddFriend actionPm user={{ ...userData, ...statsData, teamColor: 'white' }} />;
