import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0L5 5L10 0H0Z" fill="#1F487C"/>
</svg>
`;

const DropDownicone = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default DropDownicone;