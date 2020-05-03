import React from 'react';

import Button from './Button';

export default {
  component: Button,
  title: 'Button',
  excludeStories: /.*Data$/,
  decorators: [(el) => <div style={{ padding: '100px' }}>{el()}</div>],
};

export const Default = () => <Button>Pêcher</Button>;
export const Loading = () => <Button loading>Pêcher</Button>;
