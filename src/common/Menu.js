import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">VZ-Overflow</Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link className="dropdown-toggle" to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                    </ul>
                </div>
            </nav>

        );
    }

}
