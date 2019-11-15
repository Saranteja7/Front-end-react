import React, { Component } from "react";
export default class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.clear();
        this.props.history.push('/', this.state)
        window.location.reload();
        this.state = {
            status: 'loading',
            loggedIn: 'false'
        }
    }
    render() {
        return (
            <div className="container">

            </div>
        );
    }
}