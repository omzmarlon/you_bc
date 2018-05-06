'use strict';

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

const common = {
    stroke: '#fff',
    strokeMiterlimit: 10,
    strokeWidth: 40,
    strokelinecap: 'round',
    fill: 'none'
};

const WaveIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 800 800">
        <path style={common} d="M150,244.43c50,0,50,48,100,48s50-48,100-48,50,48,100,48,50-48,100-48,50,48,100,48"/>
        <path style={common} d="M150,376c50,0,50,48,100,48s50-48,100-48,50,48,100,48,50-48,100-48,50,48,100,48"/>
        <path style={common} d="M150,507.58c50,0,50,48,100,48s50-48,100-48,50,48,100,48,50-48,100-48,50,48,100,48"/>
    </SvgIcon>
);

export default WaveIcon;

