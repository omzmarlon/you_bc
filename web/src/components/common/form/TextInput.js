import React from 'react';
import PropTypes from 'prop-types';
import InfoRow from "../InfoRow";
import TextField from 'material-ui/TextField';
import "./TextInput.less";

const TextInput = (props) => {
    return (
        <InfoRow
            className={`text-input ${props.classNames}`}
            leftElement={props.inputIcon}
            rightElement={
                <TextField
                    // 1.keep some space from left-icon. 2. input text font size
                    style={{marginLeft: 15}}
                    hintText={props.label}
                    fullWidth={true}
                    errorText={props.errorText}
                    onChange={props.onChange}
                    value={props.value}
                    type={props.type}
                />
            }
        />
    );
};

TextInput.propTypes = {
    classNames: PropTypes.string,
    inputIcon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    errorText: PropTypes.string,
    type: PropTypes.string,
};

export default TextInput
