import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

const style = {
    width: '100%'
};

const AvatarBar = (props) => (
    <div style={style}>
        <Avatar icon={<AddIcon/>}/>
    </div>
);

export default AvatarBar;
