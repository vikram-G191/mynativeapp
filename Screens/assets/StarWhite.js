import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.27115 14.9681L4.57373 9.43866L0.205078 5.71958L5.97651 5.22764L8.22095 0.0130615L10.4654 5.22764L16.2368 5.71958L11.8682 9.43866L13.1708 14.9681L8.22095 12.0361L3.27115 14.9681Z" fill="white"/>
</svg>
`;

const StarWhite = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default StarWhite;