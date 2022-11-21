import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

import UserContext from "./../contexts/UserContext";
import _ from "lodash";
import moment from "moment";

const StudentProfileView = (props) => {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  const { getServerData } = useContext(UserContext);
  useEffect(() => {
    getServerData("student/my-about")
      .then((data) => {
        setData({ success: true, data: data });
        console.log(data.firstname);
        setLoading(false);
      })
      .catch((msg) => {
        setData({ success: false, message: msg });
        setLoading(false);
      });
  }, []);

  useEffect(window.scrollEffect, [data]);

  return (
    <>
      <Container className="h-100 p-0">
        {loading && (
          <>
            <div className="profile-wrapper">
              <div className="container">
                <h1>Student Profile</h1>
                <Alert variant="warning">
                  <div className="m-5">
                    Looking for Student Profile{" "}
                    <Spinner animation="border" size="sm" />
                  </div>
                </Alert>
              </div>
            </div>
          </>
        )}
        {!loading && (
          <>
            {_.get(data, "success", false) === false && (
              <>
                <div className="profile-wrapper">
                  <div className="container">
                    <h1>Student Profile</h1>
                    <Alert variant="danger">
                      <div className="m-5">{data.message}</div>
                    </Alert>
                  </div>
                </div>
              </>
            )}
            {_.get(data, "success", false) !== false && (
              <>
                <div className="profile-wrapper profile-wrapperStudent">
                  <div className="container">
                    <Row>
                      <Col md={12}>
                        <nav>
                          <ol className="cd-breadcrumb">
                            <li>
                              <a href="/">Home</a>
                            </li>
                            <li className="current">
                              <em>
                                {data.data.firstname} {data.data.lastname}
                              </em>
                            </li>
                          </ol>
                        </nav>
                      </Col>
                    </Row>
                    <div className="row">
                      <div className="col-md-3 col-12">
                        <div className="profileLeftBox slideInUp wow">
                          <p>
                            Industry{" "}
                            <span className="boldText">
                              {data.data.industry}
                            </span>
                            <br />
                            Qulification{" "}
                            <span className="boldText">
                              {data.data.qualification}
                            </span>
                            <br />
                            Interested field{" "}
                            <span className="boldText">
                              {data.data.interested_field}
                            </span>
                            <br />
                            Country{" "}
                            <span className="boldText">
                              {data.data.country}
                            </span>
                          </p>
                          <div className="proTextTtile">
                            <h1 className="headingtext">
                              {data.data.firstname} <br />
                              {data.data.lastname}
                            </h1>
                            <p>
                              Joined 26/04/2018
                              <br /> Courses 21
                            </p>
                            <p>Connect with {data.data.firstname} on </p>
                            <div className="profileFollowList">
                              <ul>
                                <li>
                                  <a href={data.data.facebook} target="_blank">
                                    <i className="fab fa-facebook-f"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href={data.data.linkedin} target="_blank">
                                    <i className="fab fa-linkedin-in"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href={data.data.twitter} target="_blank">
                                    <i className="fab fa-twitter"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href={data.data.youtube} target="_blank">
                                    <i className="fab fa-youtube"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-9 col-12">
                        <div className="profileRightBox clearfix slideInUp wow">
                          <img
                            className="img-fluid myProfileImg imgTransfer"
                            src="/assets/images/my-profile.png"
                            alt="AD"
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-5">

            </div> */}
                      <div className="col-sm-12 slideInUp wow">
                        <h1 className="headingtext">About </h1>
                        <div className="awardTextInner awardwithoutLine">
                          <div className="awadText">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.data.biography,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="studyDetailwrapper">
                    <div className="container">
                      <h3 className="headingSubtitle slideInUp wow">
                        Continue your study 2 out of 8
                      </h3>
                      <div className="studyBox clearfix slideInUp wow">
                        <Row>
                          <div className="col-md-3 col-12">
                            {/* <div className="studyImgBox"> */}
                              <img
                                className="img-fluid rounded w-100"
                                src="/assets/images/knowledge_1.jpg" alt=""
                              />
                            {/* </div> */}
                          </div>
                          <div className="col-md-9 col-12">
                            {/* <div className="studyTextBox"> */}
                              <div className="studyTitle pt-1">
                                Personal Financial Well-Being
                              </div>
                              <div className="studySubTitle">Finance</div>
                              <div className="studyTime">
                                Starting date 12/03/2019 Time estimated to
                                finish: 2 months copy
                              </div>
                              <div className="studyBody">
                                <div className="study30">
                                  <div className="studytype ">Quizz 14% </div>
                                  <a href="">Continue Course</a>
                                </div>
                                <div className="study30">
                                  <div className="studytype">SCORM 0% </div>
                                  <a href="">Continue Course</a>
                                </div>
                                <div className="study30">
                                  <div className="studytype">Audio 0% </div>
                                  <a href="">Continue Course</a>
                                </div>
                              {/* </div> */}
                            </div>
                          </div>
                        </Row>
                      </div>
                      <div className="studyBox clearfix slideInUp wow">
                      <Row>
                          <div className="col-md-3 col-12">
                            {/* <div className="studyImgBox"> */}
                            <img
                            className="img-fluid rounded w-100"
                            src="/assets/images/knowledge_2.jpg" alt=""
                          />
                            {/* </div> */}
                          </div>
                          <div className="col-md-9 col-12">
                            {/* <div className="studyTextBox"> */}
                            <div className="studyTitle pt-1">
                            Personal Financial Well-Being
                          </div>
                          <div className="studySubTitle">Finance</div>
                          <div className="studyTime">
                            Starting date 12/03/2019 Time estimated to finish: 2
                            months copy
                          </div>
                          <div className="studyBody">
                            <div className="study30">
                              <div className="studytype">Quizz 14% </div>
                              <a href="">Continue Course</a>
                            </div>
                            <div className="study30">
                              <div className="studytype">SCORM 0% </div>
                              <a href="">Continue Course</a>
                            </div>
                            <div className="study30">
                              <div className="studytype">Audio 0% </div>
                              <a href="">Continue Course</a>
                            </div>
                          </div>
                            {/* </div> */}
                          </div>
                        </Row>
                        </div>
                      {/* <div className="studyBox clearfix slideInUp wow">
                        <div className="studyImgBox">
                          <img
                            className="img-fluid"
                            src="/assets/images/knowledge_2.jpg" alt=""
                          />
                        </div>
                        <div className="studyTextBox">
                          <div className="studyTitle">
                            Personal Financial Well-Being
                          </div>
                          <div className="studySubTitle">Finance</div>
                          <div className="studyTime">
                            Starting date 12/03/2019 Time estimated to finish: 2
                            months copy
                          </div>
                          <div className="studyBody">
                            <div className="study30">
                              <div className="studytype">Quizz 14% </div>
                              <a href="">Continue Course</a>
                            </div>
                            <div className="study30">
                              <div className="studytype">SCORM 0% </div>
                              <a href="">Continue Course</a>
                            </div>
                            <div className="study30">
                              <div className="studytype">Audio 0% </div>
                              <a href="">Continue Course</a>
                            </div>
                          </div>
                        </div>
                      </div> */}


                      <div className="addMore">
                        <i className="fas fa-plus"></i>
                      </div>
                    </div>
                  </div>
                  <div className="recommendationswrapper">
                    <div className="container">
                      <h3 className="headingSubtitle slideInUp wow">
                        Our recommendations 2 out of 5
                      </h3>

                      <Row>
                      <div className="libraryInfobox slideInUp wow">
                        <div className="col-lg-3 col-md-3 col-12">
                        <div className="">
                          <span className="new">New</span>
                          <img
                            className="img-fluid rounded"
                            src="/assets/images/knowledge_1.jpg"
                            alt="AD"
                          />
                        </div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-12">
                        <div className="">
                          <div className="libraryTitle pt-1">
                            Personal Financial Well-Being Understanding Your
                            Financial Life
                          </div>
                          <div className="libraryBody">
                            Managing your finances is one of the most important
                            things you can do in your life. It is the difference
                            between living a life your handed or living the life
                            you choose!
                          </div>
                          <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration:
                            23h 45min
                          </div>
                          <div className="libraryStar mt-3">
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <img
                              className="img-fluid LLike"
                              src="/assets/images/like-icon.png"
                              alt="AD"
                            />
                            <img
                              className="img-fluid lShare"
                              src="/assets/images/share-icon.png"
                              alt="AD"
                            />
                          </div>
                          <div className="librarybuttonList mt-4">
                            <ul>
                              <li className="p-0 mr-4">
                                <a href="">
                                  <img src="/assets/images/pdf.png" alt="AD" />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li className="p-0 mr-4">
                                <a href="">
                                  <img
                                    src="/assets/images/audio1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li className="p-0 mr-4">
                                <a href="">
                                  <img
                                    src="/assets/images/edit1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li className="p-0">
                                <a href="">
                                  <img
                                    src="/assets/images/video1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                        <div className="text-center">
                          <div className="boldAmount">30 USD</div>
                          <div className="bundlePrice">( Bundle Price )</div>
                          <button className="btn btnBlue mt-2">Add to Cart </button>
                        </div>
                        </div>
                        </div>
                      </Row>

                      {/* <div className="libraryInfobox slideInUp wow">
                        <div className="LImgBox">
                          <span className="new">New</span>
                          <img
                            className="img-fluid"
                            src="/assets/images/knowledge_1.jpg"
                            alt="AD"
                          />
                        </div>
                        <div className="LTextBox">
                          <div className="libraryTitle">
                            Personal Financial Well-Being Understanding Your
                            Financial Life
                          </div>
                          <div className="libraryBody">
                            Managing your finances is one of the most important
                            things you can do in your life. It is the difference
                            between living a life your handed or living the life
                            you choose!
                          </div>
                          <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration:
                            23h 45min
                          </div>
                          <div className="libraryStar">
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <img
                              className="img-fluid LLike"
                              src="/assets/images/like-icon.png"
                              alt="AD"
                            />
                            <img
                              className="img-fluid lShare"
                              src="/assets/images/share-icon.png"
                              alt="AD"
                            />
                          </div>
                          <div className="librarybuttonList">
                            <ul>
                              <li>
                                <a href="">
                                  <img src="/assets/images/pdf.png" alt="AD" />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <img
                                    src="/assets/images/audio1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <img
                                    src="/assets/images/edit1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <img
                                    src="/assets/images/video1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="LPriceInfoBox">
                          <div className="boldAmount">30 USD</div>
                          <div className="bundlePrice">( Bundle Price )</div>
                          <button className="btn btnBlue">Add to Cart </button>
                        </div>
                      </div> */}

                      <Row>
                      <div className="libraryInfobox slideInUp wow">
                      <div className="col-lg-3 col-md-3 col-12">
                      <div className="">
                          <span className="new">New</span>
                          <img
                            className="img-fluid rounded"
                            src="/assets/images/knowledge_1.jpg"
                            alt="AD"
                          />
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-7 col-12">
                      <div className="">
                          <div className="libraryTitle pt-1">
                            Personal Financial Well-Being Understanding Your
                            Financial Life
                          </div>
                          <div className="libraryBody">
                            Managing your finances is one of the most important
                            things you can do in your life. It is the difference
                            between living a life your handed or living the life
                            you choose!
                          </div>
                          <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration:
                            23h 45min
                          </div>
                          <div className="libraryStar mt-3">
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <img
                              className="img-fluid LLike"
                              src="/assets/images/like-icon.png"
                              alt="AD"
                            />
                            <img
                              className="img-fluid lShare"
                              src="/assets/images/share-icon.png"
                              alt="AD"
                            />
                          </div>
                          <div className="librarybuttonList">
                            <ul>
                              <li className="p-0 mr-4">
                                <a href="">
                                  <img src="/assets/images/pdf.png" alt="AD" />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li className="p-0 mr-4">
                                <a href="">
                                  <img
                                    src="/assets/images/audio1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li className="p-0 mr-4">
                                <a href="">
                                  <img
                                    src="/assets/images/edit1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <img
                                    src="/assets/images/video1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-12">
                      <div className="text-center">
                          <div className="boldAmount">30 USD</div>
                          <div className="bundlePrice">( Bundle Price )</div>
                          <button className="btn btnBlue mt-2">Add to Cart </button>
                        </div>
                      </div>
                        </div>
                      </Row>

                      {/* <div className="libraryInfobox slideInUp wow">
                        <div className="LImgBox">
                          <span className="new">New</span>
                          <img
                            className="img-fluid"
                            src="/assets/images/knowledge_1.jpg"
                            alt="AD"
                          />
                        </div>
                        <div className="LTextBox">
                          <div className="libraryTitle">
                            Personal Financial Well-Being Understanding Your
                            Financial Life
                          </div>
                          <div className="libraryBody">
                            Managing your finances is one of the most important
                            things you can do in your life. It is the difference
                            between living a life your handed or living the life
                            you choose!
                          </div>
                          <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration:
                            23h 45min
                          </div>
                          <div className="libraryStar">
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                            <img
                              className="img-fluid LLike"
                              src="/assets/images/like-icon.png"
                              alt="AD"
                            />
                            <img
                              className="img-fluid lShare"
                              src="/assets/images/share-icon.png"
                              alt="AD"
                            />
                          </div>
                          <div className="librarybuttonList">
                            <ul>
                              <li>
                                <a href="">
                                  <img src="/assets/images/pdf.png" alt="AD" />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <img
                                    src="/assets/images/audio1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <img
                                    src="/assets/images/edit1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <img
                                    src="/assets/images/video1.png"
                                    alt="AD"
                                  />{" "}
                                  20 USD
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="LPriceInfoBox">
                          <div className="boldAmount">30 USD</div>
                          <div className="bundlePrice">( Bundle Price )</div>
                          <button className="btn btnBlue">Add to Cart </button>
                        </div>
                      </div> */}

                      <div className="addMore">
                        <i className="fas fa-plus"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default StudentProfileView;
