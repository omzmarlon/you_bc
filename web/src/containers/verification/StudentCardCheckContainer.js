'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VerificationTemplate from "../../components/verification/VerificationTemplate";

class StudentCardCheckContainer extends Component {
    render() {
        return (
            <VerificationTemplate header="验证学生身份">
                <div>hello</div>
            </VerificationTemplate>
        )
    }
}

export default StudentCardCheckContainer;