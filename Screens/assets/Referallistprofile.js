import React from 'react';
import { SvgXml } from 'react-native-svg';



const Referallistprofile = ({ width = '100%', height = '100%', color = '#E92E3D' }) => {

  const iconsvg = `
<svg width="45" height="47" viewBox="0 0 45 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="22.5" cy="23.4448" rx="22.5" ry="23.2459" fill="#04B9EF"/>
</svg>
`;
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default Referallistprofile;