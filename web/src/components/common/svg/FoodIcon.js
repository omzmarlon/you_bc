'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const common = {
    stroke: '#fff',
    strokeMiterlimit: 10
};

const style1 = {
    ...common,
    fill: '#fff',
    strokeWidth: 20
};

const style2 = {
    ...common,
    fill: 'none',
    strokeWidth: 40
};

const style3 = {
    ...common,
    fill: '#fff',
};

const FoodIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 800 800">
        <path style={style1} d="M661,390.3c-4.7,95.9-61.1,178.21-141.89,219.68V637.7a12.3,12.3,0,0,1-12.3,12.3H293a12.3,12.3,0,0,1-12.3-12.3V609.89C200,568.4,143.66,486.13,139,390.3a12.34,12.34,0,0,1,12.28-13H648.76A12.34,12.34,0,0,1,661,390.3Z"/>
        <path style={style2} d="M627.27,377.27H172.73C172.73,251.76,274.49,150,400,150S627.27,251.76,627.27,377.27Z"/>
        <circle style={style3} cx="411.02" cy="189.05" r="4.82"/>
        <circle style={style3} cx="426.85" cy="221.57" r="4.82"/>
        <circle style={style3} cx="467.4" cy="212.96" r="4.82"/>
        <circle style={style3} cx="510.43" cy="238.01" r="4.82"/>
    </SvgIcon>
);

export default FoodIcon;

