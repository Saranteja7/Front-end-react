import React, { Component } from "react";
import './Leaderboard.css';
import userService from "../services/Services";
export default class Leaderboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: true,
            leaderboard: []
        }

    }
    render() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/login")
        }
        return (
            <div className="container table-responsive">
                <h1 className="text-monospace heading-leaderboard">LEADERBOARD</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.leaderboard.map((person, index) => (
                                (person.uId === localStorage.getItem('id') || index < 5) &&
                                <tr class="success">
                                    <td>{person.rank}</td>
                                    <td>{person.name}</td>
                                    <td>{person.points}</td>
                                </tr>

                            ))

                        }
                    </tbody>
                </table>
            </div>
        );
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        this.setState({
            loggedIn: token !== null
        })
        userService.getLeaderboard().then(
            leaderboard => {
                // this.state.leaderboard = leaderboard.data
                // this.setState({
                //     leaderboard: this.state.leaderboard
                // })
                leaderboard.data.map(leaderboardData => {
                    console.log(leaderboardData)
                    userService.findUserDetailsById(leaderboardData.name).then(
                        res => {
                            // let answersList = []
                            // answersList.push
                            this.state.leaderboard.push(
                                {
                                    uId: res.data.id,
                                    rank: leaderboardData.rank,
                                    name: res.data.firstName,
                                    points: leaderboardData.points
                                })
                            this.state.leaderboard.sort((a, b) => {
                                return a.rank - b.rank;
                            })
                            this.setState({
                                leaderboard: this.state.leaderboard
                            })

                        }
                    )

                })
            },
            err => {
                alert("Error");
            }
        )
    }
}