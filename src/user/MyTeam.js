import React, { Component } from "react";
import { Link } from 'react-router-dom';
import userService from "../services/Services";
export default class MyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            teams: [],
            statusType: '',
            displayType: 'hidden',
            teamStatus: '',
            message: '',
            managerName: '',
            users: [],
            addedUsers: new Set(),
            teamName: ''

        }


    }

    addTeamName = event => {
        this.state.teamName = event.target.value
        this.setState({
            teamName: this.state.teamName
        })
    }

    removeUser(user) {
        let sample = this.state.addedUsers;
        sample.forEach(function (u) {
            if (u.id === JSON.parse(user).id)
                console.log(sample.delete(u))
        })
        this.setState({
            addedUsers: sample
        })
    }
    addUser = event => {
        let user = event.target.value
        this.state.addedUsers.add(JSON.parse(user))
        this.setState({
            addedUsers: this.state.addedUsers
        })
        console.log(this.state.addedUsers)

    }


    createTeam = event => {
        event.preventDefault();
        if (this.state.teamName === '' || this.state.addedUsers.size === 0 || this.state.teamName.trim() === '') {
            if (this.state.teamName === '' || this.state.teamName.trim() === '') {
                this.setState({
                    statusType: 'danger',
                    displayType: 'display',
                    teamStatus: 'Error!',
                    message: 'Invalid Team Name!'
                })
            }
            else
                this.setState({
                    statusType: 'danger',
                    displayType: 'display',
                    teamStatus: 'Error!',
                    message: 'Add Members!'
                })
        }
        else {
            let id = []
            Array.from(this.state.addedUsers).map(user => {
                id.push(user.id)
            })
            let team = {
                teamName: this.state.teamName,
                managerId: localStorage.getItem('id'),
                memberIds: id

            }
            userService.createTeam(team).then(
                res => {
                    this.setState({
                        statusType: 'success',
                        displayType: '',
                        teamStatus: 'Success!',
                        message: 'Team Created successfully!',
                        managerName: '',
                        users: [],
                        addedUsers: new Set(),
                        teamName: '',
                        teams: [],
                    })

                    this.componentDidMount()
                },
                err => {
                    this.setState({
                        statusType: 'danger',
                        displayType: '',
                        teamStatus: 'Error!',
                        message: "Something went wrong.",
                    })
                }

            ).catch(err => {
                this.setState({
                    statusType: 'danger',
                    displayType: '',
                    teamStatus: 'Error!',
                    message: "Something went wrong.",
                })
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


    // createTeam = event => {
    //     let id = []
    //     Array.from(this.state.addedUsers).map(user => {
    //         id.push(user.id)
    //     })
    //     let team = {
    //         teamName: this.state.teamName,
    //         managerId: localStorage.getItem('id'),
    //         memberIds: id

    //     }
    //     userService.createTeam(team).then(
    //         res => {
    //             this.componentDidMount()
    //         }
    //     )
    // }

    render() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/login")
        }
        return (
            <div className="container">
                {localStorage.getItem('role') === 'manager' &&
                    <>
                        <div className={`alert alert-${this.state.statusType} alert-dismissible fade in ${this.state.displayType}`}>
                            <a href="#" class="close" aria-label="close" onClick={this.handleClose}>&times;</a>
                            <strong>{this.state.teamStatus}</strong> {this.state.message}
                        </div>
                        <div>
                            <div className="panel panel-success">
                                <div className="panel-heading">Create Team</div>
                                <textarea required placeholder="Team Name" onChange={this.addTeamName} name="teamName" type="text" className="panel-body form-control question-area-edit" />
                                <div className="panel-body tag-body-edit">
                                    <div className="tags-label">
                                        <font className="topic-font-edit">Members</font>

                                    </div>
                                    <div className="tags-list">
                                        {
                                            Array.from(this.state.addedUsers).map((user) => (

                                                < font className="tag-edit" > <Link onClick={this.removeUser.bind(this, JSON.stringify(user))}><span className="glyphicon glyphicon-remove" ></span></Link> &nbsp;&nbsp;{user.firstName}</font>
                                            ))
                                        }
                                    </div>
                                </div>

                                <br />
                                <div className="panel-body tag-body-edit2">
                                    <div className="form-inline">
                                        <label>
                                            Select Members : &nbsp;
                            </label>
                                        <select className="form-control selection" name="addedUsers" onChange={this.addUser}>
                                            <option selected disabled value="">Members</option>
                                            {
                                                Array.from(this.state.users).map(user => (
                                                    <>
                                                        {
                                                            <option value={JSON.stringify(user)}>{user.firstName.toUpperCase()}</option>
                                                        }
                                                    </>
                                                ))
                                            }
                                        </select> &nbsp;&nbsp;
                                    <Link onClick={this.createTeam} className="btn btn-success">Create Team</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }


                <h3 className="align-heading">Teams:</h3>
                {
                    this.state.teams.map(team => (
                        <div className="panel panel-default">
                            <div className="panel-heading panel-head-edit">
                                <font>

                                    {team.teamName.toUpperCase()}

                                </font>
                            </div>

                            <div className="panel-body"><b>Manager : </b>{team.managerName}</div>
                            <div className="panel-body">

                                <Link to={`/viewteam/${team.id}`}>   <button className="btn btn-primary" >View Team</button></Link>

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
        userService.getUsers().then(
            res => {
                console.log("here", res.data)
                res.data.map(user => {
                    (user.id !== localStorage.getItem('id') && user.role !== 'admin' && user.role !== 'manager') && this.state.users.push({ id: user.id, firstName: user.firstName })
                    this.setState({
                        users: this.state.users
                    })
                })
            }
        )
        userService.getTeams(localStorage.getItem('id')).then(
            res => {
                res.data.map(
                    team => {
                        userService.findUserDetailsById(team.managerId).then(
                            res => {
                                this.state.teams.push({
                                    id: team.id,
                                    managerId: team.managerId,
                                    memberIds: team.memberIds,
                                    teamName: team.teamName,
                                    managerName: res.data.firstName
                                })
                                this.setState({
                                    teams: this.state.teams
                                })
                            }
                        )



                    }
                )

            },
            err => {
                alert("Error")
            }
        )

    }
}