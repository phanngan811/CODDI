import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import NavHeader from "./components/nav/navHeader";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import NavAdmin from "./components/nav/navAdmin";
import Course from "./components/course.component";
import CourseList from "./components/courseList.component";

function App() {
  return (
    <Router history={history}>
      <NavHeader />
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          {/* <Route path="/admin" component={BoardAdmin} /> */}
          <Route path="/admin/dashBoard" component={NavAdmin} />
          <Route path="/admin/course" component={BoardAdmin} />
          <Route path="/admin/question/:id" component={Course} />
          <Route path="/admin/question" component={CourseList} />
        </Switch>
      </div>

      {/* <AuthVerify logOut={this.logOut}/> */}
    </Router>
  );
}
// function mapStateToProps(state) {
//   const { user } = state.auth;
//   return {
//     user,
//   };
// }

export default App;
