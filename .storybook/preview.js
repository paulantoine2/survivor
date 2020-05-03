import { addParameters } from '@storybook/react';
import '../src/global.css';

addParameters({
  backgrounds: [
    { name: 'dark', value: '#000912' },
    { name: 'black', value: '#000' },
    { name: 'default', value: 'transparent', default: true },
  ],
});
