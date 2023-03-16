import React,{useEffect, useState, useContext} from "react";

import Utils from './../Utils';

import _ from "lodash";
import UserMenu from './UserMenu';

const Header = (props) => {

    const [loggedIn,setLoggedIn] = useState(Utils.isLoggedIn());
    
    const udata = Utils.getUserData();
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
                <img className="img-fluid closemenu" src="/assets/images/close-circle.png" />
                <form className="searchBOx mobileView" >
                <input className="form-control" type="text" placeholder="How can I help you ?" />
                </form>
                <ul className="navList">
                    <li><a href={`${process.env.REACT_APP_PUBLIC_URL}/about-us`}>About us <span>Any queries? Problems with upload? No matter what the issue is, 
                        we will help, support and find a way!</span></a></li>
                    <li><a href={`${process.env.REACT_APP_PUBLIC_URL}/ad-studio`}>Tverse Studio <span>World best learning plaform.</span></a></li>
                    <li><a href={`${process.env.REACT_APP_PUBLIC_URL}/ad-trainer`}>Help for Trainer <span>Get to know us, get to work with us.</span></a></li>
                    <li><a href={`${process.env.REACT_APP_PUBLIC_URL}/ad-student`}>Help for Student <span>Start with a plan and finish with results.</span></a></li>
                    <li><a href={`${process.env.REACT_APP_PUBLIC_URL}/contact-us`}>Contact <span>Get to know us, get to work with us.</span></a></li>
                </ul>
            </div>
        </div>
        <header className="header fixed-top">
            <div className="container">
                <a className="navbar-brand" href={`${process.env.REACT_APP_PUBLIC_URL}/`}>TVERSE</a>
                {/* <form className="searchBOx searchBOxwhite" >
                    <div className="input-group">
                        <div className="input-group-btn search-panel" data-search="students">
                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <span className="search_by">All</span> <span><img src="/assets/images/arrow_white.png" /></span>
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
                </form> */}
                <ul className="navbar-nav">
                    <li className="nav-item"><a href="/my-cart"><img className="img-fluid shoppingIcon" src="/assets/images/cart-white.png" alt="autodidact"/></a></li>
                    {!loggedIn && <li className="nav-item" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">
                        Log in
                    </li>}
                    
                    {loggedIn && <li className="nav-item profile_toggle">                        
                    {_.get(udata,'base_image','')!=='' && 
                    
                        <img src={`${process.env.REACT_APP_API_URL}/uploads/${ Utils.isTrainer() ?  "base" : "student/base"}/${_.get(udata,'base_image','')}`} className="img-fluid" title={`Logged in as ${udata.firstname} ${udata.lastname}`} />}
                    </li>}

                    <li className="nav-item ">
                        <img className="img-fluid menu-toggle" src="/assets/images/toggle.png" alt="toggle-img" />
                    </li>
                </ul>
            </div>

            {loggedIn && <div className="profile_menu from-right">
                <UserMenu />
            </div>}


        </header>
    </>);
};

export default Header;