import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3113 8.20955L17.0792 0.703613H14.5048L10.1024 6.43621L6.19683 0.703613H0.592285L7.13176 10.3005L0.986027 18.2964H3.56127L8.34063 12.0773L12.5805 18.2964H18.185L11.3113 8.20955ZM9.31744 10.8045L8.1069 9.0285L3.40712 2.13478H5.34232L9.13565 7.69145L10.3445 9.46832L15.3861 16.8652H13.4509L9.31744 10.8045Z" fill="black"/>
</svg>
`;

const Xicone = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default Xicone;