import React from 'react';
import { SvgXml } from 'react-native-svg';



const BusticketSeprateLine = ({ width = '100%', height = '100%', color = '#E92E3D' }) => {

  const iconsvg = `
<svg width="390" height="2" viewBox="0 0 390 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.75" y1="0.75" x2="389.262" y2="0.75" stroke="#1F487C" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="10 10"/>
</svg>
`;
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default BusticketSeprateLine;