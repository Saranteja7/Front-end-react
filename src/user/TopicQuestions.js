import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Questions.css';
import userService from "../services/Services";
export default class TopicQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            statusType: '',
            displayType: 'hidden',
            questionStatus: '',
            message: '',
            questions: [],
            tags: new Set(),
            topics: new Set(),
            questionToAdd: '',
        }

    }
    removeTag(tag) {
        this.state.tags.delete(tag)
        this.setState({
            tags: this.state.tags
        })
    }
    addTag = event => {
        this.state.tags.add(event.target.value)
        this.setState({
            tags: this.state.tags
        })
    }


    addQuestion = event => {
        this.state.questionToAdd = event.target.value
        this.setState({
            questionToAdd: this.state.questionToAdd
        })
    }

    askQuestion = event => {
        event.preventDefault();
        if (this.state.questionToAdd === '' || this.state.tags.size === 0 || this.state.questionToAdd.trim() === '') {
            if (this.state.questionToAdd === '' || this.state.questionToAdd.trim() === '') {
                this.setState({
                    statusType: 'danger',
                    displayType: 'display',
                    questionStatus: 'Error!',
                    message: 'Invalid Question!'
                })
            }
            else
                this.setState({
                    statusType: 'danger',
                    displayType: 'display',
                    questionStatus: 'Error!',
                    message: 'Add Topic!'
                })
        }
        else {
            let send = {
                question: this.state.questionToAdd,
                postedBy: localStorage.getItem('id'),
                topic: Array.from(this.state.tags)
            }
            userService.addQuestion(send).then(
                res => {
                    this.setState({
                        statusType: 'success',
                        displayType: '',
                        questionStatus: 'Success!',
                        message: 'Question Added successfully!',
                    })
                    this.componentDidMount()

                },
                err => {
                    this.setState({
                        statusType: 'danger',
                        displayType: '',
                        questionStatus: 'Error!',
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

            this.setState({
                statusType: 'success',
                displayType: 'display',
                questionStatus: 'Success!',
                message: 'Asked Question successfully!'
            })
        }
    }
    handleClose = (event) => {
        event.preventDefault();
        this.setState({
            statusType: '',
            displayType: 'hidden',
            questionStatus: '',
            message: ''
        })
    }

    render() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/login")
        }
        return (
            <div className="container">
                <div className={`alert alert-${this.state.statusType} alert-dismissible fade in ${this.state.displayType}`}>
                    <a href="#" class="close" aria-label="close" onClick={this.handleClose}>&times;</a>
                    <strong>{this.state.questionStatus}</strong> {this.state.message}
                </div>
                <div className="panel panel-success">
                    <div className="panel-heading">Ask a Question</div>
                    <textarea required placeholder="Question goes here . . ." onChange={this.addQuestion} name="questionToAdd" type="text" className="panel-body form-control question-area-edit" />
                    <div className="panel-body tag-body-edit">
                        <div className="tags-label">
                            <font className="topic-font-edit">Topics</font>
                        </div>
                        <div className="tags-list">
                            {
                                Array.from(this.state.tags).map((tag) => (

                                    < font className="tag-edit" > <Link onClick={this.removeTag.bind(this, tag)}><span className="glyphicon glyphicon-remove" ></span></Link> &nbsp;&nbsp;{tag.toUpperCase()}</font>
                                ))
                            }
                        </div>
                    </div>
                    <br />
                    <div className="panel-body tag-body-edit2">
                        <div className="form-inline">
                            <label>
                                Select Topics : &nbsp;
                            </label>
                            <select className="form-control selection" name="addedTag" onChange={this.addTag}>
                                <option selected disabled value="">Topics</option>
                                {
                                    Array.from(this.state.topics).map(topic => (
                                        <option value={topic}>{topic.toUpperCase()}</option>
                                    ))
                                }
                            </select> &nbsp;&nbsp;
                            <Link onClick={this.askQuestion} className="btn btn-success">Ask Question</Link>
                        </div>
                    </div>


                </div>
                <hr />
                {
                    Array.from(this.state.questions).map(question => (
                        <div className="panel panel-default">
                            <div className="panel-heading panel-head-edit">
                                Topics :&nbsp;&nbsp;
                                {
                                    question.topic.map((topic, index) => (
                                        <font>

                                            {topic.toUpperCase()}{index < question.topic.length - 1 && <>,&nbsp;</>}
                                        </font>
                                    ))
                                }
                            </div>
                            <div className="panel-body">{question.question}</div>
                            <div className="panel-body">
                                <Link to={`/question/${question.id}`} className="goto">
                                    <button className="btn btn-success">Go to Question</button>
                                </Link>
                            </div>
                        </div>
                    ))
                }

            </div >
        );
    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            loggedIn: token !== null
        })
        userService.getQuestions().then(res => {
            let data = []
            res.data.map(
                question => {
                    // console.log(question.topic.includes("json"))
                    if (question.topic.includes(this.props.match.params.topic)) {
                        data.push(question)
                        console.log(this.state.questions)
                    }
                }

            )

            this.state.questions = data
            this.setState({
                questions: this.state.questions
            })

            // this.state.questions = res.data
            // this.setState({
            //     questions: this.state.questions
            // })
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