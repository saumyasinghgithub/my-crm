import React, { useEffect, useContext, useState } from "react";
import _ from "lodash";
import { Row, Container } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import UserContext from "../../contexts/UserContext";

const TeacherLibrary = (props) => {
  const data = props.data;
  const courses = props.courses;

  const { getUserData, isLoggedIn, getServerData, loginToMoodle, isTrainer } = useContext(UserContext);
  const [enrollment, setEnrollment] = useState([]);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(window.scrollEffect, []);
  useEffect(() => {
    getServerData(`student/my-enrollments`, true)
      .then((enrols) => {
        if (Array.isArray(enrols.enrolled) && enrols.enrolled.every((e) => typeof e === "object")) {
          let enrollmentArray = enrols.enrolled.map((enrols) => enrols.course_id);
          setEnrollment(enrollmentArray);
        }
      })
      .catch((msg) => {
        setEnrollment({ success: false, message: msg });
      });
  }, []);
  //console.log(enrollment);
  const renderCourses = (course) => {
    const date = new Date(course.created_at);
    const formattedDate = date.toLocaleDateString();
    return (
      <Container>
        {" "}
        <Row className="my-5">
          {" "}
          <div className="libraryInfobox slideInUp wow ">
            <div className="col-md-3 col-12">
              <div className="">
                {/*<span className="new">New</span>*/}
                <img className="img-fluid rounded" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${course.course_image}`} alt="RescueRN" />
              </div>
            </div>
            <div className="col-md-7 col-12">
              <div className="">
                <div className="libraryTitle">{course.name}</div>
                <div className="libraryBody" dangerouslySetInnerHTML={{ __html: course.short_description }}></div>
                <div className="libraryAuthorInfo">
                  Date: {formattedDate} | Level: {course.level} | Duration: {course.duration}
                </div>
                <StarRatings
                  rating={course.rating.rating}
                  starEmptyColor="#dddddd"
                  starRatedColor="#f3ac1b"
                  starHoverColor="#bfa700"
                  starDimension="20px"
                  starSpacing="2px"
                />
              </div>
            </div>
            <div className="col-md-2 col-12 d-flex align-items-center">
              <div className="ViewCourseBtn">
                {loggedIn && (
                  <>
                    {enrollment.includes(course.id) ? (
                      <>
                        <a
                          className="btn btnBlue"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            loginToMoodle(document.forms.moodleLoginForm);
                          }}
                        >
                          Proceed To LMS{" "}
                        </a>
                      </>
                    ) : (
                      <>
                        <a href={`/courses/${course.slug}`} className="btn btnBlue">
                          View Course{" "}
                        </a>
                      </>
                    )}
                  </>
                )}

                {!loggedIn && (
                  <a href={`/courses/${course.slug}`} className="btn btnBlue">
                    View Course{" "}
                  </a>
                )}
              </div>
            </div>
          </div>
        </Row>{" "}
      </Container>
    );
  };

  return (
    <>
      <div className="row">
        {isTrainer() && getUserData().id === data.user_id && (
          <div className="container mb-3 editTrainerdetails">
            <div className="row">
              <div className="col-12 text-right">
                <a className=" bg-primary p-2 text-white rounded" href="/my-profile#library">
                  Edit <i className="fas fa-edit text-white"></i>
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="col-lg-12 col-md-12 col-12 pt-2 pb-1">
          <img
            className="img-fluid imgTransfer w-100"
            src={`${process.env.REACT_APP_API_URL}/uploads/library/${encodeURI(data.library_image)}`}
            alt="service"
          />
        </div>
      </div>
      <div className="serviceWrapper container">
        <div className="serviceHeading w-100">
          <h1 className="headingtext slideInUp wow w-100">Courses</h1>
          <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{ __html: data.about_library }}></div>
        </div>
        <form name="moodleLoginForm" method="post" action={`${process.env.REACT_APP_MOODLE_URL}/login/index.php`}>
          <input type="hidden" name="username" />
          <input type="hidden" name="password" />
        </form>
        <div className="libraryBody">{courses.map(renderCourses)}</div>
      </div>
    </>
  );
};

export default TeacherLibrary;
