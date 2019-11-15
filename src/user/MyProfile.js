import React, { Component } from "react";
import CanvasJSReact from '../assets/canvasjs.react';
import './MyProfile.css';
import userService from "../services/Services";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
let role;
export default class MyProfile extends Component {
    toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }
    constructor(props) {
        super(props);
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
        this.state = {
            check: 'saran',
            loggedIn: true,
            image: 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png',

            teams: [],
            person: {},
            activity: {},
            options: {
                animationEnabled: true,
                title: {
                    text: "Points Graph"
                },
                axisX: {
                    valueFormatString: "MMM"
                },
                axisY: {
                    title: "Total points",
                    maximum: 100,
                    minimum: 10,
                    includeZero: true
                },
                data: [{
                    yValueFormatString: "#,###",
                    xValueFormatString: "MMMM",
                    type: "spline",
                    dataPoints: [
                        { x: new Date(2017, 0), y: 10 },
                        { x: new Date(2017, 1), y: 20 },
                        { x: new Date(2017, 2), y: 50 },
                        { x: new Date(2017, 3), y: 40 },
                        { x: new Date(2017, 4), y: 10 },
                        { x: new Date(2017, 5), y: 60 },
                        { x: new Date(2017, 6), y: 70 },
                        { x: new Date(2017, 7), y: 50 },
                        { x: new Date(2017, 8), y: 90 },
                        { x: new Date(2017, 9), y: 100 },
                        { x: new Date(2017, 10), y: 90 },
                        { x: new Date(2017, 11), y: 40 }
                    ]
                }]
            },
            options2: {
                theme: "light2",
                animationEnabled: true,
                title: {
                    text: "User Activity Graph"
                },
                subtitles: [{
                    text: "Points Questions asked and Answers answered"
                }],
                axisX: {
                    title: "Months",
                },
                axisY: {
                    title: "Points",
                    titleFontColor: "#6D78AD",
                    lineColor: "#6D78AD",
                    labelFontColor: "#6D78AD",
                    tickColor: "#6D78AD",
                    includeZero: false
                },
                // axisY2: {
                //     title: "points for answers",
                //     titleFontColor: "#51CDA0",
                //     lineColor: "#51CDA0",
                //     labelFontColor: "#51CDA0",
                //     tickColor: "#51CDA0",
                //     includeZero: false
                // },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    itemclick: this.toggleDataSeries
                },
                data: [{
                    type: "spline",
                    name: "questions",
                    axisYType: "primary",
                    showInLegend: true,
                    yValueFormatString: "#,###",
                    xValueFormatString: "MMMM",

                    dataPoints: [
                        { x: new Date(2017, 0), y: 250 },
                        { x: new Date(2017, 1), y: 279 },
                        { x: new Date(2017, 2), y: 428 },
                        { x: new Date(2017, 3), y: 324 },
                        { x: new Date(2017, 4), y: 352 },
                        { x: new Date(2017, 5), y: 339 },
                        { x: new Date(2017, 6), y: 400 },
                        { x: new Date(2017, 7), y: 525 },
                        { x: new Date(2017, 8), y: 323 },
                        { x: new Date(2017, 9), y: 420 },
                        { x: new Date(2017, 10), y: 371 },
                        { x: new Date(2017, 11), y: 384 }
                    ]
                },
                {
                    type: "spline",
                    name: "answers",
                    axisYType: "secondary",
                    showInLegend: true,
                    yValueFormatString: "#,###",
                    xValueFormatString: "MMMM",
                    type: "spline",
                    dataPoints: [
                        { x: new Date(2017, 0), y: 250 },
                        { x: new Date(2017, 1), y: 279 },
                        { x: new Date(2017, 2), y: 428 },
                        { x: new Date(2017, 3), y: 324 },
                        { x: new Date(2017, 4), y: 352 },
                        { x: new Date(2017, 5), y: 339 },
                        { x: new Date(2017, 6), y: 400 },
                        { x: new Date(2017, 7), y: 525 },
                        { x: new Date(2017, 8), y: 323 },
                        { x: new Date(2017, 9), y: 420 },
                        { x: new Date(2017, 10), y: 371 },
                        { x: new Date(2017, 11), y: 394 }
                    ]
                }]
            }

        }

    }
    render() {
        if (this.state.loggedIn === false) {
            this.props.history.push("/login")
        }
        return (
            <div className="container-edit">
                <div className="row">
                    <div className="col-sm-3 left-profile">
                        <img class="card-img-top" src={this.state.image} alt="Person" />
                        <br />
                        <br />
                        <hr />
                        <h3>{this.state.person.firstName} {this.state.person.lastName}</h3>
                        <h5>{String(this.state.person.role).toUpperCase()}</h5>
                        <h6>{this.state.person.designation}</h6>
                        <table class="table-edit">
                            <thead>
                                <tr>
                                    <th className="custom-table-row-edit">Points</th>
                                    <th className="custom-table-row-edit">Following</th>
                                    <th className="custom-table-row-edit">Followers</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="custom-table-row-edit">{this.state.activity.points}</td>
                                    <td className="custom-table-row-edit">{this.state.activity.followingUserIds ? this.state.activity.followingUserIds.length : 0}</td>
                                    <td className="custom-table-row-edit">{this.state.activity.followerIds ? this.state.activity.followerIds.length : 0}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="left-profile-sub">
                            <b>Teams :</b>
                            <br />
                            <ul>
                                {
                                    this.state.teams.map(team => (
                                        <li>{team.teamName}</li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-8 right-profile">
                        <div className="display-graph">
                            <CanvasJSChart options={this.state.options} />
                        </div>
                        <br /><br />
                        <hr />
                        <br />
                        <div className="display-graph">
                            <center>
                                <CanvasJSChart options={this.state.options2} />
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        console.log(this.props.id)
        let id = localStorage.getItem('id')
        userService.findUserDetailsById(this.props.id || id).then(
            res => {
                this.state.person = res.data;
                this.setState({
                    person: this.state.person
                })
            },
            err => {

            }
        )
        userService.getTeams(this.props.id || id).then(
            res => {
                this.state.teams = res.data
                this.setState({
                    teams: this.state.teams
                })
            }
        )
        userService.getUserActivity(this.props.id || id).then(
            res => {
                this.state.activity = res.data
                this.setState({
                    activity: this.state.activity
                })
                console.log("Activity", this.state.activity)
            },
            err => {
                alert("Error")
            }
        )
        this.setState({
            loggedIn: token !== null
        })
    }
}