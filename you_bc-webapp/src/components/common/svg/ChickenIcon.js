'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const common = {
    stroke: '#fff',
    strokeWidth: 40
};

const style1 = {
    ...common,
    fill:'#fff',
    strokeMiterLimit: 10
};

const style2 = {
    ...common,
    strokeMiterlimit: 10,
    fill: 'none',
    strokelinecap: 'round'
};

const style3 = {
    ...common,
    fill: 'none',
    strokelinecap: 'round',
    strokelinejoin: 'round'
};

const style4 = {
    ...common,
    strokeMiterlimit: 10,
    fill: 'none'
};

const ChickenIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 800 800">
        <path style={style1} d="M240.29,208.7s-30.27-4-21.63-22.22c6.48-13.68,19.16-6.84,25.1-2.56a36.29,36.29,0,0,1,3.21,2.56s-5.28-71,35-14.87c0,0,45.59-57.85,26.39,24.34"/>
        <path style={style2} d="M427.53,567.47v48.71a10.45,10.45,0,0,1-13.63,10,111.06,111.06,0,0,0-67.62.1"/>
        <path style={style3} d="M371.85,650s4.47-18.27,55.68-18.27"/>
        <path style={style4} d="M623.71,313.18c-37.22,47.7-77,47.77-77,47.77-187,35.94-189.41-8.7-202.44-20.54s0-67.34,0-67.34c-5.92-54.31-30.51-67.68-30.51-67.68s-22.89-18.49-59.55-3.72q-4,1.59-8.13,3.72c-41.38,21.25-45.31,67.68-45.31,67.68-20.83,3.18-43.06,18.53-43.38,25.14-.65,13.39,41.95,19.93,41.95,19.93s45.49,34.11,1.43,98,133.55,212.69,293.85,129S660.93,265.49,623.71,313.18ZM257.83,266.74a7.28,7.28,0,1,1,7.28-7.28A7.28,7.28,0,0,1,257.83,266.74Z"/>
    </SvgIcon>
);

export default ChickenIcon;

