'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const common = {
    fill: 'none',
    stroke: '#fff',
    strokeMiterlimit: 10,
    strokeWidth: 40
};

const BasketballIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 800 800">
        <path style={common} d="M650,400c0,138.06-111.92,250-250,250a248.83,248.83,0,0,1-146.39-47.33,251.74,251.74,0,0,1-30.36-25.88,250,250,0,0,1-14.14-338.15q6.75-8,14.14-15.36A249.15,249.15,0,0,1,400,150.06C538.05,150.06,650,262,650,400Z"/>
        <line style={common} x1="400" y1="150" x2="400" y2="649.94"/>
        <path style={common} d="M223.25,223.28c18.95-3.86,75,81.57,77.26,176.69,1.46,62.21-28.88,128.57-77.26,176.82"/>
        <path style={common} d="M574.19,573.65c-18.63,3.79-73.75-80.18-76-173.68-1.43-61.15,28.39-126.38,76-173.8"/>
        <path style={common} d="M150,400S379.14,495.18,650,400"/>
    </SvgIcon>
);

export default BasketballIcon;

