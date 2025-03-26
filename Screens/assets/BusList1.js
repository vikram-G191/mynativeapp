import React from 'react';
import { SvgXml } from 'react-native-svg';



const BusList1 = ({ width = '100%', height = '100%', color = '#E92E3D' }) => {

 
const iconsvg = `
<svg width="85" height="26" viewBox="0 0 85 26" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.80594 3.91758C4.80597 2.02308 6.34178 0.487305 8.23627 0.487305H76.6901C78.5847 0.487305 80.1205 2.02312 80.1205 3.91763V16.4955H8.23626C6.34177 16.4955 4.80597 14.9597 4.80593 13.0652L4.80586 9.10711L4.80594 3.91758Z" fill="${color}"/>
</svg>
`;

  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default BusList1;