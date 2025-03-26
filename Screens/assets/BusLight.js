
import React from 'react';
import { SvgXml } from 'react-native-svg';



const BusLight = ({ width = '100%', height = '100%',color = '#1F487C' }) => {
    const iconsvg = `
<svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9184 4.10409C13.2039 4.75714 13.3659 5.45152 13.3979 6.15566H6.99999L0.602053 6.15566C0.634108 5.45152 0.79608 4.75714 1.08161 4.10409C1.40228 3.37067 1.8727 2.70333 2.46674 2.14056C3.06081 1.57775 3.76683 1.13062 4.54482 0.825326C5.32282 0.520027 6.15713 0.362735 6.99999 0.362735C7.84285 0.362735 8.67716 0.520027 9.45516 0.825326C10.2332 1.13062 10.9392 1.57775 11.5332 2.14056C12.1273 2.70333 12.5977 3.37067 12.9184 4.10409Z" fill="white" stroke="${color}" stroke-width="0.520392"/>
</svg>
`;
  return <SvgXml xml={iconsvg} width={width} height={height}  color={color}/>;
};

export default BusLight;
