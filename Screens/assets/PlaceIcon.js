import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.165 14.0259C11.7166 12.0474 13.6709 9.17298 13.6709 7.247C13.6709 4.05333 11.265 1.46436 8.29712 1.46436C5.32927 1.46436 2.92335 4.05333 2.92335 7.247C2.92335 9.17298 4.87769 12.0474 6.42921 14.0259C7.23866 15.0581 7.64338 15.5742 8.29712 15.5742C8.95087 15.5742 9.35559 15.0581 10.165 14.0259ZM8.29712 9.52501C7.18418 9.52501 6.28196 8.6228 6.28196 7.50985C6.28196 6.39691 7.18418 5.49469 8.29712 5.49469C9.41007 5.49469 10.3123 6.39691 10.3123 7.50985C10.3123 8.6228 9.41007 9.52501 8.29712 9.52501Z" fill="#1F487C"/>
</svg>

`;

const PlaceIcon = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default PlaceIcon;