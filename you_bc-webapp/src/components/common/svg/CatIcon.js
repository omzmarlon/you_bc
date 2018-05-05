'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const common = {
    stroke: '#fff',
    strokeMiterlimit: 10,
    strokeWidth: 40
};

const style1 = {
    ...common,
    fill:'none',
};

const style2 = {
    ...common,
    fill: '#fff',
};

const style3 = {
    ...common,
    fill: 'none',
    strokelinecap: 'round',
};

const CatIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 800 800">
        <path style={style1} d="M412.33,650c-214.45-8.57-246.39-105-255.51-160.88s0-89.12,0-89.12c0-24,25.8-106,25.8-106l58.59-136.69a11.8,11.8,0,0,1,22,.67l44.3,123.79a11.9,11.9,0,0,0,15.69,7c23.73-9.58,82.73-26.62,157.08.78a11.87,11.87,0,0,0,15.28-7.36l42.59-124.8a11,11,0,0,1,20.52-.6L614.7,294s26.35,71.83,26.35,95.84c0,0,11.64,39.95,3,95.84S600.16,641.43,395.64,650"/>
        <path style={style2} d="M378.63,460.42h35.6A7.61,7.61,0,0,1,420,473.05l-23.52,26.76-23.52-26.76A7.61,7.61,0,0,1,378.63,460.42Z"/>
        <polyline style={style3} points="333.51 566.54 396.43 499.81 460.08 566.54"/>
    </SvgIcon>
);

export default CatIcon;

