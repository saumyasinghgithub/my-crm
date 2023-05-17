import React, { useEffect, useContext, useState } from "react";
import { Container, Card, Pagination, Row, Col } from "react-bootstrap";
import UserContext from "./../contexts/UserContext";
import Utils from "./../Utils";
import _ from "lodash";

const PreferredTrainers = (props) => {
  const [favs, setFavs] = useState({ loading: true, data: [] });
  const [filters, setFilters] = useState({ start: 0, limit: 9 });
  const { getServerData, setServerData } = useContext(UserContext);

  const $ = window.$;

  const gotoPage = (page) => (e) => {
    const start = (page - 1) * filters.limit;
    setFilters({ ...filters, start: start });
  };

  const fetchFavorites = () => {
    getServerData(`trainer/my-preferred?start=${filters.start}&limit=${filters.limit}`, true)
      .then((res) => {
        setFavs({ ...favs, ...res, loading: false });
      })
      .catch((err) => {
        setFavs({ loading: false, success: false, message: err.message, data: [] });
      });
  };

  useEffect(fetchFavorites, []);
  useEffect(fetchFavorites, [filters]);

  useEffect(window.scrollEffect, []);

  const removeFav = (trainer_id) => (e) => {
    $(e.target).fadeOut();
    setServerData("user/markfav", `trainer_id=${trainer_id}&fav=0`, "post").then(fetchFavorites);
  };

  const renderMyFavs = () => {
    return (
      <>
        <Row>
          {favs.data.map((rec) => (
            <Col xs={12} lg={6} md={6} xl={4} key={rec.id}>
              <Card className="m-2 preferredtrainercard">
                <Card.Body>
                  <img
                    className="img-fluid p-2 text-center h-100 w-100"
                    src={`${process.env.REACT_APP_API_URL}/uploads/base/${rec.base_image}`}
                    alt={_.get(rec, "firstname", "")}
                  />
                  <h3 className="text-center p-2">
                    {_.get(rec, "firstname", "")} {_.get(rec, "lastname", "")}
                  </h3>
                  <Container>
                    <Row>
                      <Col className="col-md-4 col-12 text-left mt-2">
                        <button className="btn btn-danger TrainerActionButton" onClick={removeFav(rec.user_id)}>
                          Remove
                        </button>
                      </Col>
                      <Col className="col-md-8 col-12 mt-2 TrainerActionButton2">
                        <a href={`${process.env.PUBLIC_URL}/trainers/${rec.slug}`} className="btn btn-info TrainerActionButton">
                          View Profile
                        </a>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {favs.pageInfo.total > filters.limit && Utils.showPagination({ ...favs.pageInfo, ..._.pick(filters, ["start", "limit"]) }, gotoPage)}
      </>
    );
  };

  return (
    <>
      <Container className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container">
            {_.get(props, "sitesetting.preferred_trainers", 1) === 0 && <h1>Invalid Access</h1>}
            {_.get(props, "sitesetting.preferred_trainers", 0) > 0 && (
              <>
                <h1>My Preferred Trainers</h1>

                {favs.loading === true && (
                  <div className="alert alert-warning m-5 p-5">
                    Fetching your preferred trainers..
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow="100"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                )}

                {!favs.loading && (
                  <>
                    {!favs.success && <div className="alert alert-danger m-5 p-5">{favs.message}</div>}
                    {favs.success && renderMyFavs()}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PreferredTrainers;
