import React, { Component } from "react";
import CourseService from "../services/course.service";
export default class Course extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getACourse = this.getACourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.state = {
      currentCourse: {
        id: null,
        title: "",
        description: "",
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getACourse(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCourse: {
          ...prevState.currentCourse,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        description: description,
      },
    }));
  }

  getACourse(id) {
    CourseService.getACourse(id)
      .then((response) => {
        this.setState({
          currentCourse: response.data.Course,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCourse() {
    CourseService.updateCourse(
      this.state.currentCourse._id,
      this.state.currentCourse
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  //   this.state.currentCourse.id
  deleteCourse() {
    CourseService.deleteCourse(this.state.currentCourse._id)
      .then((response) => {
        console.log(response.data.Course);
        this.props.history.push("/admin/question");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCourse } = this.state;
    return (
      <div>
        {currentCourse ? (
          <div className="edit-form">
            <h4>COurse</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCourse.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCourse.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCourse}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCourse}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
