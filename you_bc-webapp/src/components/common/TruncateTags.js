'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TruncateTags.less';
import {Dialog} from "material-ui";
import Tag from "./Tag";

class TruncateTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState({expanded: ! this.state.expanded});
    }

    render() {
        return (
            <span className="truncate-tags-wrapper" onClick={this.clickHandler}>
                {this.props.tags.map(tag =>
                    <div key={tag} className="--tag">
                        <Tag text={tag} bkgColor={this.props.secondColor} textColor={this.props.color}/>
                    </div>)
                }
                <Dialog
                    open={this.state.expanded}
                    title={this.props.modalTitle}
                    onRequestClose={this.clickHandler}
                    bodyStyle={{display: 'flex', flexWrap: 'wrap'}}
                >
                    {this.props.tags.map(tag =>
                        <div key={tag} style={{padding: '5px'}}>
                            <Tag text={tag} bkgColor={this.props.secondColor} textColor={this.props.color}/>
                        </div>)
                    }
                </Dialog>
            </span>
        );
    }
}

TruncateTags.propTypes = {
    tags: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
    secondColor: PropTypes.string.isRequired,
    modalTitle: PropTypes.string.isRequired
};

export default TruncateTags;