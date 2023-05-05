import React, { useEffect, useState, useContext } from "react";

import Utils from "./../Utils";

import _ from "lodash";
import UserMenu from "./UserMenu";
import UserContext from "./../contexts/UserContext";

const Header = (props) => {
  const { userData } = useContext(UserContext);

  const [loggedIn, setLoggedIn] = useState(Utils.isLoggedIn(userData));

  const udata = { ...userData };
  const $ = window.$;
  console.log(udata);
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
              <a href={`${process.env.REACT_APP_PUBLIC_URL}/help-for-student`}>
                Help for Student <span>Start with a plan and finish with results.</span>
              </a>
            </li>
            <li>
              <a href={`${process.env.REACT_APP_PUBLIC_URL}/contact-us`}>
                Contact <span>Get to know us, get to work with us.</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <header className="header fixed-top">
        <div className="container">
          <a className="navbar-brand" href={`${process.env.REACT_APP_PUBLIC_URL}/`}>
            {props.sitesetting.company_name}
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/my-cart">
                <img className="img-fluid shoppingIcon" src="/assets/images/cart-white.png" alt="autodidact" />
              </a>
            </li>
            {!loggedIn && (
              <li className="nav-item" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">
                Log in
              </li>
            )}
            <li className="nav-item profile_toggle">
              <div className="Dropdown-Help">
                {loggedIn && (
                  <>
                    <a href={Utils.getTrainerURL(`login`)} type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                      {_.get(udata, "base_image", "") !== "" && (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/uploads/${Utils.isTrainer() ? "base" : "student/base"}/${_.get(
                            udata,
                            "base_image",
                            ""
                          )}`}
                          className="img-fluid"
                          title={`Logged in as ${udata.firstname} ${udata.lastname}`}
                        />
                      )}
                    </a>
                    <ul className="dropdown-menu" role="menu">
                      <UserMenu />
                    </ul>
                  </>
                )}
              </div>
            </li>

            {/* <li className="nav-item ">
                        <img className="img-fluid menu-toggle" src="/assets/images/toggle.png" alt="toggle-img" />
                    </li> */}
            <li className="nav-item ">
              <div className="Dropdown-Helps">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                  <img className="img-fluid" src="/assets/images/toggle.png" alt="toggle-img" />
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

        {/* {loggedIn && <div className="profile_menu from-right">
                <UserMenu />
            </div>} */}
      </header>
    </>
  );
};

export default Header;
