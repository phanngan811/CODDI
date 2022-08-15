import React, { Component } from "react";
import CourseService from "../services/course.service";
import { Link } from "react-router-dom";
export default class CourseList extends Component {
  constructor(props) {
    super(props);
    this.getCourse = this.getCourse.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCourse = this.setActiveCourse.bind(this);
    this.state = {
      courses: [],
      currentCourse: null,
      currentIndex: -1,
    };
  }
  componentDidMount() {
    this.getCourse();
  }
  getCourse() {
    CourseService.getAllCourse()
      .then((response) => {
        this.setState({
          courses: response.data.Course,
        });
        console.log(response.data.Course);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  refreshList() {
    this.getCourse();
    this.setState({
      currentCourse: null,
      currentIndex: -1,
    });
  }

  setActiveCourse(course, index) {
    this.setState({
      currentCourse: course,
      currentIndex: index,
    });
  }

  render() {
    const { courses, currentCourse, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Tutorials List</h4>
          <ul className="list-group">
            {courses &&
              courses.map((course, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCourse(course, index)}
                  key={index}
                >
                  {course.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentCourse ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentCourse.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCourse.description}
              </div>

              <Link
                to={"/admin/question/" + currentCourse._id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
