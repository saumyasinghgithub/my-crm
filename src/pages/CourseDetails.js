import { useState, useEffect, useContext } from "react";
import UserContext from "./../contexts/UserContext";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import Utils from "./../Utils";
import StarRatings from "react-star-ratings";
import { Loader } from "../components";

const CourseDetails = (props) => {
  const { slug } = useParams();

  const [course, setCourse] = useState({});
  const [bp, setBp] = useState([]);

  const [loading, setLoading] = useState(true);
  const [starLoading, setStarLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [rating, setRating] = useState({
    rating: 0,
    ratings: 0,
    enrollments: 0,
  });

  const { isLoggedIn, getServerData, setServerData, loginToMoodle } = useContext(UserContext);
  const [enrollment, setEnrollment] = useState([]);

  const $ = window.$;

  useEffect(() => {
    getServerData(`course/${slug}`, true)
      .then((cData) => {
        setCourse(cData);
        setBp(cData.resources);
        setRating(cData.rating);
        setLoading(false);
      })
      .catch((msg) => {
        setCourse({ success: false, message: msg });
        setLoading(false);
      });
  }, []);

  const setCourseRating = (rated) => {
    setStarLoading(true);
    let ratingData = new FormData();
    ratingData.append("course_id", course.course.id);
    ratingData.append("rating", rated);
    setServerData(`course/setRating`, ratingData, "post")
      .then((res) => {
        setStarLoading(false);
        setRating(res.success ? res.rating : course.rating);
      })
      .catch((msg) => {
        setStarLoading(false);
        setRating(course.rating);
        // do nothing
      });
  };

  useEffect(window.scrollEffect, [course]);

  const showBundlePrice = () => {
    let price = 0;
    _.forEach(bp, (b) => (price += b.price));
    return price;
  };

  const bundleProduct = (resource) => {
    let tmp = [...bp];
    if (_.findIndex(tmp, (b) => b.id === resource.id) > -1) {
      tmp = _.filter(tmp, (b) => b.id !== resource.id);
    } else {
      tmp.push(resource);
    }
    setBp(tmp);
  };

  const addToCart = (e) => {
    e.preventDefault();
    let cartData = new FormData();
    cartData.append("course_id", course.course.id);
    cartData.append("course_resources", JSON.stringify(_.map(bp, (b) => _.pick(b, ["id", "type", "name", "price"]))));
    cartData.append("price", showBundlePrice());
    cartData.append("is_bundle", parseInt(_.get(bp, "length", 0)) > 0 ? 1 : 0);

    setAddingToCart(true);

    setServerData(`cart`, cartData, "post")
      .then((res) => {
        window.location.href = "/my-cart";
      })
      .catch((err) => console.error(err));
  };

  const renderResource = (resource) => {
    const restype = {
      pdf: "pdf.png",
      PPT: "doc-icon.png",
      audio: "audio-icon.png",
      video: "video.png",
      webinar: "webinar.png",
      scorm: "scome.png",
    };
    return (
      <li>
        <div
          className={`circleBox wow zoomIn ${_.findIndex(bp, (b) => b.id === resource.id) > -1 ? "selected" : ""}`}
          /*onClick={() => bundleProduct(resource)}*/
        >
          <img className="img-fluid" src={`/assets/images/${_.get(restype, resource.type, "pdf.png")}`} />
          <span className="usdheading">USD {resource.price}</span>
          <span className="usdtext">{resource.type}</span>
        </div>
      </li>
    );
  };

  const markFav = (course_id, fav) => (e) => {
    e.preventDefault();
    //$(e.target).fadeOut();
    setServerData("course/markfav", `course_id=${course_id}&fav=${fav}`, "post").then(() =>
      setCourse({
        ...course,
        isFav: !course.isFav,
      })
    );
    //.then(() => $(e.target).show())
  };

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
  console.log(enrollment);
  return (
    <>
      <Container fluid className="h-100 p-0">
        {addingToCart && (
          <>
            <div className="profile-wrapper">
              <div className="container">
                <h1>Course</h1>
                <Alert variant="info">
                  <div className="m-5">
                    Adding course to cart <Spinner animation="border" size="sm" />
                  </div>
                </Alert>
              </div>
            </div>
          </>
        )}

        {loading && (
          <>
            <Loader />
          </>
        )}

        {!addingToCart && !loading && (
          <>
            {_.get(course, "success", false) === false && (
              <>
                <div className="profile-wrapper">
                  <div className="container">
                    <h1>Course</h1>
                    <Alert variant="danger">
                      <div className="m-5">{course.message}</div>
                    </Alert>
                  </div>
                </div>
              </>
            )}
            {_.get(course, "success", false) !== false && (
              <>
                <div className="cardWrapper">
                  <div className="container">
                    <ul className="iconList nav nav-tabs">{_.map(course.resources, renderResource)}</ul>
                    <div className="tab-content">
                      <div className="courseWrapper coursecard tab-pane active" id="PDF">
                        <div className="row">
                          <div className="col-md-6 wow slideInUp">
                            <div
                              className="imgWrapper rounded ViewCourseImg"
                              style={{
                                backgroundImage: `url("${process.env.REACT_APP_API_URL}/uploads/courses/${course.course.course_image}")`,
                              }}
                            >
                              <div className="circleBox">
                                <img className="img-fluid" src="/assets/images/bundle.png" alt="AD" />
                                <span className="usdheading active">USD {showBundlePrice()}</span>
                              </div>
                            </div>
                            <div className="textBoxCard">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: course.course.short_description,
                                }}
                              ></div>
                              <hr className="CourseDetailsHr"></hr>
                              <div className="cardInfoBox">
                                <span className="textBold">Created by</span> {course.about.firstname} {course.about.lastname}{" "}
                                <span className="textBold">| Last updated</span> {moment(course.course.created_at).format("DD/MM/YYYY")}
                                <br />
                                <span className="textBold">Language:</span> {course.course.language} |{" "}
                                <span className="textBold">Also available:</span> {course.course.language} <br />
                                <span className="textBold">Media: </span>
                                {Utils.mediaTypes.map(
                                  (m) =>
                                    _.find(course.resources, {
                                      type: m[0],
                                    }) && (
                                      <span className="pr-2">
                                        {m[1]} <img src={`/assets/images/${m[2]}`} alt="AD" width="15" />
                                      </span>
                                    )
                                )}
                                <br />
                                <span className="textBold">Level:</span> {course.course.level} <span className="textBold">| Duration:</span>{" "}
                                {course.course.duration} Hours.
                              </div>
                              {!starLoading && (
                                <div className="d-flex">
                                  <StarRatings
                                    rating={rating.rating}
                                    starEmptyColor="#dddddd"
                                    starRatedColor="#f3ac1b"
                                    starHoverColor="#bfa700"
                                    starDimension="20px"
                                    starSpacing="2px"
                                    changeRating={isLoggedIn() ? setCourseRating : false}
                                  />
                                  <div className="mx-2 my-1">
                                    ({rating.ratings}) {rating.enrollments}{" "}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6 slideInUp wow">
                            <div className="courseOverview">
                              <h3>{course.course.name}</h3>
                              <div
                                className="courseinfo"
                                dangerouslySetInnerHTML={{
                                  __html: course.course.learn_brief,
                                }}
                              ></div>
                              <div
                                className="courseinfo"
                                dangerouslySetInnerHTML={{
                                  __html: course.course.requirements,
                                }}
                              ></div>
                              <div
                                className="courseinfo addReadMore showlesscontent"
                                dangerouslySetInnerHTML={{
                                  __html: course.course.description,
                                }}
                              ></div>
                              <form name="moodleLoginForm" method="post" action={`${process.env.REACT_APP_MOODLE_URL}/login/index.php`}>
                                <input type="hidden" name="username" />
                                <input type="hidden" name="password" />
                              </form>
                              <div className="coursebtn">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="addButns">
                                      {!isLoggedIn() && (
                                        <>
                                          <a href={`/login`} className="btn btnBlue">
                                            Login to Enroll
                                          </a>
                                        </>
                                      )}
                                      {isLoggedIn() && (
                                        <>
                                          {enrollment.includes(course.course.id) ? (
                                            <>
                                              <a
                                                href="#"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  loginToMoodle(document.forms.moodleLoginForm);
                                                }}
                                                className="btn btnBlue"
                                              >
                                                Proceed To LMS{" "}
                                              </a>
                                            </>
                                          ) : (
                                            <>
                                              {_.get(bp, "length", 0) > 0 && (
                                                <a href="#" onClick={addToCart} className="btn btnBlue">
                                                  Enroll Now
                                                </a>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    {_.get(bp, "length", 0) > 0 && <div className="coursePrice">USD {showBundlePrice()}</div>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="courseDesWrapper"></div>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default CourseDetails;
