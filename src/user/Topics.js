import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Topic.css';
import userService from "../services/Services";
export default class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            statusType: '',
            displayType: 'hidden',
            topicStatus: '',
            message: '',
            status: 'loading',
            topicName: '',
            topics: new Set(),
            e1: (
                <div></div>
            )
        }

    }
    addTopic = event => {
        if (this.state.topicName !== null && this.state.topicName.trim() !== '') {

            userService.addTopic(this.state.topicName.trim()).then(
                res => {
                    this.setState({
                        statusType: 'success',
                        displayType: '',
                        topicStatus: 'Success!',
                        message: 'Topic Added successfully!',
                    })
                    this.componentDidMount()
                },
                err => {
                    this.setState({
                        statusType: 'danger',
                        displayType: '',
                        topicStatus: 'Error!',
                        message: "Something went wrong.",
                    })
                }
            ).catch(err => {
                this.setState({
                    statusType: 'danger',
                    displayType: '',
                    topicStatus: 'Error!',
                    message: "Something went wrong.",
                })
            })

            document.getElementById('close-btn').click();

        }
        else {
            console.log(this.state.e1)
            document.getElementById('close-btn').click();
            this.setState({
                statusType: 'danger',
                displayType: '',
                topicStatus: 'Error!',
                message: "Topic name can't be empty!",
            })

        }
    }
    handleClose = (event) => {
        event.preventDefault();
        this.setState({
            statusType: '',
            displayType: 'hidden',
            topicStatus: '',
            message: ''
        })
    }

    changeTopicName = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.topicName);
    }
    render() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/login")
        }
        return (
            <div className="container">
                <div className={`alert alert-${this.state.statusType} alert-dismissible fade in ${this.state.displayType}`}>
                    <a href="#" class="close" aria-label="close" onClick={this.handleClose}>&times;</a>
                    <strong>{this.state.topicStatus}</strong> {this.state.message}
                </div>
                <h3 className="align-heading">Topics Available</h3>
                <div className="row">
                    {

                        Array.from(this.state.topics).map(topic => (
                            <Link to={`/topicquestions/${topic}`}>
                                <div className="col-lg-2 list-edit">
                                    {topic.toUpperCase()}
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <br />
                <hr className="col-xs-12" />
                <br />
                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Topic</button>

                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add Topic</h4>
                            </div>
                            <div className="modal-body">
                                {/* <form className="form-inline" onSubmit={this.addTopic}> */}
                                <h3 className="display-3">Topic Name</h3>
                                <div className="form-group">
                                    <input type="text" className="form-control" required id="topicName" onChange={this.changeTopicName} placeholder="Topic Name" name="topicName" />
                                </div>
                                <br />
                                <br />
                                <button type="submit" className="btn btn-success btn-sm" onClick={this.addTopic}>Add Topic</button>
                                {/* </form> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" id="close-btn" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            loggedIn: token !== null
        })
        userService.getTopics().then(res => {
            res.data.map(topic => {
                this.state.topics.add(topic.topicName)
            })
            this.setState({
                topics: this.state.topics
            })
        })
    }
}