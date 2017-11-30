'use strict';
// libs
import React, {Component} from 'react'
import { Route, Switch} from 'react-router-dom'
// components
import NotFound from '../components/NotFound'
import IndexPage from './IndexPage'
import Classmate from './Classmate'
import Roommate from './Roommate'
import Friend from './Friend'
import Demo from '../components/demo/index';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={IndexPage}/>
                <Route path='/classmates' component={Classmate}/>
                <Route path='/friends' component={Friend}/>
                <Route path='/roommates' component={Roommate}/>
                <Route path='/demo' component={Demo}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

export default App;