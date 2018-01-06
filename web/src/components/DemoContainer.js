import React, { Component } from 'react';
import {RaisedButton} from "material-ui";
import SurveyCompleteModal from "./profile/SurveyCompleteModal";

class DemoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSurveyCompleteModal: false
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

                </ul>
            </div>
        );
    }
}

export default DemoContainer;