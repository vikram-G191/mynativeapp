import React from 'react';
import { SvgXml } from 'react-native-svg';



const SleeperSeat = ({ width = '100%', height = '100%', fillColor = '#777777', strokeColor = '#298121' }) => {

  const iconsvg = `<svg width="25" height="66" viewBox="0 0 25 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.982422 63.3681V2.66562C0.982422 1.88597 1.61445 1.25393 2.39411 1.25393H12.6352L22.6283 1.25391C23.4079 1.25391 24.04 1.88594 24.04 2.6656V33.0168V63.3681C24.04 64.1477 23.4079 64.7798 22.6283 64.7798H12.6352H2.39411C1.61446 64.7798 0.982422 64.1477 0.982422 63.3681Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="0.705843"/>
<path d="M17.3379 54.4358H7.68437C6.42013 54.4358 5.39526 55.4607 5.39526 56.7249C5.39526 57.9891 6.42013 59.014 7.68437 59.014H17.3379C18.6022 59.014 19.627 57.9891 19.627 56.7249C19.627 55.4607 18.6022 54.4358 17.3379 54.4358Z" stroke="${strokeColor}" stroke-width="0.76"/>
</svg>
`;

  return <SvgXml xml={iconsvg} width={width} height={height} fillColor = {fillColor} strokeColor = {strokeColor}/>;
};

export default SleeperSeat;