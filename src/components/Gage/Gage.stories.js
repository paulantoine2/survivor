import React from 'react';

import Gage from './Gage';

export default {
  component: Gage,
  title: 'Gage',
  excludeStories: /.*Data$/,
  decorators: [(el) => <div style={{ padding: '100px' }}>{el()}</div>],
};

export const Full = () => <Gage max={10} value={10} />;
export const Half = () => <Gage max={10} value={5} />;
export const GreenTheme = () => <Gage max={10} value={5} theme={'green'} />;
export const HalfPreviewMin2 = () => <Gage max={10} value={5} preview={-2} />;
// export const HalfPreviewMax2 = () => <Gage max={10} value={5} preview={2} />;
