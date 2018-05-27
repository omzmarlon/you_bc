import React from 'react';
import warningIcon from "../../../public/images/warning.png";
import './NotFound.less';

const NotFound = () => {
    return (
        <div className="not-found">
            <img src={warningIcon} alt="Warning!"/>
            <p>The page you are looking for is not found :(</p>
        </div>
    );
};

export default NotFound;