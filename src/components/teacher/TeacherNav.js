import React, {useState} from 'react';
import Utils from '../../Utils';

const TeacherNav = (props) => {

  const navs = {
    about       :'About',
    service     :'Services',
    knowledge   :'Knowledge',
    community   :'Community',
    library     :'Library'
  };

  const setPageName = (pname) => (e) => {
    props.onPageChange(pname);
    e.preventDefault();
    return false;
  }

  const trainerUrl = Utils.getTrainerURL();
  const checkLogin = Utils.isLoggedIn();
  return <ul className="navbar-nav mt-2 mt-lg-0">
      {Object.keys(navs).map(k => <li key={k} className={`nav-item ${props.page===k ? "active" : ""}`}>
        <div className="navLinksEdit"><div className="editTag"><a className="nav-link" href={Utils.getTrainerURL(k)} onClick={setPageName(k)}>{navs[k]}</a></div>
          {checkLogin && <div className="editLink"><a href={trainerUrl+'my-profile#'+k}>Edit</a></div>} </div>                    
      </li>)}
    </ul>;

};

export default TeacherNav;