'use strict';
// libs
import React, {Component} from 'react'
import { Route, Switch} from 'react-router-dom'
// components
import NotFound from '../components/errorPage/NotFound'
import AuthFacade from "./AuthFacade";
import ClassmateContainer from './ClassmateContainer'
import RoommateContainer from './RoommateContainer'
import FriendContainer from './FriendContainer'
import ProfileContainer from './ProfileContainer'
import LocationCheckContainer from "./verification/LocationCheckContainer";
import EmailCheckContainer from "./verification/EmailCheckContainer";
import StudentCardCheckContainer from "./verification/StudentCardCheckContainer";
// constants
import {
    TO_CLASSMATES, TO_FRIENDS, TO_PROFILE, TO_ROOMMATES
} from "../constants/api";
import DemoContainer from "../components/DemoContainer";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={AuthFacade}/>
                <Route path={TO_CLASSMATES} component={ClassmateContainer}/>
                <Route path={TO_FRIENDS} component={FriendContainer}/>
                <Route path={TO_ROOMMATES} component={RoommateContainer}/>
                <Route path={TO_PROFILE} component={ProfileContainer}/>
                <Route path='/demo' component={DemoContainer}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

export default App;