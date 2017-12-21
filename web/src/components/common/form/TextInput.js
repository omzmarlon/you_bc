import React from 'react';
import PropTypes from 'prop-types';
import InfoRow from "../InfoRow";
import TextField from 'material-ui/TextField';
import "./TextInput.less";

const TextInput = (props) => {
    return (
        <InfoRow
            className={'text-input'}
            leftElement={props.inputIcon}
            rightElement={
                <TextField
                    // 1.keep some space from left-icon. 2. input text font size
                    style={{marginLeft: 25, fontSize: 55}}
                    // The underline position has to be adjusted after font resize
                    underlineStyle={{position: 'relative', top: 10}}
                    underlineFocusStyle={{position: 'relative', top: 10}}
                    hintText={props.label}
                    fullWidth={true}
                    errorText={props.errorText}
                    onChange={props.onChange}
                    value={props.value}
                />
            }
        />
    );
};

TextInput.propTypes = {
    inputIcon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    errorText: PropTypes.string,
};

export default TextInput
