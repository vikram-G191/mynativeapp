import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.35205 10C4.35205 7.172 4.35205 5.757 5.31244 4.879C6.27174 4 7.81775 4 10.9076 4H14.1854C17.2752 4 18.8213 4 19.7806 4.879C20.7409 5.757 20.7409 7.172 20.7409 10V15C20.7409 17.828 20.7409 19.243 19.7806 20.121C18.8213 21 17.2752 21 14.1854 21H10.9076C7.81775 21 6.27174 21 5.31244 20.121C4.35205 19.243 4.35205 17.828 4.35205 15V10Z" stroke="white" stroke-width="1.5"/>
<path d="M4.35151 18C3.48219 18 2.64847 17.6839 2.03377 17.1213C1.41907 16.5587 1.07373 15.7956 1.07373 15V9C1.07373 5.229 1.07373 3.343 2.35425 2.172C3.63367 1 5.6943 1 9.81447 1H14.1848C15.0542 1 15.8879 1.31607 16.5026 1.87868C17.1173 2.44129 17.4626 3.20435 17.4626 4" stroke="white" stroke-width="1.5"/>
</svg>

`;

const CopyIcon = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default CopyIcon;