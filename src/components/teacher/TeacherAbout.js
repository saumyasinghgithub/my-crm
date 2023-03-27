import React, { useEffect, useState, useContext } from "react";
import Utils from "../../Utils";
import TeacherNav from "./TeacherNav";
import StarRatings from "react-star-ratings";
import _ from "lodash";
import UserContext from "./../../contexts/UserContext";
import { useParams } from "react-router-dom";
import { TwitterIcon, FacebookIcon,LinkedinIcon } from "react-share";
import sanitizeHtml from 'sanitize-html';
import { Helmet } from "react-helmet";

function trimText(text,number) {
  if (text.length > number) {
    return text.substr(0, number) + "...";
  } else {
    return text;
  }
}

const TeacherAbout = (props) => {
  const socialPlatforms = ["facebook", "instagram", "linkedin", "pinterest", "twitter", "youtube"];
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
    ratingData.append("trainer_id", data.user_id);
    ratingData.append("rating", rated);
    setServerData(`trainer/setRating`, ratingData, "post")
      .then((res) => {
        console.log(res);
        setStarLoading(false);
        setRating(res.success ? res.rating : props.rating);
      })
      .catch((msg) => {
        setStarLoading(false);
        setRating(props.rating);
        // do nothing
      });
  };
  const trainerSlug = Utils.getUserData().slug;
  const trainerUrl = Utils.getTrainerURL("", trainerSlug);
  const trainerIntro = sanitizeHtml(data.biography, { allowedTags: [] });
  const trainerName = data.firstname+' '+data.lastname;

  return (
    <>
      <div className="container">
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
        {Utils.isTrainer() && loggedIn && Utils.getUserData().id === data.user_id && (
          <div className="editTrainerdetails">
            <div className="row">
              <div className="col-12 text-right">
                <a className=" bg-primary p-2 text-white rounded" href="/my-profile#about">
                  Edit <i className="fas fa-edit text-white"></i>
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 pt-2 pb-1">
            <div className="profileHeading teacherheading">
              {/* <h1 className="headingtext wow zoomIn">{data.firstname} {data.lastname}</h1> */}
              <h1 className="headingtext d-flex align-center">
                {data.firstname} {data.lastname}
              </h1>
              <div className="profileDetailRating">
                {!starLoading && (
                  <div>
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
                  </div>
                )}
              </div>

              <p className="joindetails mt-3">
                Joined {Utils.shortDate(data.created_at)} &nbsp;&nbsp;&nbsp;&nbsp; Students {props.total.students} &nbsp;&nbsp;&nbsp;&nbsp; Courses{" "}
                {props.total.courses}
              </p>
              <div className="profileFollowList">
                <h5>Follow {data.firstname}</h5>
                <ul>
                  {socialPlatforms.map(
                    (sp) =>
                      !_.isEmpty(_.get(props, `social.${sp}`, "")) && (
                        <li>
                          <a target="_blank" href={props.social[sp]}>
                            <i className={`fab fa-${sp}`}></i>
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </div>
              <ul className="profile-socail-icon">
                <Helmet>
                  <meta property="og:image" content={`${data.base_image}`} />
                </Helmet>
                <li><a href={`https://twitter.com/intent/tweet?url=${trainerUrl}&text=${trimText(trainerIntro,230)}`}><TwitterIcon size={32} round={true} /></a></li>
                <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${trainerUrl}&quote=${trainerIntro}&imageURL=${data.base_image}`}><FacebookIcon size={32} round={true} /></a></li>
                <li><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${trainerUrl}&title=${trainerName}&summary=${trimText(trainerIntro,100)}&source=TVerse&mini=true&ro=true&imageUrl=${data.base_image}`}><LinkedinIcon size={32} round={true} /></a></li>
              </ul>
            </div>
            <img
              className="img-fluid imgTransfer pt-3 W-100"
              src={`${process.env.REACT_APP_API_URL}/uploads/profile/${encodeURI(data.profile_image)}`}
              alt="profile"
            />
          </div>
        </div>
      </div>

      <div className="container aboutMe-pr0fle ">
        <h1 className="headingtext mt-4">About me</h1>
        <div className="awardTextInner awardwithoutLine">
          <div className="awadText" dangerouslySetInnerHTML={{ __html: data.biography }}></div>
        </div>
      </div>

      <div className="container profileTabQu pb-5">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#academicContent">
              Academic Qualification
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#experienceContent">
              Experiences
            </a>
          </li>
        </ul>
        <div className="tab-content pt-4">
          <div className="profileContent tab-pane active" id="academicContent">
            <div className="container">
              <div className="awardTextWrapper">
                <div className="awardTextInner">
                  {props.academics.map((a) => (
                    <div className="AboutawadText">
                      <span className="AboutawardYear">{a.year}</span> <span>{a.qualification}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="profileContent tab-pane fade" id="experienceContent">
            <div className="container">
              <div className="awardTextWrapper">
                <div className="awardTextInner">
                  {props.experiences.map((a) => (
                    <div className="AboutawadText">
                      <span className="AboutawardYear">{a.company}</span> <span>{a.location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="awradwrapper mt-3">
        <div className="container pt-5">
          <img
            className="img-fluid inline-photo show-on-scroll"
            src={`${process.env.REACT_APP_API_URL}/uploads/award/${encodeURI(data.award_image)}`}
            alt="profile"
          />
        </div>
        <div className="container">
          <div className="awardTextWrapper">
            <h1 className="headingtext slideInUp wow">
              Award <br /> Certifications{" "}
            </h1>
            <div className="awardTextInner">
              {props.awards.map((a) => (
                <div className="awadText slideInUp wow ">
                  <span className="awardYear">{a.year}</span> <span className="boldText">{a.award}</span> | <a href={a.url}>{a.organisation}</a>                </div>
              ))}
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
    </>
  );
};

export default TeacherAbout;
