import React from 'react';
import { SvgXml } from 'react-native-svg';



const BlueStandLine = ({ width = '100%', height = '100%', color = "#1F487C" }) => {

  const iconsvg = `
<svg width="2" height="79" viewBox="0 0 2 79" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.756519" y1="0.386841" x2="0.756522" y2="78.4139" stroke= "${color}" stroke-opacity="0.5" stroke-width="1.00327" stroke-dasharray="5.02 5.02"/>
</svg>
`;
  return <SvgXml xml={iconsvg} width={width} height={height} color ={color} />;
};

export default BlueStandLine;