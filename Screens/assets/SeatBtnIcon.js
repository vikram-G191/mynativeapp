import React from 'react';
import { SvgXml } from 'react-native-svg';

const iconsvg = `
<svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 43.75H51.25V49C51.25 50.7949 49.7949 52.25 48 52.25H4C2.20507 52.25 0.75 50.7949 0.75 49V43.75Z" fill="#FFFFFF" stroke="#777777" stroke-width="1.5"/>
<path d="M13 0.75H39C44.1086 0.75 48.25 4.89137 48.25 10V42C48.25 43.7949 46.7949 45.25 45 45.25H7C5.20507 45.25 3.75 43.7949 3.75 42V10C3.75 4.89137 7.89137 0.75 13 0.75Z" fill="#FFFFFF" stroke="#777777" stroke-width="1.5"/>
<path d="M0 20.5C0 18.567 1.567 17 3.5 17C5.433 17 7 18.567 7 20.5V46H0V20.5Z" fill="#FFFFFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 46H1.5V20.5C1.5 19.3954 2.39543 18.5 3.5 18.5C4.60457 18.5 5.5 19.3954 5.5 20.5V46H7V20.5C7 18.567 5.433 17 3.5 17C1.567 17 0 18.567 0 20.5V46Z" fill="#777777"/>
<path d="M45 20.5C45 18.567 46.567 17 48.5 17C50.433 17 52 18.567 52 20.5V46H45V20.5Z" fill="#FFFFFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M45 46H46.5V20.5C46.5 19.3954 47.3954 18.5 48.5 18.5C49.6046 18.5 50.5 19.3954 50.5 20.5V46H52V20.5C52 18.567 50.433 17 48.5 17C46.567 17 45 18.567 45 20.5V46Z" fill="#777777"/>
</svg>
`;

const SeatBtnIcon = ({ width = '100%', height = '100%' }) => {
  return <SvgXml xml={iconsvg} width={width} height={height} />;
};

export default SeatBtnIcon;