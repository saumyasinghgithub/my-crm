import React,{useState, useContext} from "react";

import Utils from './../Utils';

import UserContext from './../contexts/UserContext';
import _ from "lodash";


const UserMenu = (props) => {  

  const [loggedIn,setLoggedIn] = useState(Utils.isLoggedIn());
  const udata = Utils.getUserData();

  const {logout, loginToMoodle} = useContext(UserContext);

  const getSlug = () => {
    let url = process.env.PUBLIC_URL + "/";
    url += Utils.isTrainer() ? "trainers" : "student/my-profile"; 
    url += Utils.isStudent() ? "/": "/" + Utils.getUserData().slug;
    //console.log(Utils.getUserData())
    return url;
  };

  const onLogout = (e) => {
      e.preventDefault();
      logout(() => {
          window.location.href='/';
      })
      return false;
  };

  return <div className="slide-in-content slide-in-contentteacher">
    <div className="student_prof_cross"><img src="/assets/images/student_profile_crossicon.png" alt="AD" /></div>
    <div className="row">
        <div className="col-12"><h4>Hello {udata.firstname} {udata.lastname}!</h4></div>
        <div className="col-sm-6">
            <ul className="profile_menu_list">
            {Utils.isTrainer() && 
                <li><a href={`${process.env.PUBLIC_URL}/my-profile`}>My Profile</a></li>
            }
            {Utils.isStudent() && 
                <li><a href={`${process.env.PUBLIC_URL}/student/my-profile/edit`}>My Profile</a></li>
            }
            {Utils.isStudent() &&
            <li><a href={`${process.env.PUBLIC_URL}/my-order`}>My Order</a></li> 
            }
            {Utils.isTrainer() &&
                <li><a href={`${process.env.PUBLIC_URL}/my-sales`}>My Sales</a></li>
            }
                
            {Utils.isTrainer() && 
                <li><a href={`${process.env.PUBLIC_URL}/my-student`}>My Students</a></li>
            }
            {Utils.isTrainer() && 
            <li><a href={`${process.env.PUBLIC_URL}/my-course`}>My Course</a></li>
            }
            {loggedIn &&
                <li><a href={`${process.env.PUBLIC_URL}/preferred-courses`}>Preferred Courses</a></li>
            }

            <li><a href="">Help for you</a></li>   
            </ul>
        </div>
        <div className="col-sm-6">
            <ul className="profile_menu_list">            
            {loggedIn && <>
                <form name="moodleLoginForm" method="post" action={`${process.env.REACT_APP_MOODLE_URL}/login/index.php`}>
                    <input type="hidden" name="username" />
                    <input type="hidden" name="password" />
                </form>
                <li><a href="#" onClick={(e) => {e.preventDefault();loginToMoodle(document.forms.moodleLoginForm);}} >Enrolled Courses</a></li>
                <li><a href={getSlug()}>View My Profile</a></li>  
                <li><a href={`${process.env.PUBLIC_URL}/preferred-trainers`}>Preferred Trainer</a></li>  
            </>} 

            {Utils.isTrainer() &&
                <li><a href={`${process.env.PUBLIC_URL}/my-blog`} >My Blog</a></li>
            }                       
                                        <li><a href={`${process.env.PUBLIC_URL}/ad-studio`}>Ad Studio</a></li>
                <li><a href="logout" onClick={onLogout}>Log Out</a></li>
            </ul>
        </div>
    </div>
  </div>;
};

export default UserMenu;
