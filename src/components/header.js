import React from "react";

const Header = (props) => {
    return(<>
        <a href="/">Go Home</a>
        <a href="/login" className="ms-2">Login</a>
        <div className="sidenav">
        <div className="sidebarInner">
            <div className="overlay"></div>
            <img className="img-fluid closemenu" src="assets/images/close-circle.png" />
            <form className="searchBOx mobileView" >
               <input className="form-control" type="text" placeholder="How can I help you ?" />
            </form>
            <ul className="navList">
                <li><a href="about.php">About us <span>Any queries? Problems with upload? No matter what the issue is, 
                    we will help, support and find a way!</span></a></li>
                <li><a href="404.php">AD Studio <span>Lorem Ipsum is simply dummy text</span></a></li>
                <li><a href="">Help for Trainer <span>Lorem Ipsum is simply dummy text .</span></a></li>
                <li><a href="">Help for Student <span>Lorem Ipsum is simply dummy text .</span></a></li>
                <li><a href="">Contact <span>Lorem Ipsum is simply dummy text of.</span></a></li>
            </ul>
        </div>
    </div>
    <header className="header fixed-top">
        <div className="container-fluid">
            <a className="navbar-brand" href="index.php">AD</a>
            <form className="searchBOx searchBOxwhite" >
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
            </form>
            <ul className="navbar-nav">
                <li className="nav-item"><a href="shopping-cart.php"><img className="img-fluid shoppingIcon" src="assets/images/cart-white.png"/></a></li>
                <li className="nav-item" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">
                    Log in
                </li>
                <li className="nav-item ">
                    <img className="img-fluid menu-toggle" src="assets/images/toggle.png" alt="toggle-img"/>
                </li> 
            </ul>
        </div>
    </header>
    </>);
};

export default Header;