import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux'

const style = {
    display: 'flex',
    justifyContent: 'center'
};

class GlobalSpinner extends Component {
    render() {
        return (
            <Dialog
                modal={true}
                open={this.props.open}
                contentStyle={style}
            >
                <CircularProgress />
            </Dialog>
        );
    }

}

GlobalSpinner.propTypes = {
    open: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    open: state.global.globalLoading
});

export default connect(mapStateToProps)(GlobalSpinner);
