import React from 'react';
import './AppHeader.css';
import { Link } from 'react-router-dom';

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">
                                VZ-Overflow
                            </Link>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/topics">Topics</Link></li>
                            <li><Link to="/questions">Questions</Link></li>
                            <li><Link to="/people">People</Link></li>
                            <li><Link to="/leaderboard">Leaderboard</Link></li>
                            <li><Link to="/myteam">My Team</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link className="dropdown-toggle" to="/myprofile"><span className="glyphicon glyphicon-user"></span> My Profile</Link></li>
                            <li><Link className="dropdown-toggle" to="/logout"><span className="glyphicon glyphicon-log-out"></span> Logout</Link></li>
                        </ul>
                    </div>
                </nav>

                <br />

            </div>

        );
    }

}
