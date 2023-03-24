import React, { useEffect, useState, useContext } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";

import { TeacherSubscribe, TeacherAbout, TeacherService, TeacherKnowledge, TeacherBlogs, TeacherLibrary } from "./index";

import _ from "lodash";

import UserContext from "./../../contexts/UserContext";
import Loader from "../Loader";

const TeacherProfile = (props) => {
  const slug = props.trainerSlug;

  const [page, setPage] = useState(props.page);

  const [trainer, setTrainer] = useState({});

  const [loading, setLoading] = useState(true);

  const { getServerData } = useContext(UserContext);

  const params = { slug: slug, page: page, onPageChange: setPage };

  useEffect(() => {
    getServerData(`trainer/profile/${slug}`, true)
      .then((tData) => {
        setTrainer(tData);
        setLoading(false);
      })
      .catch((msg) => {
        setTrainer({ success: false, message: msg });
        setLoading(false);
      });
  }, []);

  useEffect(window.scrollEffect, [trainer]);
  console.log("trainerdata" + trainer.awards);

  return (
    <Container fluid className="h-100 p-0">
      {loading && (
        <>
          <Loader />
        </>
      )}

      {!loading && (
        <>
          {_.get(trainer, "success", false) === false && (
            <>
              <div className="profile-wrapper">
                <div className="container">
                  <h1>Trainer</h1>
                  <Alert variant="danger">
                    <div className="m-5">{trainer.message}</div>
                  </Alert>
                </div>
              </div>
            </>
          )}

          {_.get(trainer, "success", false) !== false && (
            <>
              <div className="profile-wrapper">
                <div className="container">
                  {/*<nav>
                    <ol className="cd-breadcrumb">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li className="current">
                        <em>
                          {trainer.about.firstname} {trainer.about.lastname}
                        </em>
                      </li>
                    </ol>
          </nav>*/}
                  {page === "about" && (
                    <>
                      <TeacherSubscribe {...params} />
                      <TeacherAbout
                        {...params}
                        data={trainer.about}
                        rating={trainer.rating}
                        social={trainer.social}
                        total={trainer.total}
                        academics={trainer.academics}
                        experiences={trainer.experiences}
                        awards={trainer.awards}
                      />
                    </>
                  )}
                  {page === "service" && <TeacherService data={trainer.service} {...params} />}
                  {page === "codeprep" && <TeacherKnowledge data={trainer.knowledge} blogs={trainer.blogs} {...params} />}
                  {page === "community" && (
                    <TeacherBlogs data={trainer.blogs} {...params} youtube={trainer.community.youtube_community} events={trainer.events} />
                  )}
                  {page === "library" && <TeacherLibrary data={trainer.library} courses={trainer.courses} {...params} />}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default TeacherProfile;
