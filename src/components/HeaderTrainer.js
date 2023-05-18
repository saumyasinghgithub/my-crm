import React, { useEffect, useState, useContext } from "react";

import Utils from "./../Utils";

import _ from "lodash";
import UserMenu from "./UserMenu";
import TeacherNav from "./teacher/TeacherNav";
import UserContext from "./../contexts/UserContext";

const HeaderTrainer = (props) => {
  const { getUserData, isLoggedIn, isTrainer } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const $ = window.$;

  const userData = getUserData();

  useEffect(() => {
    $(".menu-toggle").on("click", function () {
      $(".sidenav").addClass("width100");
      $("body").addClass("menuopen");
    });
    $(".closemenu").on("click", function () {
      $(".sidenav").removeClass("width100");
      $("body").removeClass("menuopen");
    });

    if (loggedIn) {
      $(".profile_toggle").on("click", function () {
        $(".profile_menu").addClass("profile_width100");
      });
      $(".student_prof_cross").on("click", function () {
        $(".profile_menu").removeClass("profile_width100");
      });
    }
  }, []);

  return (
    <>
      <div className="sidenav">
        <div className="sidebarInner">
          <div className="overlay"></div>
          <img className="img-fluid closemenu" src="/assets/images/close-circle.png" />
          <form className="searchBOx mobileView">
            <input className="form-control" type="text" placeholder="How can I help you ?" />
          </form>
          <ul className="navList">
            <li>
              <a href={Utils.getTrainerURL(`help-for-student`)}>
                Help for Student <span>Start with a plan and finish with results.</span>
              </a>
            </li>
            <li>
              <a href={Utils.getTrainerURL(`contact-us`)}>
                Contact <span>Get to know us, get to work with us.</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <header className="header fixed-top whiteHeader">
        <div className="container">
          <div className="HeaderNavigation">
            <a className="navbar-brand">{props.sitesetting.company_name}</a>
            <ul className="navbar-nav HeaderNavUl">
              <li className="nav-item">
                <a href="/my-cart">
                  <img className="img-fluid shoppingIcon" src="/assets/images/cart.png" alt="cart" />
                </a>
              </li>
              <li className="nav-item profile_toggle">
                <div className="Dropdown-Help">
                  {!isLoggedIn() && (
                    <a href={Utils.getTrainerURL(`login`)} className="btn btn-default">
                      Log in
                    </a>
                  )}
                  {isLoggedIn() && (
                    <>
                      <a href="#" type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/uploads/${isTrainer() ? "base" : "student/base"}/${_.get(
                            userData,
                            "base_image",
                            ""
                          )}`}
                          className="img-fluid"
                          title={`Logged in as ${userData.firstname} ${userData.lastname}`}
                        />
                      </a>
                      <ul className="dropdown-menu" role="menu">
                        <UserMenu sitesetting={_.get(props, "sitesetting", {})} />
                      </ul>
                    </>
                  )}
                </div>
              </li>
              <li className="nav-item ">
                <div className="Dropdown-Helps">
                  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <img className="img-fluid" src="/assets/images/toggle-black.png" alt="toggle-img" />
                  </button>
                  <ul className="dropdown-menu" role="menu">
                    <li className="dropdown-item HelpDropdown">
                      <a href={Utils.getTrainerURL(`help-for-student`)}>Help for Student</a>
                    </li>
                    <li className="dropdown-item HelpDropdown">
                      <a href={Utils.getTrainerURL(`contact-us`)}>Contact</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* New Header */}

        <nav className="navbar navbar-expand-lg navbar-light trainernewheader pt-0 pb-0">
          <button
            className="navbar-toggler tooglebuttonheader"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo01">
            {Utils.hasSubdomain() && <TeacherNav slug={props.slug} page={props.page} onPageChange={props.onPageChange} />}
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderTrainer;
