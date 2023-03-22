import React, { useState } from "react";
import Utils from "../../Utils";
import { useLocation } from "react-router-dom";
import _ from "lodash";

const TeacherNav = (props) => {
  const navs = {
    about: "About",
    service: "Services",
    codeprep: "CodePRep",
    //community: "Community",
    blogs: "Blogs",
    library: "Courses",
  };

  const { pathname } = useLocation();

  const setPageName = (pname) => (e) => {
    props.onPageChange(pname);
    e.preventDefault();
    return false;
  };

  const menuItem = (label, path) => (
    <li key={path} className={`nav-item ${path.indexOf(props.page) > -1 ? "active" : ""}`}>
      <div className="navLinksEdit">
        <div className="editTag">
          <a className="nav-link" href={`/${path}`}>
            {label}
          </a>
        </div>
        {/* {checkLogin && <div className="editLink"><a href={trainerUrl+'my-profile#'+k}>Edit</a></div>}  */}
      </div>
    </li>
  );

  // const trainerUrl = Utils.getTrainerURL();
  // const checkLogin = Utils.isLoggedIn();
  /* {pathname.indexOf("/professional-profile") > -1 && menuItem("Profile", "")}
      {pathname.indexOf("/professional-profile") === -1 && menuItem("Professional Profile", "professional-profile/about")} */
  return (
    <ul className="navbar-nav mt-2 mt-lg-0">      
      {pathname.indexOf("/professional-profile") > -1 && menuItem("Home", "")}
      {pathname.indexOf("/professional-profile") === -1 && menuItem("Home", "")}
      {_.map(navs, (label, k) => menuItem(label, `professional-profile/${k}`))}
    </ul>
  );
};

export default TeacherNav;
