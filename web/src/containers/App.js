'use strict';

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dummy from '../components/Dummy';
import * as actionCreators from '../actions';

const mapStateToProps = (state, ownProps) => ({
    counter: state.example.counter,
    name: (process.env.NODE_ENV !== 'production') ? "dev app" : "prod app"
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dummy);
