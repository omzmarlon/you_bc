'use strict';
// libs
import React from 'react'
import PropTypes from 'prop-types';
import BackArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import IconButton from 'material-ui/IconButton';
import {PRIMARY_WHITE} from "../../styles/constants/colors";
import "./NavHeader.less";
import "../../styles/constants/fonts.less";

class NavHeader extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        if (this.props.onClickGoBack) {
            this.props.onClickGoBack();
        } else {
            window.history.back();
        }
    }

    render() {
        return (
            <div className={'nav-header'} style={{backgroundColor: this.props.color}}>
                <div className={"left-action"}>
                    <IconButton onClick={this.goBack} style={{padding: 6}} iconStyle={{width: 36, height: 36}}>
                        <BackArrow color={PRIMARY_WHITE} />
                    </IconButton>
                </div>
                <div className={"header-font header-title"} style={{color: PRIMARY_WHITE}}>
                    {this.props.title}
                </div>
                <div className={"right-action"}>
                    {this.props.iconRight}
                </div>
            </div>
        );
    }
}

NavHeader.propTypes = {
    title: PropTypes.string.isRequired,
    iconRight: PropTypes.element,
    color: PropTypes.string.isRequired,
    onClickGoBack: PropTypes.func,
};

export default NavHeader;