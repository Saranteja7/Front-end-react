import axios from "axios";
import "axios-response-logger";
// import qs from "qs";

const userManagerUrl = "http://localhost:8080";

const qaManagerUrl = "http://localhost:8090";

const leaderboardManagerUrl = "http://localhost:8086"

const userService = {
    getData() { },

    login(email, password) {
        return axios.post(`${userManagerUrl}/login/authenticateuser`, { email, password });
        // .then(res => {
        //   console.log("hello", res.data);
        //   return res.headers["token"];
        // })
        // .catch(err => {
        //   console.log(err.response);
        // });
    },

    followUser(uId) {
        return axios({
            method: "put",
            url: `${qaManagerUrl}/useractivity/updatefollowinguser/${localStorage.getItem('id')}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            data: JSON.stringify(uId)
        })
    },
    unFollowUser(uId) {
        return axios({
            method: "delete",
            url: `${qaManagerUrl}/useractivity/deletefollowinguser/${localStorage.getItem('id')}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            data: JSON.stringify(uId)
        })
    },
    getUserActivity(id) {
        return axios({
            method: "get",
            url: `${qaManagerUrl}/useractivity/findbyid/${id}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
    },

    getTeams(uid) {
        return axios({
            method: "get",
            url: `${qaManagerUrl}/getteams/${uid}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
    },

    getLeaderboard() {
        return axios({
            method: "get",
            url: `${leaderboardManagerUrl}/leaderboard/all`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
    },


    getTeamById(id) {
        return axios({
            method: "get",
            url: `${qaManagerUrl}/getteambyid/${id}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
    },

    getQuestions() {
        return axios({
            method: "get",
            url: `${qaManagerUrl}/question/findall`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
    },
    getByQuestionId(id) {
        return axios({
            method: "get",
            url: `${qaManagerUrl}/question/findById/${id}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },

        })
    },

    getAnswersByQuestionId(id) {
        return axios({
            method: "get",
            url: `${qaManagerUrl}/answer/findbyquestionid/${id}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },

        })
    },


    getTopics() {
        return axios({
            method: "get",
            url: `${qaManagerUrl}/topic/findall`
        })
    },
    addTopic(topicName) {
        return axios({
            method: "post",
            url: `${qaManagerUrl}/topic/add`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(topicName)
        })

    },

    followQuestion(followData) {
        return axios({
            method: "put",
            url: `${qaManagerUrl}/question/followquestion`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            data: JSON.stringify(followData)
        })
    },
    reportQuestion(reportData) {
        return axios({
            method: "put",
            url: `${qaManagerUrl}/question/reportquestion`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            data: JSON.stringify(reportData)
        })
    },




    upVoteAnswer(upVoteData) {
        return axios({
            method: "put",
            url: `${qaManagerUrl}/answer/upvote`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            data: JSON.stringify(upVoteData)
        })
    },
    reportAnswer(reportData) {
        return axios({
            method: "put",
            url: `${qaManagerUrl}/answer/report`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            data: JSON.stringify(reportData)
        })
    },

    addAnswer(answer) {
        return axios({
            method: "post",
            url: `${qaManagerUrl}/answer/add`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(answer)
        })

    },
    getUsers() {
        return axios({
            method: "get",
            url: `${userManagerUrl}/findallusers`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
    },
    createTeam(team) {

        return axios({
            method: "post",
            url: `${qaManagerUrl}/createTeam`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            data: JSON.stringify(team)

        })
    },
    addQuestion(question) {
        return axios({
            method: "post",
            url: `${qaManagerUrl}/questions/postquestion`,
            headers: {
                "token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            data: JSON.stringify(question)
        })

    },
    findUserDetailsById(id) {
        return axios({
            method: "get",
            url: `${userManagerUrl}/finduserbyid/${id}`,
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
    },
    resetPassword(email) {
        return axios({
            method: "post",
            url: `${userManagerUrl}/user/resetpassword`,
            headers: {
                "Content-Type": "application/json"
            },
            data: email
        });
    },
    updatepassword(request) {
        return axios({
            method: "post",
            url: `${userManagerUrl}/user/resetpassword`,
            headers: {
                "Content-Type": "application/json"
            },
            data: request
        });
    }
};
export default userService;
