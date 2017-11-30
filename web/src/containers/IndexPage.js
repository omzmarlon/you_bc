'use strict';
// libs
import React, {Component} from 'react'
//styles
import '../styles/indexpage.less';
//components
import Block from "../components/IndexPage/Block";

class IndexPage extends Component {
    render() {
        return(
            <div className="index-page-main">
                <Block path="/classmates" displayName="找课友" className="index-page-block__classmates"/>
                <Block path="/friends" displayName="找——友" className="index-page-block__friends"/>
                <Block path="/roommates" displayName="找室友" className="index-page-block__roommates"/>
            </div>
        )
    }
}

export default IndexPage;