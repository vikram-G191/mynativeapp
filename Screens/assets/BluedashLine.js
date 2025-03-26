import React from 'react';
import { SvgXml } from 'react-native-svg';



const BluedashLine = ({ width = '100%', height = '100%', color = '#1F487C' }) => {

  const iconsvg = `
<svg width="391" height="2" viewBox="0 0 391 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<line y1="0.554625" x2="390.036" y2="0.554625" stroke="${color}" stroke-width="1.11438" stroke-dasharray="5.57 5.57"/>
</svg>
`;
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default BluedashLine;