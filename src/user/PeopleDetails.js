import React from 'react';
import { Link } from 'react-router-dom';
import './PeopleDetails.css';
import MyProfile from './MyProfile'
export default class QuestionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    render() {
        if (localStorage.getItem('id') === this.props.match.params.id) {
            this.props.history.push("/myprofile")
        }
        return (
            <div>
                <MyProfile id={this.props.match.params.id} />
            </div>
        );
    }
}