import React, {useState} from 'react';
import Utils from '../../Utils';

const TeacherNav = (props) => {

  const navs = {
    about       :'01 About',
    service     :'02 Services',
    knowledge   :'03 Knowledge',
    community   :'04 Community',
    library     :'05 Library'
  };

  const setPageName = (pname) => (e) => {
    props.onPageChange(pname);
    e.preventDefault();
    return false;
  }

  const trainerUrl = Utils.getTrainerURL();
  const checkLogin = Utils.isLoggedIn();
  return <div className="profiletabBox">
    <ul className="profileTab slideInUp wow">
      {Object.keys(navs).map(k => <li key={k} className={props.page===k ? "lineANimation" : ""}>
        <div className="navLinksEdit"><div className="editTag"><a href={Utils.getTrainerURL(k)} onClick={setPageName(k)}>{navs[k]}</a></div>
          {checkLogin && <div className="editLink"><a href={trainerUrl+'my-profile#'+k}>Edit</a></div>} </div>                    
      </li>)}
    </ul>
  </div>;

};

export default TeacherNav;