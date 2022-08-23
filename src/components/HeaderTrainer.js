import React,{useEffect, useState, useContext} from "react";

import Utils from './../Utils';

import UserContext from './../contexts/UserContext';
import _ from "lodash";

const HeaderTrainer = (props) => {

    const [loggedIn,setLoggedIn] = useState(Utils.isLoggedIn());
    const {logout} = useContext(UserContext);
    const udata = Utils.getUserData();

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
           <div className="sidenav">
            <div className="sidebarInner">
                <div className="overlay"></div>
                <img className="img-fluid closemenu" src="assets/images/close-circle.png" />
                <form className="searchBOx mobileView" >
                <input className="form-control" type="text" placeholder="How can I help you ?" />
                </form>
                <ul className="navList">
                    <li><a href="/about">About us <span>Any queries? Problems with upload? No matter what the issue is, 
                        we will help, support and find a way!</span></a></li>
                    <li><a href="/ad-studio">AD Studio <span>Lorem Ipsum is simply dummy text</span></a></li>
                    <li><a href="/ad-trainer">Help for Trainer <span>Lorem Ipsum is simply dummy text .</span></a></li>
                    <li><a href="/ad-student">Help for Student <span>Lorem Ipsum is simply dummy text .</span></a></li>
                    <li><a href="/contact-us">Contact <span>Lorem Ipsum is simply dummy text of.</span></a></li>
                </ul>
            </div>
        </div>

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
                    <li className="nav-item"><a href="/my-cart"><img className="img-fluid shoppingIcon" src="assets/images/cart-white.png" alt="autodidact"/></a></li>
                    {!loggedIn && <li className="nav-item" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">
                        Log in
                    </li>}
                    
                    {loggedIn && <li className="nav-item profile_toggle">
                        <img className="img-fluid" src="assets/images/userImg.png" alt="AD" />
                    </li>}

                    <li className="nav-item ">
                        <img className="img-fluid menu-toggle" src="assets/images/toggle.png" alt="toggle-img" />
                    </li>
        </ul>
    </div>
    {loggedIn && <div className="profile_menu from-right">
                <div className="slide-in-content slide-in-contentteacher">
                    <div className="student_prof_cross"><img src="assets/images/student_profile_crossicon.png" alt="AD" /></div>
                    <div className="row">
                    <div className="col-sm-6">
                        <ul className="profile_menu_list">
                        {Utils.isTrainer() && 
                            <li><a href={`${process.env.PUBLIC_URL}/my-profile`} className="active">My Profile</a></li>
                        }
                        {Utils.isStudent() && 
                            <li><a href={`${process.env.PUBLIC_URL}/student/my-profile/edit`} className="active">My Profile</a></li>
                        }
                        {Utils.isStudent() &&
                           <li><a href={`${process.env.PUBLIC_URL}/my-order/${udata.id}`}>My Order</a></li> 
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
                        {Utils.isStudent() &&
                            <li><a href={`${process.env.PUBLIC_URL}`}>Prefered Courses</a></li>
                        }
                        <li><a href={`${process.env.PUBLIC_URL}/ad-studio`}>Ad Studio</a></li>
                        <li><a href="">Help for you</a></li>   
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <ul className="profile_menu_list">
                        <li><a href={`${process.env.PUBLIC_URL}/`}>Account Information</a></li>
                        {loggedIn &&
                            <li><a href={getSlug()}>View My Profile</a></li>  
                        }
                        {Utils.isStudent() &&
                            <li><a href={getSlug()}>Prefered Trainer</a></li>  
                        } 

                        {Utils.isTrainer() &&
                            <li><a href={`${process.env.PUBLIC_URL}/my-blog`} >My Blog</a></li>
                        }                       
                            
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