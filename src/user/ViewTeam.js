import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './ViewTeam.css'
import userService from "../services/Services";
class ViewTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            image: 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png',
            people: [
            ],
            manager: {}
        }

    }
    addPerson(id) {
        alert("added user " + id + " successfully")
    }
    render() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/login")
        }
        return (
            <div className="container">
                <h3 className="align-heading">Manager:</h3>
                <div className="row">
                    <div className="col-lg-3 col-edit">
                        <center>
                            <div class="card" >
                                <img class="card-img-left" src={this.state.image} alt="Person" />
                                <hr />
                                <div class="card-body">
                                    <h5 class="card-title">{this.state.manager.name}</h5>
                                    <Link onClick={this.addPerson.bind(this, this.state.manager.id)} class="btn btn-default"><span className="glyphicon glyphicon-plus"></span> Follow</Link>&nbsp;
                                    <Link to={`/people/${this.state.manager.id}`} class="btn btn-default"><span className="glyphicon glyphicon-user"></span> View Profile</Link>
                                </div>
                            </div>
                        </center>
                    </div>


                </div>
                <hr className="lg" />
                <h3 className="align-heading">Team Members:</h3>
                <div className="row">
                    {
                        this.state.people.map(person => (
                            <div className="col-lg-3 col-edit">
                                <center>
                                    <div class="card" style={{ width: '18rem' }}>
                                        <img class="card-img-top" src={this.state.image} alt="Person" />
                                        <hr />
                                        <div class="card-body">
                                            <h5 class="card-title">{person.name}</h5>
                                            <Link onClick={this.addPerson.bind(this, person.id)} class="btn btn-default"><span className="glyphicon glyphicon-plus"></span> Follow</Link>&nbsp;
                                            <Link to={`/people/${person.id}`} class="btn btn-default"><span className="glyphicon glyphicon-user"></span> View Profile</Link>
                                        </div>
                                    </div>
                                </center>
                            </div>
                        ))
                    }

                </div>
            </div>
        );
    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            loggedIn: token !== null
        })
        userService.getTeamById(this.props.match.params.id).then(
            team => {
                userService.findUserDetailsById(team.data.managerId).then(
                    manager => {
                        this.state.manager = {
                            id: manager.data.id,
                            name: manager.data.firstName
                        }
                        this.setState({
                            manager: this.state.manager
                        })

                    }
                )
                team.data.memberIds.map(memberId => {
                    userService.findUserDetailsById(memberId).then(
                        user => {
                            this.state.people.push({
                                id: user.data.id,
                                name: user.data.firstName
                            })
                            this.setState({
                                people: this.state.people
                            })
                        }
                    )
                })
            }
        )
    }
}

export default ViewTeam;