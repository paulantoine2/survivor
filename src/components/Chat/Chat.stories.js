import React from 'react';

import Chat from './Chat';

import { statsData } from '../UserFrame/UserFrame.stories';

export default {
  component: Chat,
  title: 'Chat',
  excludeStories: /.*Data$/,
  decorators: [(el) => <div style={{ padding: '100px', height: '400px' }}>{el()}</div>],
};

export const chatData = {
  elements: [
    {
      type: 'message',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      user: {
        userName: 'MaitreClaude',
        avatarUrl:
          'https://static1.purepeople.com/articles/7/38/65/67/@/5565428-claude-candidat-de-koh-lanta-2020-sa-624x600-2.jpg',
        teamColor: 'black',
        ...statsData,
      },
    },
    {
      type: 'message',
      content: 'Nam rhoncus, mauris varius eleifend scelerisque',
      user: {
        userName: 'TeheTheBoss',
        teamColor: 'black',
        avatarUrl:
          'https://static1.purepeople.com/articles/0/38/63/00/@/5562584-teheiura-candidat-de-koh-lanta-2020-624x600-2.jpg',
        ...statsData,
      },
    },
    {
      type: 'message',
      content: 'Cras sed',
      user: {
        userName: 'MaitreClaude',
        avatarUrl:
          'https://static1.purepeople.com/articles/7/38/65/67/@/5565428-claude-candidat-de-koh-lanta-2020-sa-624x600-2.jpg',
        teamColor: 'black',
        ...statsData,
      },
    },
    {
      type: 'info',
      infoType: 'teamWin',
      teamColor: 'red',
      content: "Victoire de l'equipe rouge",
    },
    {
      type: 'message',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      user: {
        userName: 'MaitreClaude',
        avatarUrl:
          'https://static1.purepeople.com/articles/7/38/65/67/@/5565428-claude-candidat-de-koh-lanta-2020-sa-624x600-2.jpg',
        teamColor: 'black',
        ...statsData,
      },
    },
    {
      type: 'message',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      user: {
        userName: 'MaitreClaude',
        avatarUrl:
          'https://static1.purepeople.com/articles/7/38/65/67/@/5565428-claude-candidat-de-koh-lanta-2020-sa-624x600-2.jpg',
        teamColor: 'black',
        ...statsData,
      },
    },
    {
      type: 'message',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      user: {
        userName: 'MaitreClaude',
        avatarUrl:
          'https://static1.purepeople.com/articles/7/38/65/67/@/5565428-claude-candidat-de-koh-lanta-2020-sa-624x600-2.jpg',
        teamColor: 'black',
        ...statsData,
      },
    },
  ],
};

export const Default = () => <Chat {...chatData} />;
