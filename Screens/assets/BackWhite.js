import React from 'react';
import { SvgXml } from 'react-native-svg';



const BackWhite = ({ width = '100%', height = '100%', color = 'white' }) => {
  const iconsvg = `
<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="17" fill="${color}" fill-opacity="0.3"/>
<path d="M13.0318 16.3279L18.8032 10.4751C18.9841 10.2917 19.205 10.2 19.4659 10.2C19.7268 10.2 19.9477 10.2917 20.1286 10.4751C20.3095 10.6586 20.4 10.8826 20.4 11.1472C20.4 11.4118 20.3095 11.6393 20.1286 11.8298L15.0252 17.0052L20.1286 22.1807C20.3095 22.3641 20.4 22.5881 20.4 22.8527C20.4 23.1173 20.3095 23.3413 20.1286 23.5248C19.9477 23.7082 19.7268 23.8 19.4659 23.8C19.205 23.8 18.9841 23.7082 18.8032 23.5248L13.0318 17.672C12.8439 17.4956 12.75 17.2734 12.75 17.0052C12.75 16.8782 12.7744 16.7548 12.8231 16.6348C12.8718 16.5149 12.9413 16.4126 13.0318 16.3279Z" fill="${color}"/>
</svg>
`;
  return <SvgXml xml={iconsvg} width={width} height={height} color={color} />;
};

export default BackWhite;