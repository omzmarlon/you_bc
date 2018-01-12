'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';

// components
import PokeCard from './PokeCard';
import PokeAvatar from '../PokeAvatar';
import Tag from '../Tag';
import Clipboard from 'react-clipboard.js';
// constants
import {PRIMARY_YELLOW, SECONDARY_YELLOW, PRIMARY_RED, SECONDARY_RED, PRIMARY_BLUE, SECONDARY_BLUE} from '../../../styles/constants/colors';

// styling
import './MatchedUserCard.less';
import {showInfoBar} from "../../../actions/global/globalActions";

class MatchedUserCard extends React.Component {

    constructor(props) {
        super(props);
        this.notifySuccessCopy = this.notifySuccessCopy.bind(this);
    }

    notifySuccessCopy() {
        const {store} = this.context;
        store.dispatch(showInfoBar('微信号已成功复制到剪切板'));
    }

    render() {
        return (
            <PokeCard
                rightCorner={
                    <Clipboard data-clipboard-text={this.props.weChatId} onClick={this.notifySuccessCopy} style={{borderStyle: 'none'}}>
                        <CopyIcon style={{color: 'grey', height: 24, width: 24}}/>
                    </Clipboard>
                }
            >
                <div className="matched-user-card-body">
                    <PokeAvatar
                        className="matched-user-card-avatar"
                        img={this.props.avatarURL}
                    />
                    <div className="matched-user-card-info">
                        <div className="matched-user-card-text">
                            <span className="--name">{this.props.username}</span>
                            <span className="--weChat">微信号：{this.props.weChatId}</span>
                        </div>
                        <div className="matched-user-card-tags">
                            {
                                this.props.matchedAtClassmates &&
                                <Tag classNames={'--tag'} text={'找课友'} bkgColor={PRIMARY_RED} textColor={SECONDARY_RED}/>
                            }
                            {
                                this.props.matchedAtFriends &&
                                <Tag classNames={'--tag'} text={'找_友'} bkgColor={PRIMARY_YELLOW} textColor={SECONDARY_YELLOW}/>
                            }
                            {
                                this.props.matchedAtRoommates &&
                                <Tag classNames={'--tag'} text={'找室友'} bkgColor={PRIMARY_BLUE} textColor={SECONDARY_BLUE}/>
                            }
                        </div>
                    </div>
                </div>
            </PokeCard>
        );
    }
}

MatchedUserCard.propTypes = {
    avatarURL: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    weChatId: PropTypes.string.isRequired,
    matchedAtClassmates: PropTypes.bool.isRequired,
    matchedAtRoommates: PropTypes.bool.isRequired,
    matchedAtFriends: PropTypes.bool.isRequired,
};

MatchedUserCard.contextTypes = {
    store: PropTypes.object
};

export default MatchedUserCard;
