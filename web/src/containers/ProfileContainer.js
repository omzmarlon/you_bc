import React from 'react';

// components
import ProfileTabBar from '../components/profile/ProfileTabBar';
import NavHeader from '../components/common/NavHeader';
import TextInput from "../components/common/form/TextInput";
//styles
import './ProfileContainer.less';
import {defaultIconSize} from '../styles/material/iconStyles';
// colors
import {PRIMARY_GREEN, SECONDARY_GREEN} from "../styles/constants/colors";
// icons
import SchoolIcon from 'material-ui/svg-icons/social/school';
import MenuInput from "../components/common/form/MenuInput";
import RoommatesForm from "../components/profile/forms/RoommatesForm";
import ClassmatesForm from "../components/profile/forms/ClassmatesForm";
import FriendsForm from "../components/profile/forms/FriendsForm";

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.onHandleText = this.onHandleText.bind(this);
        this.onMenuChange = this.onMenuChange.bind(this);
    }

    onHandleText(e) {
        this.setState({text: e.target.value});
    }

    onMenuChange(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <NavHeader
                    title={"个人主页"}
                    color={PRIMARY_GREEN}
                />
                <div className={'profile-container'}>

                </div>
                <RoommatesForm showForm={false}
                               location={''}
                               hometown={''}
                               motto={''}
                               tags={['a','b']}
                               locationOptions={['a','b','cc']}
                               hometownOptions={['a','b','cc']}
                               tagsOptions={['a','b','cc']}
                               onLocationChange={()=>{}}
                               onHometownChange={()=>{}}
                               onMottoChange={()=>{}}
                               onTagChange={()=>{}}
                               onDone={()=>{}}
                               onCancel={()=>{}}
                               showWeChatInput={true}
                               weChatId={''}
                               onWeChatIdChange={()=>{}}
                />
                <ClassmatesForm showForm={false}
                                major={''} courses={[]}
                                selfDescription={''}
                                tags={[]}
                                majorOptions={['cpsc','econ']}
                                coursesOptions={['cpsc','econ']}
                                tagsOptions={['cpsc','econ']}
                                onMajorChange={()=>{}}
                                onCoursesChange={()=>{}}
                                onSelfDescriptionChange={()=>{}}
                                onTagChange={()=>{}}
                                onDone={()=>{}}
                                onCancel={()=>{}}
                                showWeChatInput={true}
                                weChatId={''}
                                onWeChatIdChange={()=>{}}
                />
                <FriendsForm showForm={true}
                             faculty={''}
                             relationship={''}
                             motto={''} tags={[]}
                             facultyOptions={['a', 'n']}
                             relationshipOptions={['a', 'n']}
                             tagsOptions={['a', 'n']}
                             onFacultyChange={()=>{}}
                             onRelationshipChange={()=>{}}
                             onMottoChange={()=>{}}
                             onTagChange={()=>{}}
                             onDone={()=>{}}
                             onCancel={()=>{}}
                             showWeChatInput={true}
                             weChatId={''}
                             onWeChatIdChange={()=>{}}/>
                <ProfileTabBar onTabMain={()=>{}} onTabMatching={()=>{}} />
            </div>
        );
    }
}

export default ProfileContainer;