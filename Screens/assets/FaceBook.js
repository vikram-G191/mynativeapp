import React from 'react';
import { SvgXml } from 'react-native-svg';



const FaceBook = ({ width = '100%', height = '100%', color = '#E92E3D' }) => {

  const iconsvg = `
<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 10.5642C21 4.72978 16.299 0 10.5 0C4.70105 0 0 4.72978 0 10.5642C0 15.837 3.83972 20.2075 8.85938 21V13.6179H6.19336V10.5642H8.85938V8.23675C8.85938 5.58911 10.427 4.12663 12.8254 4.12663C13.9742 4.12663 15.1758 4.33296 15.1758 4.33296V6.93274H13.8518C12.5474 6.93274 12.1406 7.74708 12.1406 8.58256V10.5642H15.0527L14.5872 13.6179H12.1406V21C17.1603 20.2075 21 15.8371 21 10.5642Z" fill="#1877F2"/>
</svg>

`;
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default FaceBook;