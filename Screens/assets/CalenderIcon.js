
import React from 'react';
import { SvgXml } from 'react-native-svg';

const MapSVG = `<svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.6106 2V7.20001M8.38939 2V7.20001M2 12.4H25M8.38939 17.6H8.40217M13.5 17.6H13.5128M18.6106 17.6H18.6234M8.38939 22.8H8.40217M13.5 22.8H13.5128M18.6106 22.8H18.6234M3 6.06958V10.6478L24 11.1565L23.5 6.06958H3.5L22.5 10.1392L4 9.63045V7.59567H5.5L22.4444 9.12176L15.5 7.19995L22 7.59567M4.55556 4.59994H22.4444C23.8558 4.59994 25 5.76401 25 7.19995V25.4C25 26.8359 23.8558 28 22.4444 28H4.55556C3.14416 28 2 26.8359 2 25.4V7.19995C2 5.76401 3.14416 4.59994 4.55556 4.59994Z" stroke="#1F487C" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;

const CalenderIcon = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={MapSVG} width={width} height={height} />;
};

export default CalenderIcon;