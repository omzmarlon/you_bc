import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

class TestCodePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            testCode: ''
        };
        this.onCodeChange = this.onCodeChange.bind(this);
    }

    onCodeChange(event, newValue) {
        this.setState({testCode: newValue});
    }

    render() {
        return (
            <Dialog
                title={'请输入内测授权码'}
                modal={true}
                open={this.state.testCode !== 'pokedemo'}
                contentStyle={{
                    width: '100%'
                }}
            >
                <TextField
                    hintText="请输入内测授权码"
                    fullWidth={true}
                    onChange={this.onCodeChange}
                />
            </Dialog>
        );
    }
}

export default TestCodePage;
