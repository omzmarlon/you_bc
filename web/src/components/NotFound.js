import React from 'react';
import warningIcon from "../../public/warning.png";
import '../styles/notfound.less';

const NotFound = () => {
    return (
        <div className="not-found">
            <img src={warningIcon}/>
            <p>此内容因违规无法查看</p>
        </div>
    );
};

export default NotFound;