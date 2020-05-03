import React from 'react';

import ChatElement from './ChatElement';

import { userData } from '../UserFrame/UserFrame.stories';

export default {
  component: ChatElement,
  title: 'Chat Element',
  excludeStories: /.*Data$/,
  decorators: [(el) => <div style={{ padding: '100px', width: '600px' }}>{el()}</div>],
};

export const messageData = {
  type: 'message',
  user: userData,
};

const shortMessage = 'Bonjour';
const longMessage =
  'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page';

export const Message = () => <ChatElement {...messageData}>{shortMessage}</ChatElement>;
export const MessageLong = () => <ChatElement {...messageData}>{longMessage}</ChatElement>;
export const InfoTeamWin = () => (
  <ChatElement type="info" infoType="teamWin" teamColor="red">
    Victoire de l'equipe rouge
  </ChatElement>
);
export const InfoSoloWin = () => (
  <ChatElement type="info" infoType="soloWin" user={userData}>
    Victoire de MaitreClaude
  </ChatElement>
);
