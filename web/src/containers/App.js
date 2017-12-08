'use strict';
// libs
import React, {Component} from 'react'
import { Route, Switch} from 'react-router-dom'
// components
import NotFound from '../components/NotFound'
import HomePageContainer from './HomePageContainer'
import ClassmateContainer from './ClassmateContainer'
import RoommateContainer from './RoommateContainer'
import FriendContainer from './FriendContainer'
import Demo from '../components/demo/Demo';
// constants
import {CLASSMATES, FRIENDS, ROOMMATES} from "../constants/api";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={HomePageContainer}/>
                <Route path={CLASSMATES} component={ClassmateContainer}/>
                <Route path={FRIENDS} component={FriendContainer}/>
                <Route path={ROOMMATES} component={RoommateContainer}/>
                <Route path='/demo' component={Demo}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

export default App;