import React, { Component } from 'react';
import {RaisedButton} from "material-ui";
import SurveyCompleteModal from "./common/modal/SurveyCompleteModal";
import MatchSuccessModal from "./common/modal/MatchSuccessModal";
import avatar from '../../public/images/us_08.png';
import MissingProfileInfoModal from "./common/modal/MissingProfileInfoModal";

class DemoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSurveyCompleteModal: false,
            openMatchSuccessModal: false,
            openMissingProfileInfoModal: false
        }
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <RaisedButton
                            label="SurveyCompleteModal"
                            onClick={() => {this.setState({openSurveyCompleteModal: true})}}
                        />
                        <SurveyCompleteModal
                            onClose={() => {this.setState({openSurveyCompleteModal: false})}}
                            openModal={this.state.openSurveyCompleteModal}
                        />
                    </li>
                    <br/>
                    <li>
                        <RaisedButton
                            label="MatchSuccessModal"
                            onClick={() => {this.setState({openMatchSuccessModal: true})}}
                        />
                        <MatchSuccessModal
                            addWeChat={() => {}}
                            onClose={() => {this.setState({openMatchSuccessModal: false})}}
                            openModal={this.state.openMatchSuccessModal}
                            img={avatar}
                            name="小木屋"
                            weChatId="UBC破壳"
                        />
                    </li>
                    <br/>
                    <li>
                        <RaisedButton
                            label="MissingProfileInfoModal"
                            onClick={() => {this.setState({openMissingProfileInfoModal: true})}}
                        />
                        <MissingProfileInfoModal
                            onClose={() => {this.setState({openMissingProfileInfoModal: false})}}
                            openModal={this.state.openMissingProfileInfoModal}
                            content="您还没有填写找课友相关信息，信息完整后才能继续匹配😊 请填写个人主页中找课友（红色部分）信息"
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

export default DemoContainer;