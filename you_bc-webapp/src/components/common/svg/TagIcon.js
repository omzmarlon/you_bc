"use strict";

import React from 'react';
import SvgIcon from "material-ui/SvgIcon";

const TagIcon = (props) => (
    <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M129.414,763.586l-15.829,15.829a2,2,0,0,1-2.828,0L98.585,767.243a2,2,0,0,1,0-2.828l15.829-15.829a2,2,0,0,1,1.414-.586H128a2,2,0,0,1,2,2v12.171A2,2,0,0,1,129.414,763.586Zm-28,2.243,10.757,10.758,2.148-2.148-10.758-10.757ZM127,751H116.243l-10.561,10.561,10.758,10.757L127,761.757V751Zm-6,4a2,2,0,1,1-2,2A2,2,0,0,1,121,755Z" transform="translate(-98 -748)"/>
    </SvgIcon>
);

export default TagIcon;
