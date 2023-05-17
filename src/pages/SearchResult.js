import React, { useContext, useEffect, useState } from "react";
import Utils from "./../Utils";
import _ from "lodash";
import UserContext from "./../contexts/UserContext";
import StarRatings from "react-star-ratings";

const SearchResult = (props) => {
  const [viewTrainer, setViewTrainer] = useState({});
  const [tData, setTData] = useState({
    loading: true,
    pageInfo: {},
    data: [],
    stats: {},
  });
  const [filters, setFilters] = useState({ start: 0, limit: 6 });
  const [loadStats, setLoadStats] = useState(true);
  const [isScrollTriggered, setIsScrollTriggered] = useState(false);

  const $ = window.$;

  const { getUserData, isLoggedIn, getServerData, setServerData } = useContext(UserContext);

  const fetchSearchResults = () => {
    let calibs = _.get(getUserData(), "calibs", []);
    let data = {};
    _.each(calibs, (pval, pk) => {
      if (pval != "") {
        data[pk] = parseInt(pval);
      }
    });

    setTData({ ...tData, loading: true });

    getServerData(
      `trainer/search?calibs=${JSON.stringify(data)}&paCalibs=${Utils.searchCalibs.join(",")}&start=${filters.start}&limit=${
        filters.limit
      }&loadStats=${loadStats ? 1 : 0}`,
      true
    )
      .then((res) => {
        let tmp = {
          ...tData,
          loading: false,
          success: res.success,
          pageInfo: res.pageInfo,
        };
        if (_.get(res, "stats", false)) {
          tmp.stats = res.stats;
          setLoadStats(false);
        }

        tmp.data = _.concat(tmp.data, res.data);
        tmp.favTrainers = _.concat(tmp.favTrainers, res.favTrainers);

        setTData(tmp);

        setIsScrollTriggered(false);
      })
      .catch(console.log);
  };

  useEffect(fetchSearchResults, [filters]);

  useEffect(() => {
    $(".circleChart").circleChart({
      color: "#6ecff6",
      backgroundColor: "#fff",
      background: true,
      size: 100,
    });
    if (parseInt(_.get(viewTrainer, "user_id", 0)) === 0) {
      setViewTrainer(_.get(tData, "data.0", {}));
    }
  }, [tData]);

  const handleScroll = (e) => {
    const bottom = Number((e.target.scrollHeight - e.target.scrollTop).toFixed(0)) - e.target.clientHeight < 100;
    if (isScrollTriggered === false && bottom && filters.start + filters.limit < tData.pageInfo.total) {
      setIsScrollTriggered(true); //== this should avoid triggering load repeatative
      setFilters({ ...filters, start: filters.start + filters.limit });
    }
  };

  const markFav = (trainer_id) => (e) => {
    e.preventDefault();
    $(e.target).fadeOut();
    const data = {
      trainer_id: trainer_id,
      fav: tData.favTrainers.includes(trainer_id) ? 0 : 1,
    };
    setServerData("user/markfav", `trainer_id=${data.trainer_id}&fav=${data.fav}`, "post")
      .then(() =>
        setTData({
          ...tData,
          favTrainers: data.fav ? _.concat(tData.favTrainers, trainer_id) : _.filter(tData.favTrainers, (tid) => tid != trainer_id),
        })
      )
      .then(() => $(e.target).show());
  };

  const renderResultAnalysis = () => {
    const ratios = {
      trainers: parseInt(_.get(tData, "stats.trainers", 0)) / parseInt(_.get(tData, "stats.allTrainers", 0)),
      courses: parseInt(_.get(tData, "stats.courses", 0)) / parseInt(_.get(tData, "stats.allCourses", 0)),
      books: parseInt(_.get(tData, "stats.books", 0)) / parseInt(_.get(tData, "stats.allBooks", 0)),
      videos: parseInt(_.get(tData, "stats.videos", 0)) / parseInt(_.get(tData, "stats.allVideos", 0)),
      audios: parseInt(_.get(tData, "stats.audios", 0)) / parseInt(_.get(tData, "stats.allAudios", 0)),
    };
    _.each(ratios, (r, k) => (ratios[k] = Math.round(r * 100)));

    return (
      <>
        {_.isNaN(ratios.trainers) === false && (
          <>
            <ul className="resultlist">
              <li>
                <div className="circleChart" id="1" data-value={ratios.trainers} data-text={ratios.trainers + "%"}></div>
                <span>Trainers</span>
              </li>
              <li>
                <div className="canvas-wrap">
                  <div className="circleChart" id="2" data-value={ratios.courses} data-text={ratios.courses + "%"}></div>
                  <span id="procent2" classs="procent"></span>
                </div>
                <span>Courses</span>
              </li>
              <li>
                <div className="canvas-wrap">
                  <div className="circleChart" id="3" data-value={ratios.books} data-text={ratios.books + "%"}></div>
                  <span id="procent3" classs="procent"></span>
                </div>
                <span>Books</span>
              </li>
              <li>
                <div className="canvas-wrap">
                  <div className="circleChart" id="4" data-value={ratios.audios} data-text={ratios.audios + "%"}></div>
                  <span id="procent4" classs="procent"></span>
                </div>
                <span>Audios</span>
              </li>
              <li>
                <div className="canvas-wrap">
                  <div className="circleChart" id="5" data-value={ratios.videos} data-text={ratios.videos + "%"}></div>
                  <span id="procent5" classs="procent"></span>
                </div>
                <span>Videos</span>
              </li>
            </ul>
          </>
        )}
      </>
    );
  };

  const showPageInfo = () => {
    let tcounts = filters.start + filters.limit;
    return (
      <>
        {tData.data.length} of {_.get(tData, "pageInfo.total", 0)} trainers
      </>
    );
  };

  const renderResource = (icon, type, resources, cnt) => {
    const res = _.filter(resources, { type: type });
    return (
      cnt < 4 && (
        <>
          {res.length > 0 && (
            <li>
              <div className="circleBox">
                <img className="img-fluid" src={`/assets/images/${icon}`} />
                <span className="desktopview">{res[0].price} USD</span>
                <span className="mobileview">{res[0].price}$</span>
              </div>
            </li>
          )}
        </>
      )
    );
  };

  const renderResources = (resources) => {
    const res = {
      pdf: "pdf.png",
      PPT: "doc-icon.png",
      audio: "audio-icon.png",
      video: "video.png",
      webinar: "webinar.png",
      scorm: "scome.png",
    };

    let resIdx = 0;

    return (
      <>
        {_.map(res, (icon, type) => {
          resIdx += _.findIndex(resources, { type: type }) > -1 ? 1 : 0;

          return renderResource(icon, type, resources, resIdx);
        })}

        {resIdx > 3 && (
          <li className="dotmore">
            <span></span>
            <span></span>
            <span></span>
          </li>
        )}
      </>
    );
  };

  const renderCourseItem = (course) => {
    let trainer = viewTrainer;

    return (
      <div className="bioBodyInfolist">
        <a href={Utils.getTrainerURL(`courses/${course.slug}`, trainer.slug)}>
          <ul>
            <li>{course.name}</li>
            <li>
              <img className="img-fluid iconImg" src={`${process.env.REACT_APP_API_URL}/uploads/courses/${course.course_image}`} />
            </li>
            {renderResources(course.resources)}
          </ul>
        </a>
      </div>
    );
  };

  const showTrainerDetail = () => {
    let trainer = viewTrainer;

    let trainerbg = `${process.env.REACT_APP_API_URL}/uploads/profile/${trainer.profile_image}`;
    return (
      <div className="tab-content">
        <div className="tab-pane active trainerbg" style={{ backgroundImage: `url("${trainerbg}")` }} id="tab_a">
          <div className="tab-text-box">
            <img
              className="img-fluid progileImg"
              src={`${process.env.REACT_APP_API_URL}/uploads/base/${encodeURI(trainer.base_image)}`}
              alt={_.get(trainer, "firstname", "")}
            />
            <div className="bio-data-header">
              <h3>
                <a href={Utils.getTrainerURL("about", trainer.slug)}>
                  {_.get(trainer, "firstname", "")} {_.get(trainer, "lastname", "")}
                </a>
              </h3>
              <div className="bioInfo">
                Industry <span>{_.map(_.filter(_.get(trainer, "calibs", []), { pa_id: 1 }), (c) => c.pa_value).join(",")}</span>
              </div>
              <div className="bioInfo">
                Qualification <span>{_.map(_.filter(_.get(trainer, "calibs", []), { pa_id: 51 }), (c) => c.pa_value).join(",")}</span>
              </div>
              <div className="bioInfo">
                Year of Experience <span>{_.map(_.filter(_.get(trainer, "calibs", []), { pa_id: 68 }), (c) => c.pa_value).join(",")}</span>
              </div>
              <div className="bioInfo">
                Country <span>{_.map(_.filter(_.get(trainer, "calibs", []), { pa_id: 83 }), (c) => c.pa_value).join(",")}</span>
              </div>
            </div>
            <div className="profileRating">
              <p>Rating and Review</p>
              <StarRatings
                rating={trainer.rating.rating}
                starEmptyColor="#f9998a"
                starRatedColor="#dc3016"
                starHoverColor="#dc3016"
                starDimension="20px"
                starSpacing="2px"
              />
            </div>
            <div className="bio-data-body">
              {_.get(trainer, "courses.courses", []).map(renderCourseItem)}
              <div className="txtR">
                <a href={Utils.getTrainerURL("", trainer.slug)} className="action tocart primary btn btnBlue">
                  <span>View Profile</span>
                </a>
                <a href={Utils.getTrainerURL("courses", trainer.slug)} target="_blank" className="action tocart primary btn btnBlue">
                  <span>View Courses</span>
                </a>
                {isLoggedIn() && _.get(trainer, "sitesetting.preferred_trainers", 1) > 0 && (
                  <a href="#" className="action tocart primary btn btnBlue" onClick={markFav(trainer.user_id)}>
                    {!tData.favTrainers.includes(trainer.user_id) && <span>Mark Favourite</span>}
                    {tData.favTrainers.includes(trainer.user_id) && <span>Remove Favourite</span>}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="alltrainers">
          Total {trainer.courses.total} courses <i className="far fa-eye"></i>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="resultDisplay">
      {/*<div className="filterResultBox">
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
</div>*/}
      <div id="resultDisplay">
        {/* <div className="filterbox">
            <form>
                <div className="form-group">
                    <label className="filterSeach"><img src="/assets/images/filter-icon.png" /> Filter for courses</label>
                    <a href="search.php"><input type="text" className="form-control" placeholder="Search Keywords" /></a>
                    
                </div>
            </form>
        </div> */}
        <h3 className="pb-5">Your Search Results </h3>
        <div className="flexWrapper">
          <div className="flexItem flex20">
            {
              <ul className="nav datascroll" onScroll={handleScroll}>
                {_.get(tData, "data", []).map((trainer, idx) => (
                  <li key={idx} className={trainer.user_id === viewTrainer.user_id ? "active" : ""}>
                    <span onClick={() => setViewTrainer(trainer)}>
                      <img
                        className="img-fluid"
                        src={`${process.env.REACT_APP_API_URL}/uploads/base/${trainer.base_image}`}
                        alt={_.get(trainer, "firstname", "")}
                      />
                      <span>
                        {_.get(trainer, "firstname", "")} {_.get(trainer, "lastname", "")}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            }
            <div className="alltrainers alltrainerresult">
              {showPageInfo()} <i className="far fa-eye"></i>
            </div>
          </div>
          <div className="flexItem flex80">{_.get(viewTrainer, "user_id", 0) > 0 && showTrainerDetail()}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="home-result-wrapper">{renderResultAnalysis()}</section>
      {renderResults()}
    </>
  );
};

export default SearchResult;
