import React, { useState, useContext } from "react";

import Utils from "./../Utils";

import UserContext from "./../contexts/UserContext";
import _ from "lodash";

const UserMenu = (props) => {
  const { userData, logout, loginToMoodle } = useContext(UserContext);

  const [loggedIn, setLoggedIn] = useState(Utils.isLoggedIn(userData));

  const hasSubdomain = Utils.hasSubdomain();

  const getSlug = () => {
    let url = process.env.REACT_APP_PUBLIC_URL + "/student/my-profile";
    if (Utils.isTrainer(userData)) {
      url = Utils.getTrainerURL("", Utils.getUserData().slug);
    }
    return url;
  };

  const onLogout = (e) => {
    //localStorage.removeItem(process.env.REACT_APP_APPNAME + "-userData");
    e.preventDefault();
    logout(() => {
      if (hasSubdomain) {
        var win = document.getElementById("mainDomainIframe").contentWindow;
        win.postMessage("false", process.env.REACT_APP_PUBLIC_URL);
      }
      window.setTimeout(() => (window.location.href = "/"), 1000);
    });
    return false;
  };

  return (
    <>
      {Utils.isTrainer(userData) && (
        <>
          <li>
            <a href={`${process.env.PUBLIC_URL}/my-profile#about`}>Edit Profile</a>
          </li>
          <li>
            <a href={`${process.env.PUBLIC_URL}/site-settings`}>Edit Site Settings</a>
          </li>
        </>
      )}
      {Utils.isStudent(userData) && (
        <li>
          <a href={`${process.env.PUBLIC_URL}/student/my-profile/edit`}>My Profile</a>
        </li>
      )}
      {Utils.isStudent(userData) && (
        <li>
          <a href={Utils.getTrainerURL(`my-order`)}>My Order</a>
        </li>
      )}
      {Utils.isTrainer(userData) && (
        <>
          <li>
            <a href={Utils.getTrainerURL(`my-sales`)}>My Sales</a>
          </li>
        </>
      )}
      {Utils.isTrainer(userData) && (
        <li>
          <a href={Utils.getTrainerURL(`my-course`)}>Manage Course</a>
        </li>
      )}
      {Utils.isTrainer(userData) && (
        <li>
          <a href={Utils.getTrainerURL(`manage-coupons`)}>Manage Coupons</a>
        </li>
      )}
      {loggedIn && (
        <>
          <form name="moodleLoginForm" method="post" action={`${process.env.REACT_APP_MOODLE_URL}/login/index.php`}>
            <input type="hidden" name="username" />
            <input type="hidden" name="password" />
          </form>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                loginToMoodle(document.forms.moodleLoginForm);
              }}
            >
              Manage LMS
            </a>
          </li>
          {/*<li>
                  <a href={getSlug()+'professional-profile'}>Professional Profile</a>
                  </li>*/}
          {/*<li>
          <a href={Utils.getTrainerURL(`preferred-trainers`)}>
            Preferred Trainer
          </a>
                </li>*/}
        </>
      )}

      {Utils.isTrainer(userData) && (
        <>
          <li>
            <a href={Utils.getTrainerURL(`my-blog`)}>Manage Blogs</a>
          </li>
          <li>
            <a href={Utils.getTrainerURL(`my-corporate-groups`)}>My Corporate Groups</a>
          </li>
        </>
      )}

      <li>
        <a href={Utils.getTrainerURL(`chgpwd`)}>Change Password</a>
      </li>

      <li>
        <a href="logout" onClick={onLogout}>
          Log Out
        </a>
      </li>
    </>
  );
};

export default UserMenu;
