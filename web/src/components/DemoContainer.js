import React, { Component } from 'react';
import {RaisedButton} from "material-ui";
import SurveyCompleteModal from "./profile/SurveyCompleteModal";
import MatchSuccessModal from "./mainlist/MatchSuccessModal";
import avatar from '../../public/images/us_08.png';

class DemoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSurveyCompleteModal: false,
            openMatchSuccessModal: false,
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
                </ul>
            </div>
        );
    }
}

export default DemoContainer;