import React, {useContext, useEffect, useState} from "react";

import Utils from './../Utils';

import _ from 'lodash';

import UserContext from './../contexts/UserContext';

const SearchResult = (props) => {

    const [viewTrainer, setViewTrainer] = useState({});
    const [tData, setTData] = useState({pageInfo: {}, data: []});
    const [filter, setFilter] = useState({start: 0, limit: 4, curpage: 1});

  const $ = window.$;

  const {getServerData} = useContext(UserContext);

  useEffect(()=>{
    
    let calibs = _.get(Utils.getUserData(),'calibs',[]);
    let data = {};
    _.each(calibs,(pval,pk) => {
        if(pval!=''){
            data[pk] = parseInt(pval);
        }
    })

    getServerData(`trainer/search?calibs=${JSON.stringify(data)}&paCalibs=${Utils.searchCalibs.join(',')}&start=${filter.start}&limit=${filter.limit}`,true)
    .then(setTData)
    .catch(console.log);

    
    $(".circleChart").circleChart({
      color: "#6ecff6",
      backgroundColor: "#fff",
      background: true,
      size: 100,
  });
  },[]);
  
  useEffect(() => {setViewTrainer(_.get(tData,'data.0',{}))},[tData]);
console.log(tData)
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

const showPageInfo = () => {
    let tcounts = filter.start + filter.limit;
    return <>{_.min([filter.start + filter.limit, tData.pageInfo.total])} of {_.get(tData,'pageInfo.total',0)} trainers</>
}

const renderResource = (icon, type,resources) => {
    const res = _.filter(resources,{type: type});
    return  <>
        {res.length > 0 && <li>
            <div className="circleBox">
                <img className="img-fluid" src={`/assets/images/${icon}`} />
                <span className="desktopview">{res[0].price} USD</span><span className="mobileview">{res[0].price}$</span>
            </div>
        </li>}
    </>
}

const renderCourseItem = (course) => {

    const res = {
        'pdf': 'pdf.png',
        'PPT': 'doc-icon.png',
        'audio': 'audio-icon.png',
        'video': 'video.png',
        'scorm': 'scome.png'
    };
    return <div className="bioBodyInfolist">
        <a href={`${process.env.PUBLIC_URL}/courses/${course.slug}`}>
            <ul>
                <li>{course.name}</li>
                <li><img className="img-fluid iconImg" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${course.course_image}`} /></li>
                {_.map(res,(icon,type) => renderResource(icon,type,course.resources))}
                {course.resources.length > 3 && <li className="dotmore"><span></span><span></span><span></span></li>}
            </ul>
        </a>
    </div>;
}

const showTrainerDetail = () => {
    let trainer = viewTrainer;
    let trainerURL = process.env.REACT_APP_PUBLIC_URL;

    let trainerbg = `${process.env.REACT_APP_API_URL}/uploads/profile/${trainer.profile_image}`;
    return <div className="tab-content">
        <div className="tab-pane active trainerbg" style={{backgroundImage: `url("${trainerbg}")` }} id="tab_a">
                      
            <div className="tab-text-box">
                <img className="img-fluid progileImg" src={`${process.env.REACT_APP_API_URL}/uploads/base/${encodeURI(trainer.base_image)}`} alt={_.get(trainer,'firstname','')} />
                <div className="bio-data-header">
                    <h3><a href={`${process.env.REACT_APP_PUBLIC_URL}/trainers/${trainer.slug}/about`} >{_.get(trainer,'firstname','')} {_.get(trainer,'lastname','')}</a></h3>
                    <div className="bioInfo">Industry <span>{_.map(_.filter(_.get(trainer,'calibs',[]),{"pa_id": 1}), c => c.pa_value).join(',')}</span></div>
                    <div className="bioInfo">Qulification <span>{_.map(_.filter(_.get(trainer,'calibs',[]),{"pa_id": 51}), c => c.pa_value).join(',')}</span></div>
                    <div className="bioInfo">Year of Experience <span>{_.map(_.filter(_.get(trainer,'calibs',[]),{"pa_id": 68}), c => c.pa_value).join(',')}</span></div>
                    <div className="bioInfo">Country <span>{_.map(_.filter(_.get(trainer,'calibs',[]),{"pa_id": 83}), c => c.pa_value).join(',')}</span></div>
                </div>
                <div className="bio-data-body">
                   
                    {_.get(trainer,'courses.courses',[]).map(renderCourseItem)}
                    <div className="txtR">
                        <a href={trainerURL} className="action tocart primary btn btnBlue"><span>View Profile</span></a>
                        <a href={`${trainerURL}/courses`} target="_blank" className="action tocart primary btn btnBlue"><span>View Courses</span></a>
                        <a href="#" data-post="" className="action tocart primary btn btnBlue" data-action="add-to-wishlist">
                                <span>Make Favourite</span></a>
                    </div>
                </div>
            </div>
        </div>
        <div className="alltrainers">Total {trainer.courses.total} courses <i className="far fa-eye"></i></div>
    </div>
}

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
                    {_.get(tData,'data',[]).map((trainer,idx) => <li key={idx} className={idx===0 ? 'active' : ''}>
                        <span onClick={() => setViewTrainer(trainer)}>
                            <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/uploads/base/${trainer.base_image}`} alt={_.get(trainer,'firstname','')} />
                            <span>{_.get(trainer,'firstname','')} {_.get(trainer,'lastname','')}</span>
                        </span>
                    </li>)}
                </ul>  
                <div className="alltrainers">{showPageInfo()} <i className="far fa-eye"></i></div>                          
            </div>
            <div className="flexItem flex80">
                {_.get(viewTrainer, 'user_id',0) > 0 && showTrainerDetail()}
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