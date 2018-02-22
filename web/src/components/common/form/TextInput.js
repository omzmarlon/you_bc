import React from 'react';
import PropTypes from 'prop-types';
import InfoRow from "../InfoRow";
import TextField from 'material-ui/TextField';
import "./TextInput.less";
const _ = require('lodash/Lang');

class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorText: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            errorText: nextProps.errorText
        });
    }

    handleChange(event, newValue) {
        const wordLength = _.toString(newValue).length;
        if (!this.props.wordLimit || wordLength <= this.props.wordLimit) {
            if (this.state.errorText) {
                this.setState({errorText: ''});
            }
            this.props.onChange(event, newValue);
        } else {
            this.setState({
                errorText: `超出字符上线: ${this.props.wordLimit}`
            });
        }
    }

    render() {
        return (
            <InfoRow
                className={`text-input ${this.props.classNames}`}
                leftElement={this.props.inputIcon}
                rightElement={
                    <TextField
                        // 1.keep some space from left-icon. 2. input text font size
                        style={{marginLeft: 15}}
                        hintText={this.props.label}
                        fullWidth={true}
                        errorText={this.state.errorText}
                        onChange={this.handleChange.bind(this)}
                        value={this.props.value}
                        type={this.props.type}
                        onFocus={this.props.onFocus}
                        rows={this.props.rows}
                        rowsMax={this.props.rowsMax}
                        multiLine={this.props.multiLine}
                    />
                }
            />
        );
    }
}

TextInput.propTypes = {
    classNames: PropTypes.string,
    inputIcon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    errorText: PropTypes.string,
    type: PropTypes.string,
    onFocus: PropTypes.func,
    rows: PropTypes.number.isRequired,
    rowsMax: PropTypes.number.isRequired,
    multiLine: PropTypes.bool.isRequired,
    wordLimit: PropTypes.number,
};

TextInput.defaultProps = {
    rows: 1,
    rowsMax: 1,
    multiLine: false
};

export default TextInput
