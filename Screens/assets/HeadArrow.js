import React from 'react';
import { SvgXml } from 'react-native-svg';



const HeadWhite = ({ width = '100%', height = '100%',color='white' }) => {
  const iconsvg = `
<svg width="58" height="10" viewBox="0 0 58 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 5C1.93129e-07 7.20914 1.79086 9 4 9C6.20914 9 8 7.20914 8 5C8 2.79086 6.20914 1 4 1C1.79086 1 -1.93129e-07 2.79086 0 5ZM58 5L50.5 0.669869L50.5 9.33012L58 5ZM4 5.75L51.25 5.75L51.25 4.25L4 4.25L4 5.75Z" fill="${color}"/>
</svg>
`;
  return <SvgXml xml={iconsvg} width={width} height={height} color={color} />;
};

export default HeadWhite;