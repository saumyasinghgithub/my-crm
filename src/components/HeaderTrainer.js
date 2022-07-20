import React,{useEffect, useState, useContext} from "react";

import Utils from './../Utils';

import UserContext from './../contexts/UserContext';
import _ from "lodash";

const HeaderTrainer = (props) => {

    const [loggedIn,setLoggedIn] = useState(Utils.isLoggedIn());
    const {logout} = useContext(UserContext);

    const onLogout = (e) => {
        e.preventDefault();
        logout(() => {
            window.location.href='/';
        })
        return false;
    }

    const $ = window.$;
    
    useEffect(()=>{

        $(".menu-toggle").on('click',function() {
            $(".sidenav").addClass("width100");
            $("body").addClass("menuopen");
        });
        $(".closemenu").on('click',function() {
            $(".sidenav").removeClass("width100");
            $("body").removeClass("menuopen")
        });

        if(loggedIn){
            $('.profile_toggle').on('click',function() {
                $('.profile_menu').addClass('profile_width100');
            });
            $('.student_prof_cross').on('click',function() {
            $('.profile_menu').removeClass('profile_width100');
            });
        }

},[]);


    return(<>
<header className="header fixed-top whiteHeader">
    <div className="container">
        <a className="navbar-brand" href="/">AD</a>
        <form className="searchBOx" >
                <div className="input-group">
                    <div className="input-group-btn search-panel" data-search="students">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            <span className="search_by">All</span> <span><img src={`${process.env.PUBLIC_URL}/assets/images/arrow.png`} alt="AD" /></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li className="dropdown-item"><a data-search="industry">Industry</a></li>
                            <li className="dropdown-item"><a data-search="industry1">Industry 1</a></li>
                            <li className="dropdown-item"><a data-search="industry2">Industry 2</a></li>
                            <li className="dropdown-item"><a data-search="industry3">Industry 3</a></li>
                        </ul>
                    </div>   
                   <input className="form-control" type="text" name="x" placeholder="How can I help you ?" />              
                </div> 
            </form>
        <ul className="navbar-nav">
            {/* <li className="nav-item"><a href="wish-list.php"><img className="img-fluid " src={`${process.env.PUBLIC_URL}/assets/images/like-icon.png`} alt="AD Like" /></a></li> */}
            {/* <li className="nav-item"><a href="shopping-cart.php"><img className="img-fluid shoppingIcon" src={`${process.env.PUBLIC_URL}/assets/images/cart.png`} alt="AD" /></a></li>
            <li className="nav-item"><a href="massege.php"><img className="img-fluid " src={`${process.env.PUBLIC_URL}/assets/images/massege.png`} alt="AD" /></a></li> */}
            <li className="nav-item"><a href="notification.php"><img className="img-fluid " src={`${process.env.PUBLIC_URL}/assets/images/notification_icon.png`} alt="AD" /></a></li>
            <li className="nav-item profile_toggle">
                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/assets/images/userImg.png`} alt="AD" />
            </li>
        </ul>
    </div>
    {loggedIn && <div className="profile_menu from-right">
        <div className="slide-in-content slide-in-contentteacher">
            <div className="student_prof_cross"><img src={`${process.env.PUBLIC_URL}/assets/images/student_profile_crossicon.png`} alt="AD" /></div>
            <div className="row">
            <div className="col-sm-6">
                <ul className="profile_menu_list">
                    <li><a href={`${process.env.PUBLIC_URL}/my-profile`} className="active">My Profile</a></li>
                    <li><a href="sales.php">Sales</a></li>
                    {Utils.isTrainer() && 
                    <li><a href="my-students.php">My Students</a></li>
                    }
                    <li><a href={`${process.env.PUBLIC_URL}/my-course`}>My Course</a></li>
                    <li><a href="/ad-studio">Ad Studio</a></li>
                    <li><a href="">Help for you</a></li>   
                </ul>
            </div>
            <div className="col-sm-6">
                <ul className="profile_menu_list">  
                {loggedIn &&
                    <li><a href={`${process.env.PUBLIC_URL}/view-profile`}>View My Profile</a></li>  
                 }                                   
                    <li><a href="" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">Switch to Student</a></li>
                    <li><a href="logout" onClick={onLogout}>Log Out</a></li>
                </ul>
            </div>
            </div>
        </div>
    </div>}
</header>
    </>);
};

export default HeaderTrainer;