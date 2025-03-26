import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.78325 8L7.89339 2.26087L14.0035 8L15.6699 7.30435L7.89339 0L0.116849 7.30435L1.78325 8Z" fill="#1F487C"/>
</svg>
`;

const UpArrow = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default UpArrow;