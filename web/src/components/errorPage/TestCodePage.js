import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const style = {
    position: 'fixed',
    top: '45%',
    width: '70vw'
};

class TestCodePage extends React.Component {
    render() {
        return (
            <TextField
                style={style}
                hintText="请输入内侧码"
                fullWidth={true}
                onChange={this.props.onChange}
            />
        );
    }
}

TestCodePage.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default TestCodePage;
