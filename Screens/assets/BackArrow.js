import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.276104 7.80992C-0.105016 8.20963 -0.0899481 8.84261 0.309759 9.22373L6.82336 15.4344C7.22307 15.8156 7.85605 15.8005 8.23717 15.4008C8.61829 15.0011 8.60323 14.3681 8.20352 13.987L2.41365 8.46635L7.93429 2.67648C8.31541 2.27677 8.30034 1.64378 7.90063 1.26266C7.50093 0.881543 6.86794 0.896611 6.48682 1.29632L0.276104 7.80992ZM21.9811 7.00028L0.976042 7.50028L1.02364 9.49972L22.0287 8.99972L21.9811 7.00028Z" fill="#8EA3BD"/>
</svg>

`;

const BackArrow = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default BackArrow;