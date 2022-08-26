import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CourseService from "../../services/course.service";
import NavAdmin from "../nav/navAdmin";
import CreateLesson from "./createLesson.component";

export default function ListCourse() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    getCourse();
  }, []);

  function getCourse() {
    CourseService.getAllCourse()
      .then((response) => {
        setCourses(response.data.Course);
        console.log(response.data.Course);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setSelected(true);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  return (
    <div>
      <NavAdmin/>
      {courses.map((course, index) => (
        <div key={index}>
          <button onClick={handleClick}>{course.title}</button>
          {selected && (
            <div>
              <h3>Create the lesson</h3>
            </div>
          )}
          {selected && <CreateLesson />}
        </div>
      ))}
    </div>
  );
}
