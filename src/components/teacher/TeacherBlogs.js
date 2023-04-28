import { useEffect, useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import moment from "moment";
import TeacherNav from "./TeacherNav";
import Utils from "./../../Utils";
import _ from "lodash";
import { TeacherChannel } from "./";
import { RegisterForm } from "./../landing";
import { Modal } from "react-bootstrap";

const TeacherBlogs = (props) => {
  const { data, blogs } = props;
  const { getServerData } = useContext(UserContext);

  const [RegiShow, setRegiShow] = useState(false);

  const RegisterClose = () => setRegiShow(false);
  const RegisterShow = () => setRegiShow(true);

  useEffect(window.scrollEffect, []);
  const blogItem = (blog) => {
    return (
      <div className="col-md-6 col-lg-4" key={blog.id}>
        <a href={`/trainers/${props.slug}/blogs/${blog.slug}`}>
          <div className="knowledgeBox slideInUp wow ">
            <div className="knowledgeImg">
              <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/uploads/blog/${blog.blog_image}`} alt="ad blog" />
            </div>
            <div className="knowledgeTitle">{blog.name}</div>
            <div className="knowledgeBody">Publish Date: {Utils.shortDate(blog.created_at)}</div>
            <div className="knowledgeFooter clearfix">
              <div className="FText">Blog</div>
              <ul>
                <li>
                  <a href={`/trainers/${props.slug}/blogs/${blog.slug}`}>
                    <img src="/assets/images/eyes.png" alt="ad eyes" />
                  </a>
                </li>
                <li></li>
              </ul>
            </div>
          </div>
        </a>
      </div>
    );
  };

  return (
    <>
      <div className="row">
        {Utils.isTrainer() && Utils.getUserData().id === data.user_id && (
          <div className="container mb-3 editTrainerdetails">
            <div className="row">
              <div className="col-12 text-right">
                <a className="p-2 text-white rounded" href="/my-profile#community">
                  Edit <i className="fas fa-edit text-white"></i>
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="col-lg-12 col-md-12 col-12 pt-2 pb-1">
          <img
            className="img-fluid imgTransfer"
            src={`${process.env.REACT_APP_API_URL}/uploads/community/${encodeURI(data.community_image)}`}
            alt="blog"
          />
        </div>
      </div>

      <div className="serviceWrapper container">

        {blogs.length > 0 && (
          <>
            <div className="freeResouces lineANimation slideInUp wow mt-5">Blogs</div>
            <div className="row">{blogs.length > 0 && blogs.map(blogItem)}</div>
          </>
        )}

        <div className="knowledgBody">
        <TeacherChannel youtube={data.youtube_community} />
          {/*!_.isEmpty(props.youtube) && (
            <>
              <TeacherChannel youtube={data.youtube_community} />
            </>
          )*/}


          <div className="serviceHeading mb-5">
            <h1 className="headingtext slideInUp wow mt-3">Community</h1>
            <div className="subHeading slideInUp wow mb-3" dangerouslySetInnerHTML={{ __html: data.about_community }}></div>
          </div>

          {_.get(props, "events.0.id", false) && (
            <>
              <div className="freeResouces lineANimation slideInUp wow ">Events</div>
              <div className="row BlogEvents">
                <div className="col-lg-6 col-md-12 col-12 d-flex align-center mt-2 mb-2 blogborder">
                  <div className="BlogPaddingright UpEventText">
                    <h3>{props.events[0].heading}</h3>
                    <h4>{props.events[0].sub_heading}</h4>
                    <div>{moment(props.events[0].event_on).format("MMM DD, h:mm a")}</div>
                    <p dangerouslySetInnerHTML={{ __html: props.events[0].event_short_desc }}></p>
                    <div className="HomeRegister mt-4 text-right">
                      <button /*onClick={RegisterShow}*/><a href={props.events[0].cta} target="_blank">Register Now</a></button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12 mt-2 mb-2">
                  <img className="img-fluid w-100" src={`${process.env.REACT_APP_API_URL}/uploads/event/${props.events[0].event_img}`} alt="" />
                </div>
              </div>
            </>
          )}

          {_.get(props, "events", []).length > 0 && (
            <Modal size="lg" show={RegiShow} onHide={RegisterClose} className="JoinNowModal" closeButton>
              <RegisterForm formType="event" eventData={props.events[0]} cta="Register" />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};
export default TeacherBlogs;
