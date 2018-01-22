import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import Badge from 'material-ui/Badge';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AvatarEditorForm from "../forms/AvatarEditorForm";
import {showAvatarForm} from "../../../actions/profile/profileUIActions";

const style = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const AvatarBar = (props) => (
    <div style={style}>
        {/*add icon will be displayed when img empty*/}
        <Badge
            badgeContent={<EditIcon style={{width: 18, height: 18}}/>}
            badgeStyle={{top: 16, right: 16}}
        >
            <Avatar icon={<AddIcon/>}
                    src={props.avatar}
                    size={70}
                    onClick={props.showAvatarForm}
            />
        </Badge>
        <AvatarEditorForm/>
    </div>
);

AvatarBar.propTypes = {
    avatar: PropTypes.string.isRequired,
    showAvatarForm: PropTypes.func.isRequired
};

const mapStateToProps = (states, ownProps) => ({
    avatar: states.profile.personal.values.avatar
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        showAvatarForm: showAvatarForm
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AvatarBar);
