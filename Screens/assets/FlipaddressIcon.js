import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="32" height="32" rx="6" fill="#1F487C"/>
<rect x="6" y="26" width="19" height="20" transform="rotate(-90 6 26)" fill="url(#pattern0_243_7017)"/>
<defs>
<pattern id="pattern0_243_7017" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_243_7017" transform="matrix(0.00411184 0 0 0.00390625 -0.0263158 0)"/>
</pattern>
<image id="image0_243_7017" width="256" height="256" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>

`;

const FlipaddressIcon = ({ width = '100%', height = '100%', viewBox = "10 10 32 32" }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default FlipaddressIcon;