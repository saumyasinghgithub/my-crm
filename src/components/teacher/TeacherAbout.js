import React, { useEffect, useState, useContext } from 'react';
import Utils from '../../Utils';
import TeacherNav from './TeacherNav';
import StarRatings from 'react-star-ratings';
import _ from 'lodash';
import UserContext from './../../contexts/UserContext';
import { useParams } from "react-router-dom";
import { InlineShareButtons } from 'sharethis-reactjs';

const TeacherAbout = (props) => {
    const socialPlatforms = ['facebook', 'instagram', 'linkedin', 'pinterest', 'twitter', 'youtube'];
    const data = props.data;
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [starLoading, setStarLoading] = useState(false);
    const [rating, setRating] = useState(props.rating);
    const { getServerData, setServerData } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(Utils.isLoggedIn());

    //useEffect(window.scrollEffect, []);
    /*let addthis = false;
    useEffect(() => {
        if (addthis) return;
        addthis = true;
        let script = document.createElement('script');
        script.src = "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-637c3fedb27a530a";
        document.body.append(script);
    }, []);*/

    const setTrainerRating = (rated) => {
        setStarLoading(true);
        let ratingData = new FormData();
        ratingData.append('trainer_id', data.user_id);
        ratingData.append('rating', rated);
        setServerData(`trainer/setRating`, ratingData, 'post')
            .then(res => {
                console.log(res);
                setStarLoading(false);
                setRating(res.success ? res.rating : props.rating);
            })
            .catch(msg => {
                setStarLoading(false);
                setRating(props.rating);
                // do nothing
            });
    };
    console.log(Utils.getUserData());
    const trainerSlug = Utils.getUserData().slug;
    const trainerUrl = Utils.getTrainerURL("", trainerSlug);
    //const testUrl = 'https://www.npmjs.com/search?q=sharethis';
    const networks = ['facebook', 'twitter', 'linkedin'];
    const trainerImage = Utils.getUserData().base_image;
    const trainerFullName = Utils.getUserData().firstname + ' ' + Utils.getUserData().middlename + ' ' + Utils.getUserData().lastname;
    const trainerUsername = Utils.getUserData().firstname;
    const trainerIntro = Utils.getUserData().intro;


    return (<>
        <div className='container'>
            {/* <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>

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
                                {socialPlatforms.map(sp => !_.isEmpty(_.get(props, `social.${sp}`, '')) && <li><a target="_blank" href={props.social[sp]}><i className={`fab fa-${sp}`}></i></a></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            {Utils.isTrainer() && loggedIn &&  (
                <div className='editTrainerdetails'>
                    <div className='row'>
                        <div className='col-12 text-right'>
                            <a className=' bg-primary p-2 text-white rounded' href='/my-profile#about'>Edit <i className='fas fa-edit text-white'></i></a>
                        </div>
                    </div>
                </div>
            )}
            <div className='row'>
            <div className='col-lg-12 col-md-12 col-12 pt-2 pb-1'>
                <div className="profileHeading teacherheading">
                    {/* <h1 className="headingtext wow zoomIn">{data.firstname} {data.lastname}</h1> */}
                    <h1 className="headingtext">{data.firstname} {data.lastname}</h1>
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

                    <p className='joindetails mt-4'>Joined {Utils.shortDate(data.created_at)} &nbsp;&nbsp;&nbsp;&nbsp;
                        Students {props.total.students} &nbsp;&nbsp;&nbsp;&nbsp;
                        Courses {props.total.courses}</p>
                    <div className="profileFollowList">
                        <h5>Follow Ben on</h5>
                        <ul>
                            {socialPlatforms.map(sp => !_.isEmpty(_.get(props, `social.${sp}`, '')) && <li><a target="_blank" href={props.social[sp]}><i className={`fab fa-${sp}`}></i></a></li>)}
                        </ul>
                    </div>
                    <ul className="profile-socail-icon">
                        <li><div>
                            <InlineShareButtons config={{
                                alignment: 'center',  // alignment of buttons (left, center, right)
                                color: 'social',      // set the color of buttons (social, white)
                                enabled: true,        // show/hide buttons (true, false)
                                font_size: 16,        // font size for the buttons
                                labels: 'cta',        // button labels (cta, counts, null)
                                language: 'en',       // which language to use (see LANGUAGES)
                                networks: networks,
                                padding: 10,          // padding within buttons (INTEGER)
                                radius: 4,            // the corner radius on each button (INTEGER)
                                show_total: true,
                                size: 30,             // the size of each button (INTEGER)

                                // OPTIONAL PARAMETERS
                                url: trainerUrl, // (defaults to current url)
                                image: trainerImage,  // (defaults to og:image or twitter:image)
                                description: trainerIntro,       // (defaults to og:description or twitter:description)
                                title: trainerFullName,            // (defaults to og:title or twitter:title)
                                message: trainerIntro,     // (only for email sharing)
                                subject: trainerUsername,  // (only for email sharing)
                                username: trainerUsername // (only for twitter sharing)
                            }} />
                        </div></li>
                        {/* <li className='mr-2'><div className="addthis_inline_share_toolbox"></div></li> */}
                    </ul>

                </div>
                <img className="img-fluid imgTransfer pt-3 W-100" src={`${process.env.REACT_APP_API_URL}/uploads/profile/${encodeURI(data.profile_image)}`} alt='profile' />

            </div>
            </div>
        </div>

        <div className="container aboutMe-pr0fle ">
            <h1 className="headingtext mt-4">01 About me</h1>
            <div className="awardTextInner awardwithoutLine">
                <div className="awadText" dangerouslySetInnerHTML={{ __html: data.biography }} ></div>
            </div>
        </div>

        <div className="container profileTabQu pb-5">
            <ul className="nav">
                <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#academicContent">Academic Qualification</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#experienceContent">Experiences</a></li>
            </ul>
            <div className="tab-content pt-4">
                <div className="profileContent tab-pane active" id="academicContent">
                    <div className="input-flex-container" style={{ maxWidth: (props.academics.length * 125) + 'px' }}>
                        <div className="input">
                        </div>
                        {props.academics.map(a => <div className="input" key={a.id}>
                            <span data-year={a.year} data-info={a.qualification}></span>
                        </div>)}
                    </div>
                </div>
                <div className="profileContent tab-pane fade" id="experienceContent">
                    <div className="input-flex-container" style={{ maxWidth: (props.experiences.length * 130) + 'px' }}>
                        <div className="input">
                        </div>
                        {props.experiences.map(a => <div className="input" key={a.id}>
                            <span data-year={a.company} data-info={a.location}></span>
                        </div>)}
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

                        {props.awards.map(a => <div className="awadText slideInUp wow ">
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
                    <div className="awardTextInner awardwithoutLine" dangerouslySetInnerHTML={{ __html: data.trainings }}></div>
                </div>
            </div>
        </div>
    </>);
};

export default TeacherAbout;