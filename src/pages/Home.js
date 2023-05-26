import { useEffect, useContext, useState } from "react";

import _ from "lodash";

import UserContext from "./../contexts/UserContext";

import Utils from "./../Utils";

//import TeacherLanding from './TeacherLanding';
import LandingPage from "./LandingPage";

const Home = (props) => {
  const hasSubdomain = Utils.hasSubdomain();
  const { getUserData, isLoggedIn, getServerData, addToUserData } = useContext(UserContext);

  console.log("Subdomain check", Utils.subdomain());

  const [pa, setPA] = useState([]);
  const calibs = _.get(getUserData(), "calibs", []);

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    if (!hasSubdomain) {
      getServerData("profile_attributes")
        .then(setPA)
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (!hasSubdomain) {
      window.drumEffect();
    }
  }, [pa]);

  const searchTrainers = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();

    var data = {};
    _.each(frm.elements, (ele) => {
      if (ele.name.indexOf("pa_") > -1) {
        data[ele.name.substring(3)] = ele.value;
      }
    });

    addToUserData({ calibs: data });
    window.location.href = "/search-results";
  };

  const resetSearchTrainers = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    addToUserData({ calibs: [] });
    window.location.reload();
  };

  const renderPA = () => {
    return pa.map((p) => (
      <div className="col-md-4 col-lg-3 pt-1 pb-4" key={p.title}>
        <div className="alert bg-light text-dark filterbgcolor">
          <b>{p.title}</b>
        </div>

        <select name={`pa_${p.id}`}>
          <option value="">{p.title}</option>
          {_.get(p, "children.length", 0) > 0 &&
            p.children.map((pc) => (
              <option key={pc.id} value={pc.id} selected={_.get(calibs, p.id, "") == pc.id}>
                {pc.title}
              </option>
            ))}
        </select>
      </div>
    ));
  };

  return (
    <>
      {hasSubdomain && <LandingPage {...props} />}
      {!hasSubdomain && (
        <>
          <section className="home-wrapper">
            <div className="container">
              <div className="bannerText">WORLD'S TOP BRANDED CORPORATE TRAINERS TO TRANSFORM YOUR PROFESSIONAL CAREER</div>
              <div className="container bannerBottomtext clearfix">
                {!loggedIn && (
                  <ul>
                    <li className="jointrainer">
                      <a href="#signUpTrainer" data-toggle="modal" data-dismiss="modal">
                        Join as a Trainer
                      </a>
                    </li>
                    <li className="jointrainer ml-2">
                      <a href="#signUpStudent" data-toggle="modal" data-dismiss="modal">
                        Join as a Student
                      </a>
                    </li>
                  </ul>
                )}
                <div className="whyAD">
                  <img className="img-fluid" src="/assets/images/why_ad.png" alt="Autodidact" />
                </div>
              </div>
            </div>
          </section>
          <div className="findBox">
            <div className="container">
              <h2>
                Find the <span className="findboxmid">ONE</span> for you!
              </h2>
              {_.get(pa, "length", 0) === 0 && (
                <div className="progress-bar bg-warning text-dark progress-bar-striped progress-bar-animated">Loading Profile Attributes</div>
              )}
              {_.get(pa, "length", 0) > 0 && (
                <div className="mySlides fade">
                  <form onSubmit={searchTrainers} onReset={resetSearchTrainers}>
                    <div className="row">{renderPA()}</div>

                    <div className="text-right">
                      <button type="reset" className="search-trainer me-2 mr-2 my-5">
                        <span className="transition"></span>
                        <span className="gradient"></span>
                        <span className="label">Clear</span>
                      </button>

                      <button type="submit" className="search-trainer my-5">
                        <span className="transition"></span>
                        <span className="gradient"></span>
                        <span className="label">Search</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
