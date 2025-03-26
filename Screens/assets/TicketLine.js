import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="318" height="2" viewBox="0 0 318 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.519287" y1="1.19676" x2="317.959" y2="1.19676" stroke="#1F487C" stroke-width="1.04765" stroke-dasharray="5.24 5.24"/>
</svg>


`;

const TicketLine = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default TicketLine;