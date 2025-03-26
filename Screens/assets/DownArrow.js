import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0039 0L7.89372 5.73913L1.78359 0L0.117188 0.695652L7.89372 8L15.6703 0.695652L14.0039 0Z" fill="#1F487C"/>
</svg>
`;

const DownArrow = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default DownArrow;