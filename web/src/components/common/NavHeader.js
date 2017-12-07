'use strict';
// libs
import React from 'react'
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import BackArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import IconButton from 'material-ui/IconButton';

class NavHeader extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        console.log('going back!');
    }

    render() {
        return (
            <AppBar
                className='nav-header'
                style={{
                    backgroundColor: this.props.color,
                    position: 'fixed',
                    top: 0
                }}
                title={this.props.title}
                iconElementLeft={
                    <IconButton onClick={this.goBack}>
                        <BackArrow />
                    </IconButton>
                }
                iconElementRight={this.props.actionRight}
                titleStyle={{
                    textAlign: 'center'
                }}
            />
        );
    }
}

NavHeader.propTypes = {
    title: PropTypes.string.isRequired,
    actionRight: PropTypes.element,
    color: PropTypes.string.isRequired
};
export default NavHeader;