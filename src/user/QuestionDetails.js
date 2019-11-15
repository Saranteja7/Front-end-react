import React from 'react';
import { Link } from 'react-router-dom';
import './QuestionDetails.css';
import userService from '../services/Services';
let cnt = 4;
export default class QuestionDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: true,
            statusType: '',
            displayType: 'hidden',
            answerStatus: '',
            message: '',
            status: 'loading',
            questionId: '',
            question: '',
            answers: new Set(),
            topics: new Set(),
            tags: new Set(),
            questionId: this.props.match.params.id,
            answer: '',
            followQuestion: new Set(),
            reportQuestion: new Set(),

        }

    }
    handleClose = (event) => {
        event.preventDefault();
        this.setState({
            statusType: '',
            displayType: 'hidden',
            answerStatus: '',
            message: ''
        })
    }
    changeAnswer = (event) => {
        this.setState({
            answer: event.target.value
        })
    }


    handleFollowQuestion = event => {
        const followData = {
            qId: this.state.questionId,
            uId: localStorage.getItem('id')
        }
        userService.followQuestion(followData).then(
            res => {
                this.componentDidMount()
            },
            err => {
                alert("error");
            }
        )
    }

    handleReportQuestion = event => {
        const reportData = {
            qId: this.state.questionId,
            uId: localStorage.getItem('id')
        }
        userService.reportQuestion(reportData).then(
            res => {
                this.componentDidMount()
            },
            err => {
                alert("error");
            }
        )
    }


    handleUpVoteAnswer(answerId) {
        const upVoteData = {
            aId: answerId,
            uId: localStorage.getItem('id')

        }
        userService.upVoteAnswer(upVoteData).then(
            res => {
                this.componentDidMount();
            },
            err => {
                alert("error")
            }
        )
    }

    handleReportAnswer(answerId) {
        const reportData = {
            aId: answerId,
            uId: localStorage.getItem('id')
        }
        userService.reportAnswer(reportData).then(
            res => {
                this.componentDidMount();
            },
            err => {
                alert("error")
            }
        )
    }



    addAnswer = (event) => {
        if (this.state.answer !== '' && this.state.answer.trim() !== '') {
            var answerData = {
                answer: this.state.answer,
                answeredBy: localStorage.getItem('id'),
                questionId: this.props.match.params.id
            }
            userService.addAnswer(answerData).then(
                res => {
                    this.componentDidMount();
                },
                err => {
                    console.log("error");
                }
            )

            this.setState({
                statusType: 'success',
                displayType: 'display',
                answerStatus: 'Success!',
                message: 'Answer posted successfully!'
            })

        }
        else {
            this.setState({
                statusType: 'danger',
                displayType: 'display',
                answerStatus: 'Error!',
                message: 'Invalid answer!'
            })
        }
    }
    render() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/login")
        }
        let data;
        switch (this.state.status) {
            case 'loading':
                data = (
                    <div className="container">
                        <h1>Loading...</h1>
                    </div>
                )
                break;

            case 'loaded':
                data = (
                    <div className="panel panel-default">
                        <div className="panel-heading panel-head-edit">
                            Topics :&nbsp;&nbsp;
                        {
                                Array.from(this.state.topics).map((topic, index) => (
                                    <font>
                                        {topic.toUpperCase()}{index < this.state.topics.size - 1 && <>,&nbsp;</>}
                                    </font>
                                ))
                            }
                        </div>
                        <div className="panel-body">
                            {this.state.question}
                            <div className="row">
                                <div className="col-sm-8">
                                </div>
                                <div className="col-sm-2">
                                    {this.state.followQuestion.has(localStorage.getItem('id')) ? <button className="btn btn-success disabled">Following Question</button> : <button onClick={this.handleFollowQuestion} className="btn btn-success">Follow Question</button>}
                                </div>
                                <div className="col-sm-2">
                                    {this.state.reportQuestion.has(localStorage.getItem('id')) ? <button className="btn btn-danger disabled">Reported Question</button> : <button onClick={this.handleReportQuestion} className="btn btn-danger">Report Question</button>}
                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className="panel-body">
                            <h3 className="answer-heading">Answers : </h3>
                            <div className="container sub-container">
                                <div className="panel panel-success">
                                    <div className="panel-heading">Add Answer</div>
                                    <textarea placeholder="Answer goes here . . ." onChange={this.changeAnswer} required name="answer" type="text" className="panel-body form-control question-area-edit" />
                                    <div className="panel-body">
                                        <button className="btn btn-primary" onClick={this.addAnswer}>
                                            Answer
                                        </button>
                                    </div>
                                </div>
                                <br />
                                {
                                    Array.from(this.state.answers).map(answer => (
                                        console.log("2", this.state.answers),
                                        <div className="answers">
                                            <div>
                                                <b>Answer : </b>
                                                <code>{answer.answer}</code>
                                            </div>
                                            <div className="answeredBy">
                                                answered by @{answer.answeredBy}
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-9">
                                                </div>
                                                <div>
                                                    {answer.upVotes.has(localStorage.getItem('id')) ? <button className="btn btn-success disabled">Up Voted</button> : <button onClick={this.handleUpVoteAnswer.bind(this, answer.answerId)} className="btn btn-success">Up Vote</button>}
                                                    &nbsp;&nbsp;
                                                    {answer.reports.has(localStorage.getItem('id')) ? <button className="btn btn-danger disabled">Reported</button> : <button onClick={this.handleReportAnswer.bind(this, answer.answerId)} className="btn btn-danger">Report</button>}
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
                break;
            default:
                data = (
                    <div className="container">
                        <h2>Oops! something went wrong.</h2>
                    </div>
                )
                break
        }
        return (
            <div className="container">
                <div className={`alert alert-${this.state.statusType} alert-dismissible fade in ${this.state.displayType}`}>
                    <a href="#" class="close" aria-label="close" onClick={this.handleClose}>&times;</a>
                    <strong>{this.state.answerStatus}</strong> {this.state.message}
                </div>
                {data}
            </div>
        )
    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            status: 'loaded',
            loggedIn: token !== null,
            questionId: '',
            question: '',
            answers: new Set(),
            topics: new Set(),
            tags: new Set(),
        })
        userService.getByQuestionId(this.props.match.params.id).then(
            res => {
                this.setState({
                    questionId: res.data.id,
                    question: res.data.question,
                    topics: new Set(res.data.topic),
                    followQuestion: new Set(res.data.followers),
                    reportQuestion: new Set(res.data.reportedBy)

                })
            }
        )
        userService.getAnswersByQuestionId(this.props.match.params.id).then(
            res => {
                res.data.map(answerData => {
                    userService.findUserDetailsById(answerData.answeredBy).then(
                        res2 => {
                            // let answersList = []
                            // answersList.push
                            this.state.answers.add({ answerId: answerData.id, answer: answerData.answer, answeredBy: res2.data.firstName, upVotes: new Set(answerData.upvotes), reports: new Set(answerData.reports) })
                            this.setState({
                                answers: this.state.answers
                            })
                            console.log("1", this.state.answers)
                        }
                    )

                })
            },
            err => {
                console.log("Error")
            }
        )
    }
}