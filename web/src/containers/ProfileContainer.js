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
                    <TextInput
                        inputIcon={<SchoolIcon/>}
                        label={'微信号'}
                        onChange={this.onHandleText}
                        value={this.state.text}
                    />
                    <MenuInput
                        label={'提示 Label'}
                        inputIcon={<SchoolIcon/>}
                        values={['温哥华', 'UBC']}
                        //values={[]}
                        //values={'UBC'}
                        //values={''}
                        options={['温哥华', '本拿比', '加拿大',
                            'UBC', 'SFU', '北京大学',
                            '计算机', 'ReactJS', 'Angular2',
                            'Economics',
                            'PPAP', 'Mama', 'PAPA', 'Water', 'Water2', 'Water3'
                        ]}
                        onChange={this.onMenuChange}
                        textColor={SECONDARY_GREEN}
                        tagDisplay={true}
                        multiple={true}
                        tagColor={PRIMARY_GREEN}
                    />
                </div>
                <RoommatesForm showForm={true}
                               location={''}
                               hometown={''}
                               motto={''}
                               tags={[]}
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
                <ProfileTabBar onTabMain={()=>{}} onTabMatching={()=>{}} />
            </div>
        );
    }
}

export default ProfileContainer;