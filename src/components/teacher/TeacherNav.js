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


  return <div className="profiletabBox">
    <ul className="profileTab slideInUp wow">
      {Object.keys(navs).map(k => <li key={k} className={props.page===k ? "lineANimation" : ""}>
          <a href={Utils.getTrainerURL(k)} onClick={setPageName(k)}>{navs[k]}</a>
      </li>)}
    </ul>
  </div>;

};

export default TeacherNav;