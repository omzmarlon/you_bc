import React from 'react';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';

// A general container of modal
// pass in any custom content and the modal will resize accordingly
const Modal = (props) => {
    return (
        <Dialog
            modal={true}
            open={props.open}
            contentStyle={{
                width: '80%',
                maxWidth: 'none'
            }}
        >
            {props.children}
        </Dialog>
    );
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired
};

export default Modal;
