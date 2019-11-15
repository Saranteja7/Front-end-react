import React, { Component } from "react";
import { Link } from "react-router-dom";
import './People.css'
import userService from "../services/Services";
export default class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            image: 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png',
            people: [],
            topics: ['java', 'c', 'cpp', 'spring', 'spring-boot', 'css'],
            userActivityDetails: {}
        }

    }


    followUser(uId) {
        userService.followUser(uId).then(
            res => {
                this.componentDidMount();
            }
        )
    }

    unFollowUser(uId) {
        userService.unFollowUser(uId).then(
            res => {
                this.componentDidMount();
            }
        )
    }
    render() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/login")
        }
        return (
            <div className="container">
                <div className="row">
                    {
                        this.state.people.filter(person => (person.role !== 'admin')).map(person => (
                            <> {
                                person.id !== localStorage.getItem('id') &&
                                <div className="col-lg-3 col-edit">

                                    < center >
                                        <div class="card" style={{ width: '18rem' }}>
                                            <div className="card-body">
                                                <img class="card-img-top" src={this.state.image} alt="Person" />
                                            </div>
                                            <hr />
                                            <div className="card-body">
                                                <h5 class="card-title">{person.firstName} {person.lastName}</h5>
                                                {(this.state.userActivityDetails && this.state.userActivityDetails.followingUserIds && this.state.userActivityDetails.followingUserIds.includes(person.id)) ? <Link onClick={this.unFollowUser.bind(this, person.id)} className="btn btn-default"><span className="glyphicon glyphicon-minus"></span> UnFollow</Link> : <Link onClick={this.followUser.bind(this, person.id)} class="btn btn-default"><span className="glyphicon glyphicon-plus"></span> Follow</Link>}&nbsp;
                                            <Link to={`/people/${person.id}`} class="btn btn-default"><span className="glyphicon glyphicon-user"></span> View Profile</Link>
                                            </div>
                                        </div>
                                        <br />
                                    </center>

                                </div>
                            }
                            </>
                        ))
                    }

                </div>
            </div >
        );
    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            loggedIn: token !== null
        })

        userService.getUserActivity(localStorage.getItem('id')).then(
            res => {
                console.log(res.data)
                this.state.userActivityDetails = res.data
                this.setState({
                    userActivityDetails: this.state.userActivityDetails
                })
            }
        )


        userService.getUsers().then(
            res => {
                this.state.people = res.data
                this.setState({
                    people: this.state.people
                })
            },
            err => {
                alert("error");
            }
        )
    }

}