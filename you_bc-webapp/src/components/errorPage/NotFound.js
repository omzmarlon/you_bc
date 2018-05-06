import React from 'react';
import warningIcon from "../../../public/images/warning.png";
import './NotFound.less';

const NotFound = () => {
    return (
        <div className="not-found">
            <img src={warningIcon} alt="Warning!"/>
            <p>同学，没事别随便乱看哦</p>
        </div>
    );
};

export default NotFound;