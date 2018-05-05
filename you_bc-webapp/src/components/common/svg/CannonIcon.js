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
    fill:'#fff',
};

const style2 = {
    ...common,
    fill: 'none',
};

const style3 = {
    ...common,
    fill: 'none',
    strokelinecap: 'round',
};

const CannonIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 800 800">
        <path style={style1} d="M411.48,509.12a69.7,69.7,0,0,1-126,59.47"/>
        <path style={style1} d="M240,563.66s-.65-.08-1.79-.29A112.57,112.57,0,1,0,444.7,480.15"/>
        <path style={style2} d="M630.74,225.81s-55.64-81.62-66.27-75.48-27,5.88-22.45,35.76c8.32,54.37-361.2,37.52-399.85,208.05,0,0-20.41,49.09,12.69,106.42,29.13,50.46,74,61.09,83.39,62.81A112.57,112.57,0,0,1,444.7,480.15c84.1-78.56,151.1-177.95,175.58-158.53,23.4,18.58,31.42,4.37,42.06-1.77S630.74,225.81,630.74,225.81Z"/>
        <path style={style1} d="M411.48,509.12a69.7,69.7,0,1,0-126,59.47"/>
        <path style={style3} d="M210.2,304.71s13.52-18.74-15.6-20.07,0-39.71,0-39.71"/>
    </SvgIcon>
);

export default CannonIcon;

