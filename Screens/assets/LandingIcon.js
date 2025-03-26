import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = 
`<svg width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9808 4C15.1723 2.22222 12.8263 1.11111 10.2359 1.11111C5.69043 1.11111 1.84879 4.47778 0.499817 9.13333L2.80676 10C3.32134 8.22203 4.31655 6.67407 5.65054 5.57674C6.98453 4.47942 8.58922 3.88874 10.2359 3.88889C12.142 3.88889 13.882 4.68889 15.2408 5.97778L11.7022 10H20.4998V0L16.9808 4Z" fill="#E5FFF1"/>
</svg>`;

const LandingIcon = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default LandingIcon;