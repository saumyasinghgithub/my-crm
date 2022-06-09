import React, {useContext, useEffect} from "react";

import Utils from './../Utils';

import UserContext from './../contexts/UserContext';

const SearchResult = (props) => {

  const $ = window.$;

  const {setServerData} = useContext(UserContext);

  useEffect(()=>{
    
    setServerData('search-trainers',Utils.getUserData().calibs).then(console.log).catch(console.log);

    $(".circleChart").circleChart({
      color: "#6ecff6",
      backgroundColor: "#fff",
      background: true,
      size: 100,
  });
  },[]);

  const renderResultAnalysis = () => <section className="home-result-wrapper">
    <ul className="resultlist">
        <li>
            <div className="circleChart" id="1" data-value="77" data-text="77%"></div>
            <span>Trainers</span>
        </li>
        <li>
            <div className="canvas-wrap">
                <div className="circleChart" id="2" data-value="77" data-text="77%"></div>
                <span id="procent2" classs="procent"></span>
            </div>
            <span>Courses</span>
        </li>
        <li>
            <div className="canvas-wrap">
                <div className="circleChart" id="3" data-value="77" data-text="77%"></div>
                <span id="procent3" classs="procent"></span>
            </div>
            <span>Book</span>
        </li>
        <li>
            <div className="canvas-wrap">
                <div className="circleChart" id="4" data-value="77" data-text="77%"></div>
                <span id="procent4" classs="procent"></span>
            </div>
            <span>Audio</span>
        </li>
        <li>
            <div className="canvas-wrap">
                <div className="circleChart" id="5" data-value="77" data-text="77%"></div>
                <span id="procent5" classs="procent"></span>
            </div>
            <span>Quizz</span>
        </li>
    </ul>
  </section>;

const renderResults = () => <div className="resultDisplay">
    <div className="filterResultBox">
        <img src="/assets/images/cross.png" className="img-fluid filterCloseBtn" />
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <div className="filtertypeBox">
                        <h4>Mode</h4>
                        <div className="filterCircle">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <ul>
                            <li>Article</li>
                            <li>Video</li>
                            <li>Audio</li>
                            <li>PPT</li>
                            <li>Quizz</li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="filtertypeBox">
                        <h4>Availability</h4>
                        <div className="filterCircle">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <ul>
                            <li>Starting soon</li>
                            <li>Current</li>
                            <li>Upcoming</li>
                            <li>Sefl paced</li>
                            <li>Archieved</li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="filtertypeBox">
                        <h4>Level</h4>
                        <div className="filterCircle">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <ul>
                            <li>All levels</li>
                            <li>Beginners</li>
                            <li>intermediate</li>
                            <li>Expert</li>
                        </ul>
                    </div>
                </div>         
                <div className="col-sm-4">
                    <div className="filtertypeBox">
                        <h4>Duration</h4>
                        <div className="filterCircle">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <ul>
                            <li>0-2 hours</li>
                            <li>3-5 hours</li>
                            <li>7-16 hours</li>
                            <li>17+ hours</li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="filtertypeBox">
                        <h4>Price</h4>
                        <div className="filterCircle">
                            <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <ul>
                            <li>5 - <span className="desktopview">20 USD</span><span className="mobileview">20$</span></li>
                            <li>30 - 70 USD</li>
                            <li>80 - 1<span className="desktopview">20 USD</span><span className="mobileview">20$</span></li>
                            <li>120 - 180 USD</li>
                        </ul>
                    </div>
                </div>      
            </div>
        </div>
    </div>
    <div id="resultDisplay"> 
        <div className="filterbox">
            <form>
                <div className="form-group">
                    <label className="filterSeach"><img src="/assets/images/filter-icon.png" /> Filter for courses</label>
                    <a href="search.php"><input type="text" className="form-control" placeholder="Search Keywords" /></a>
                    
                </div>
            </form>
        </div>
        <div className="flexWrapper">
            <div className="flexItem flex20">
                <ul className="nav">
                    <li className="active">
                        <a href="#tab_a" data-toggle="pill">
                            <img className="img-fluid" src="/assets/images/trainer1.png" />
                            <span>Sally Winter</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tab_b" data-toggle="pill">
                            <img className="img-fluid" src="/assets/images/trainer2.png" />
                            <span>Ben Jacobs</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tab_c" data-toggle="pill">
                            <img className="img-fluid" src="/assets/images/trainer3.png" />
                            <span>Jon Hung</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tab_d" data-toggle="pill">
                            <img className="img-fluid" src="/assets/images/trainer4.png" />
                            <span>Jose Alexandro</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tab_e" data-toggle="pill">
                            <img className="img-fluid" src="/assets/images/trainer5.png" />
                            <span>Claire Clarkr</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tab_a" data-toggle="pill">
                            <img className="img-fluid" src="/assets/images/trainer6.png" />
                            <span>Jerry Clarkr</span>
                        </a>
                    </li>
                </ul>  
                <div className="alltrainers"><a href="list-trainer.php">6 of 84 trainers <i className="far fa-eye"></i></a></div>                          
            </div>
            <div className="flexItem flex80">
                <div className="tab-content">
                    <div className="tab-pane active trainer1" id="tab_a">
                      <div className="tab-text-box">
                          <img className="img-fluid progileImg" src="/assets/images/trainer1.png" />
                          <div className="bio-data-header">
                              <h3><a href="teacher-profile.php">Sally Winter</a></h3>
                              <div className="bioInfo">Industry <span>Academics</span></div>
                              <div className="bioInfo">Qulification <span>Master</span></div>
                              <div className="bioInfo">Year of Experience <span>5+ yrs</span></div>
                              <div className="bioInfo">Country <span>USA</span></div>
                          </div>
                          <div className="bio-data-body">
                                <div className="bioBodyInfolist"><a href="course-card.php">
                                    <ul>
                                        <li>Chief Financial Officer Leadership </li>
                                        <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                        <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                    <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                </div>
                                            </li>
                                        <li></li>
                                    </ul></a>
                                </div>
                                <div className="bioBodyInfolist"><a href="course-card.php">
                                    <ul>
                                        <li>Personal Finance Masterclass - <br />
                                                Easy Guide to Better Finances</li>
                                        <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                        <li>
                                            <div className="circleBox">
                                                <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="circleBox">
                                                <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                            </div>
                                        </li>
                                    </ul></a>
                                </div>
                                <div className="bioBodyInfolist"><a href="course-card.php">
                                    <ul>
                                        <li>Personal Financial Well-Being</li>
                                        <li><img className="img-fluid iconImg"  src="/assets/images/icon3.png" /></li>
                                        <li>
                                            <div className="circleBox">
                                                <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="circleBox">
                                                <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="circleBox">
                                                <img className="img-fluid" src="/assets/images/video.png" />
                                                <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                            </div>
                                        </li>
                                        <li className="dotmore"><span></span><span></span><span></span></li>
                                    </ul></a>
                                </div>
                                <div className="bioBodyInfolist"><a href="course-card.php">
                                    <ul>
                                        <li>Advanced Financial Management <br />
                                                for CA/CMA/CFA/ACCA/CS/MBA</li>
                                        <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                        <li>
                                            <div className="circleBox">
                                                <img className="img-fluid" src="/assets/images/doc-icon.png" />
                                                <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="circleBox">
                                                <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                            </div>
                                        </li>
                                    </ul></a>
                                </div>
                                <div className="bioBodyInfolist"><a href="course-card.php">
                                    <ul>
                                        <li>Finance for the Real World - <br />
                                                Corporate Finance 101 </li>
                                        <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                        <li>
                                            <div className="circleBox">
                                                <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                            </div>
                                        </li>                                            
                                    </ul></a>
                                </div>
                          </div>
                      </div>
                    </div>
                    <div className="tab-pane trainer2" id="tab_b">
                            <div className="tab-text-box">
                                <img className="img-fluid progileImg" src="/assets/images/trainer2.png" />
                                <div className="bio-data-header">
                                    <h3><a href="teacher-profile.php">Ben Jacobs</a></h3>
                                    <div className="bioInfo">Industry <span>Academics</span></div>
                                    <div className="bioInfo">Qulification <span>Master</span></div>
                                    <div className="bioInfo">Year of Experience <span>5+ yrs</span></div>
                                    <div className="bioInfo">Country <span>USA</span></div>
                                </div>
                                <div className="bio-data-body">
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Chief Financial Officer Leadership </li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li></li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Personal Finance Masterclass - <br />
                                                        Easy Guide to Better Finances</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Personal Financial Well-Being</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon3.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/video.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li className="dotmore"><span></span><span></span><span></span></li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Advanced Financial Management <br />
                                                        for CA/CMA/CFA/ACCA/CS/MBA</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/doc-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Finance for the Real World - <br />
                                                        Corporate Finance 101 </li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>                                            
                                            </ul></a>
                                        </div>
                                </div>
                            </div>
                    </div>
                    <div className="tab-pane trainer3" id="tab_c">
                        <div className="tab-text-box">
                                <img className="img-fluid progileImg" src="/assets/images/trainer3.png" />
                                <div className="bio-data-header">
                                    <h3><a href="teacher-profile.php">Jon Hung</a></h3>
                                    <div className="bioInfo">Industry <span>Academics</span></div>
                                    <div className="bioInfo">Qulification <span>Master</span></div>
                                    <div className="bioInfo">Year of Experience <span>5+ yrs</span></div>
                                    <div className="bioInfo">Country <span>USA</span></div>
                                </div>
                                <div className="bio-data-body">
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Chief Financial Officer Leadership </li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li></li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Personal Finance Masterclass - <br />
                                                        Easy Guide to Better Finances</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Personal Financial Well-Being</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon3.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/video.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li className="dotmore"><span></span><span></span><span></span></li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Advanced Financial Management <br />
                                                        for CA/CMA/CFA/ACCA/CS/MBA</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/doc-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Finance for the Real World - <br />
                                                        Corporate Finance 101 </li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>                                            
                                            </ul></a>
                                        </div>
                                </div>
                            </div>
                    </div>
                    <div className="tab-pane trainer4" id="tab_d">
                            <div className="tab-text-box">
                                <img className="img-fluid progileImg" src="/assets/images/trainer4.png" />
                                <div className="bio-data-header">
                                    <h3><a href="teacher-profile.php">Jose Alexandro</a></h3>
                                    <div className="bioInfo">Industry <span>Academics</span></div>
                                    <div className="bioInfo">Qulification <span>Master</span></div>
                                    <div className="bioInfo">Year of Experience <span>5+ yrs</span></div>
                                    <div className="bioInfo">Country <span>USA</span></div>
                                </div>
                                <div className="bio-data-body">
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Chief Financial Officer Leadership </li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li></li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Personal Finance Masterclass - <br />
                                                        Easy Guide to Better Finances</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Personal Financial Well-Being</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon3.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/video.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                                <li className="dotmore"><span></span><span></span><span></span></li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Advanced Financial Management <br />
                                                        for CA/CMA/CFA/ACCA/CS/MBA</li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/doc-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                        <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                    </div>
                                                </li>
                                            </ul></a>
                                        </div>
                                        <div className="bioBodyInfolist"><a href="course-card.php">
                                            <ul>
                                                <li>Finance for the Real World - <br />
                                                        Corporate Finance 101 </li>
                                                <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                                <li>
                                                    <div className="circleBox">
                                                        <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                        <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                    </div>
                                                </li>                                            
                                            </ul></a>
                                        </div>
                                </div>
                            </div>
                    </div>
                    <div className="tab-pane trainer5" id="tab_e">
                        <div className="tab-text-box">
                            <img className="img-fluid progileImg" src="/assets/images/trainer5.png" />
                            <div className="bio-data-header">
                                <h3><a href="teacher-profile.php">Claire Clark</a></h3>
                                <div className="bioInfo">Industry <span>Academics</span></div>
                                <div className="bioInfo">Qulification <span>Master</span></div>
                                <div className="bioInfo">Year of Experience <span>5+ yrs</span></div>
                                <div className="bioInfo">Country <span>USA</span></div>
                            </div>
                            <div className="bio-data-body">
                                    <div className="bioBodyInfolist"><a href="course-card.php">
                                        <ul>
                                            <li>Chief Financial Officer Leadership </li>
                                            <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                    <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                </div>
                                            </li>
                                            <li></li>
                                        </ul></a>
                                    </div>
                                    <div className="bioBodyInfolist"><a href="course-card.php">
                                        <ul>
                                            <li>Personal Finance Masterclass - <br />
                                                    Easy Guide to Better Finances</li>
                                            <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                    <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                    <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                </div>
                                            </li>
                                        </ul></a>
                                    </div>
                                    <div className="bioBodyInfolist"><a href="course-card.php">
                                        <ul>
                                            <li>Personal Financial Well-Being</li>
                                            <li><img className="img-fluid iconImg" src="/assets/images/icon3.png" /></li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                    <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                    <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/video.png" />
                                                    <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                </div>
                                            </li>
                                            <li className="dotmore"><span></span><span></span><span></span></li>
                                        </ul></a>
                                    </div>
                                    <div className="bioBodyInfolist"><a href="course-card.php">
                                        <ul>
                                            <li>Advanced Financial Management <br />
                                                    for CA/CMA/CFA/ACCA/CS/MBA</li>
                                            <li><img className="img-fluid iconImg" src="/assets/images/icon1.png" /></li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/doc-icon.png" />
                                                    <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/audio-icon.png" />
                                                    <span className="desktopview">20 USD</span><span className="mobileview">20$</span>
                                                </div>
                                            </li>
                                        </ul></a>
                                    </div>
                                    <div className="bioBodyInfolist"><a href="course-card.php">
                                        <ul>
                                            <li>Finance for the Real World - <br />
                                                    Corporate Finance 101 </li>
                                            <li><img className="img-fluid iconImg" src="/assets/images/icon2.png" /></li>
                                            <li>
                                                <div className="circleBox">
                                                    <img className="img-fluid" src="/assets/images/edit-icon.png" />
                                                    <span className="desktopview">15 USD</span><span className="mobileview">15$</span>
                                                </div>
                                            </li>                                            
                                        </ul></a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="alltrainers"><a href="list-course.php">all 10 courses <i className="far fa-eye"></i></a></div>
            </div>
        </div>
    </div>
  </div>;


  return <>
  {renderResultAnalysis()}
  {renderResults()}
  </>;
}

export default SearchResult;