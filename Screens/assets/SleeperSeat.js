import React from 'react';
import { SvgXml } from 'react-native-svg';



const SleeperSeat = ({ width = '100%', height = '100%', borderBottomColor= '#298121', borderColor = '#298121', bottomColor = '#298121', fillColor = '#777777', strokeColor = '#298121' }) => {

  const iconsvg = `<svg width="32" height="77" viewBox="0 0 32 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.94102 0.754105H29.6266C30.4911 0.754103 31.192 1.45503 31.192 2.31953V74.1887C31.192 75.0532 30.4911 75.7541 29.6266 75.7541H2.94102C2.07652 75.7541 1.3756 75.0532 1.3756 74.1887V2.31953C1.3756 1.45503 2.07652 0.754105 2.94102 0.754105Z" stroke="${strokeColor}"/>
<mask id="path-2-outside-1_15834_4266" maskUnits="userSpaceOnUse" x="1.87131" y="0.979614" width="29" height="64" fill="black">
<rect fill="white" x="1.87131" y="0.979614" width="29" height="64"/>
<path d="M2.87131 2.67962C2.87131 2.29302 3.18471 1.97961 3.57131 1.97961H28.9963C29.3829 1.97961 29.6963 2.29301 29.6963 2.67961V64.0647H2.87131V2.67962Z"/>
</mask>
<path d="M2.87131 2.67962C2.87131 2.29302 3.18471 1.97961 3.57131 1.97961H28.9963C29.3829 1.97961 29.6963 2.29301 29.6963 2.67961V64.0647H2.87131V2.67962Z" fill="${fillColor}"/>
<path d="M1.87131 2.67961C1.87131 1.74073 2.63242 0.979614 3.57131 0.979614H28.9963C29.9352 0.979614 30.6963 1.74073 30.6963 2.67961L28.6963 2.97961H3.87131L1.87131 2.67961ZM29.6963 64.0647H2.87131H29.6963ZM1.87131 64.0647V2.67961C1.87131 1.74073 2.63242 0.979614 3.57131 0.979614L3.87131 2.97961V64.0647H1.87131ZM28.9963 0.979614C29.9352 0.979614 30.6963 1.74073 30.6963 2.67961V64.0647H28.6963V2.97961L28.9963 0.979614Z" fill="${borderColor}" mask="url(#path-2-outside-1_15834_4266)"/>
<path d="M0.875595 64.0646H31.692V74.7189C31.692 75.8235 30.7966 76.7189 29.692 76.7189H2.8756C1.77103 76.7189 0.875595 75.8235 0.875595 74.7189V64.0646Z" fill="${strokeColor}"/>
<path d="M31.442 64.3146V74.7189C31.442 75.6854 30.6585 76.4689 29.692 76.4689H2.8756C1.9091 76.4689 1.1256 75.6854 1.1256 74.7189V64.3146H31.442Z" fill="${bottomColor}" stroke="${borderBottomColor}" stroke-width="0.5"/>
</svg>
`;

  return <SvgXml xml={iconsvg} width={width} height={height} borderBottomColor={borderBottomColor} borderColor={borderColor} bottomColor={bottomColor} fillColor = {fillColor} strokeColor = {strokeColor}/>;
};

export default SleeperSeat;