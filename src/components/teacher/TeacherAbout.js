import React, { useEffect, useState, useContext } from 'react';
import Utils from '../../Utils';
import TeacherNav from './TeacherNav';
import StarRatings from 'react-star-ratings';
import _ from 'lodash';
import UserContext from './../../contexts/UserContext';
import {useParams} from "react-router-dom";

const TeacherAbout = (props) => {
    const socialPlatforms = ['facebook','instagram','linkedin','pinterest','twitter','youtube'];
    const data = props.data;
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [starLoading, setStarLoading] = useState(false);
    const [rating, setRating] = useState(props.rating);
    const {getServerData,setServerData} = useContext(UserContext);

    useEffect(window.scrollEffect, []);
    let addthis = false;
    useEffect(() => {
        if(addthis) return;
        addthis = true;
        let script = document.createElement('script');
        script.src = "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-637c3fedb27a530a";
        document.body.append(script);
    }, []);

    const setTrainerRating = (rated) => {
        setStarLoading(true);
        let ratingData = new FormData();
        ratingData.append('trainer_id',data.user_id);
        ratingData.append('rating',rated);
        setServerData(`trainer/setRating`,ratingData,'post')
        .then(res => {
            console.log(res);
            setStarLoading(false);
            setRating(res.success ? res.rating : props.rating);
        })
        .catch(msg=> {
            setStarLoading(false);
            setRating(props.rating);
            // do nothing
        });
    };

    return (<>       
        <div className='row'>
            <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
                
                <TeacherNav slug={props.slug} page={props.page} onPageChange={props.onPageChange} />
                
                <div className="slideInUp wow ">
                    <div className="teacherdetails">
                        <div className="profileDetailRating">
                           
                        {!starLoading && <div>
                            <StarRatings
                                rating={rating.rating}
                                starEmptyColor="#dddddd"
                                starRatedColor="#f3ac1b"
                                starHoverColor="#bfa700"
                                starDimension="20px"
                                starSpacing="2px"
                                changeRating={Utils.isLoggedIn() ? setTrainerRating : false}
                            />
                            <div className="mx-2 my-1">{rating.ratings} ratings</div>
                        </div>}
                        </div>

                        <p>Joined {Utils.shortDate(data.created_at)}<br />
                            Students {props.total.students}<br />
                            Courses {props.total.courses}</p>
                        <div className="profileFollowList">
                            <h5>Follow Ben on</h5>
                            <ul>
                                {socialPlatforms.map(sp => !_.isEmpty(_.get(props,`social.${sp}`,'')) && <li><a target="_blank" href={props.social[sp]}><i className={`fab fa-${sp}`}></i></a></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
            <div className="profileHeading teacherheading">
                    <h1 className="headingtext wow zoomIn">{data.firstname} {data.lastname}</h1>
                    <ul className="profile-socail-icon">
    
                        <li className='mr-2'><div className="addthis_inline_share_toolbox"></div></li>
                    </ul>
                    
                </div>
                <img className="img-fluid imgTransfer pt-3 W-100" src={`${process.env.REACT_APP_API_URL}/uploads/profile/${encodeURI(data.profile_image)}`} alt='profile' />
            
            </div>
        </div>
                        
        <div className="aboutMe-pr0fle slideInUp wow ">
            <h1 className="headingtext mt-4">01 About me</h1>
            <div className="awardTextInner awardwithoutLine">
                <div className="awadText" dangerouslySetInnerHTML={{__html:data.biography}} ></div>
            </div>
        </div>

        <div className="profileTabQu slideInUp wow pb-5">
            <ul className="nav">
                <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#academicContent">Academic Qualification</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#experienceContent">Experiences</a></li>
            </ul>
            <div className="tab-content pt-4">
                <div className="profileContent tab-pane active" id="academicContent">
                    <div className="input-flex-container" style={{maxWidth:(props.academics.length*125)+'px'}}>
                        <div className="input">
                        </div>
                        {props.academics.map(a=> <div className="input" key={a.id}>
                            <span data-year={a.year} data-info={a.qualification}></span>
                        </div> )}
                    </div>
                </div>
                <div className="profileContent tab-pane fade" id="experienceContent">
                <div className="input-flex-container" style={{maxWidth:(props.experiences.length*130)+'px'}}>
                        <div className="input">
                        </div>
                        {props.experiences.map(a=> <div className="input" key={a.id}>
                            <span data-year={a.company} data-info={a.location}></span>
                        </div> )}
                    </div>
                </div>
            </div>
        </div>
                    
        <div className="awradwrapper mt-3">
            <div className="container pt-5">
                <img className="img-fluid inline-photo show-on-scroll" src={`${process.env.REACT_APP_API_URL}/uploads/award/${encodeURI(data.award_image)}`} alt="profile" />
            </div>
            <div className="container">
                <div className="awardTextWrapper">
                    <h1 className="headingtext slideInUp wow">Award <br /> Certifications </h1>
                    <div className="awardTextInner">

                        {props.awards.map(a=><div className="awadText slideInUp wow ">
                            <span className="awardYear">{a.year}</span>      <span className="boldText">{a.award}</span> | {a.organisation} | {a.url}
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
        <div className="trainingWrapper">
            <div className="container">
                <div className="awardTextWrapper">
                    <h1 className="headingtext slideInUp wow ">Trainings Conducted</h1>
                    <div className="awardTextInner awardwithoutLine" dangerouslySetInnerHTML={{__html:data.trainings}}></div>
                </div>
            </div>
        </div>
        
       
    </>);
};

export default TeacherAbout;