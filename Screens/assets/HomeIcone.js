import React from 'react';
import { SvgXml } from 'react-native-svg';



const HomeIcone = ({ width = '100%', height = '100%', color = { color } }) => {

  const iconsvg = `
<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17.5" cy="17.4998" r="17.5" fill="${color}" fill-opacity="0.3"/>
<path d="M9.05561 24.4841H13.7732V17.5272H19.6714V24.4841H24.3889V13.8431L16.7223 8.47767L9.05561 13.8431V24.4841ZM7.77783 25.6664V13.2519L16.7223 6.99976L25.6667 13.2519V25.6664H18.3936V18.7096H15.0509V25.6664H7.77783Z" fill="${color}" stroke="${color}"/>
</svg>
`;
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default HomeIcone;