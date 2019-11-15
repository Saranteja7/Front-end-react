import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from "./common/AppHeader";
import { Route } from 'react-router-dom';
import Menu from "./common/Menu";
import Leaderboard from "./user/Leaderboard";
import MyTeam from "./user/MyTeam";
import MyProfile from "./user/MyProfile";
import People from "./user/People";
import Questions from "./user/Questions";
import Topics from "./user/Topics";
import Home from "./user/Home";
import Logout from './user/Logout';
import QuestionDetails from './user/QuestionDetails';
import PeopleDetails from './user/PeopleDetails';
import ViewTeam from './user/ViewTeam';
import Login from "./common/Login";
import Home1 from './common/Home1'
import TopicQuestions from './user/TopicQuestions';
import ForgotPassword from './common/ForgotPassword';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      loggedIn: false
    }
  }
  render() {
    let header;
    switch (this.state.status) {
      case 'loading':
        header = (
          <div className="container">
            <h1>Loading</h1>
          </div>
        );
        break;
      case 'loaded':
        header = (
          <div>
            {!this.state.loggedIn && <Menu />}
            {this.state.loggedIn && <AppHeader />}
          </div>
        );
        break;
      default:
        header = (
          <div>
            <Menu />
          </div>
        );
    }
    return (
      <div className="App" >
        {header}
        <Route path="/" exact component={Home1} />
        <Route path="/home" exact component={Home} />
        <Route path="/topics" exact component={Topics} />
        <Route path="/questions" exact component={Questions} />
        <Route path="/people" exact component={People} />
        <Route path="/leaderboard" exact component={Leaderboard} />
        <Route path="/myteam" exact component={MyTeam} />
        <Route path="/myprofile" exact component={MyProfile} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/login" exact component={Login} />
        <Route path="/question/:id" exact component={QuestionDetails} />
        <Route path="/topicquestions/:topic" exact component={TopicQuestions} />
        <Route path="/people/:id" exact component={PeopleDetails} />
        <Route path="/viewteam/:id" exact component={ViewTeam} />
      </div>
    );
  }
  componentDidMount() {
    let token = localStorage.getItem('token')
    this.setState({
      status: 'loaded',
      loggedIn: token !== null
    })
  }
}

