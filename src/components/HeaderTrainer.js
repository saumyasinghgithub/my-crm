import React, { useEffect, useState, useContext } from "react";

import Utils from "./../Utils";

import _ from "lodash";
import UserMenu from "./UserMenu";
import TeacherNav from "./teacher/TeacherNav";

const HeaderTrainer = (props) => {
  const [loggedIn, setLoggedIn] = useState(Utils.isLoggedIn());

  const udata = Utils.getUserData();

  const $ = window.$;

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
          <a className="navbar-brand">TVERSE</a>         
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/my-cart">
                <img className="img-fluid shoppingIcon" src="/assets/images/cart.png" alt="cart" />
              </a>
            </li>            
            <li className="nav-item profile_toggle">
              <div className="Dropdown-Help">
                {!loggedIn && (
                <a href={Utils.getTrainerURL(`login`)} className="btn btn-default">
                  Log in
                </a>
                )}
                {loggedIn && ( <>
                <a href={Utils.getTrainerURL(`login`)} type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                  {_.get(udata, "base_image", "") !== "" && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${Utils.isTrainer() ? "base" : "student/base"}/${_.get(udata, "base_image", "")}`}
                    className="img-fluid"
                    title={`Logged in as ${udata.firstname} ${udata.lastname}`}
                  />
                )}
                </a> 
                <ul className="dropdown-menu" role="menu"><UserMenu /></ul>               
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
                    <a href={Utils.getTrainerURL(`help-for-student`)}>
                      Help for Student
                    </a>
                  </li>
                  <li className="dropdown-item HelpDropdown">
                    <a href={Utils.getTrainerURL(`contact-us`)}>
                      Contact
                    </a>
                  </li>
                </ul>

              </div>
            </li>
          </ul>
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

        {/* New Header */}
        {/*loggedIn && (
          <div className="profile_menu from-right">
            <UserMenu />
          </div>
        )*/}
      </header>
    </>
  );
};

export default HeaderTrainer;
