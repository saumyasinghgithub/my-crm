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
