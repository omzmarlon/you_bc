import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import './LoadingModal.less';

const LoadingModal = (props) => {
    return (
        props.show && <div className="loading-modal-container">
            <CircularProgress />
        </div>
    );
};

LoadingModal.propTypes = {
    show: PropTypes.bool.isRequired
};

export default LoadingModal;
