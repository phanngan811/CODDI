import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class NavAdmin extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row wrapper min-vh-100 flex-column flex-sm-row">
          <aside className="col-12 col-sm-3 p-0 bg-primary flex-shrink-1">
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary align-items-start flex-sm-column flex-row">
              <Link className="navbar-brand" to="/admin/dashboard">
                <i className="fa fa-bullseye fa-fw" /> DASHBOARD ADMIN
              </Link>

              <div className="collapse navbar-collapse sidebar">
                <ul className="flex-column navbar-nav w-100 justify-content-between">
                  <li className="nav-item">
                    <Link className="nav-link " to="/admin/course">
                      Course
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/admin/question">
                      Question
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    );
  }
}
