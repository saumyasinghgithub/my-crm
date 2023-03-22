import React, { useEffect } from "react";

import _ from "lodash";

import Utils from "./../../Utils";

import TeacherNav from "./TeacherNav";

const TeacherKnowledge = (props) => {
  const data = props.data;

  const blogs = props.blogs;

  useEffect(window.scrollEffect, []);

  const renderBlog = (blog) => {
    return (
      <div className="col-sm-6 col-md-4" key={blog.id}>
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
                <li>
                  {/* <div className="navigation">
                                <div className="menuToggle"></div>
                                <div className="menu">
                                    <ul>
                                        <li><a href="/#" target="_blank">
                                            <i className="fa-brands fa fa-facebook" style={{ color: '#3b5998' }}></i>
                                        </a></li>
                                        <li><a href="/#" target="_blank">
                                            <i title="LinkedIn" className="fa-brands fa fa-linkedin" style={{ color: '#0072b1' }}></i>
                                        </a></li>
                                        <li><a href="/#" target="_blank">
                                            <i title="Twitter" className="fa-brands fa fa-twitter" style={{ color: '#00ACEE' }}></i>
                                        </a></li>
                                        <li><a href="/#" target="_blank">
                                            <i title="Twitter" className="fa-brands fa fa-instagram" style={{ color: '#8a3ab9' }}></i>
                                        </a></li>
                                    </ul>
                                </div>
                            </div> */}

                  {/* <div className="social-share-icon">
                  <a href="javascript:;" className="a1">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="javascript:;" className="a2">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="javascript:;" className="a3">
                    <i className="fab fa-google-plus"></i>
                  </a>
                  <a href="javascript:;" className="a3">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="a">
                    <i className="fa fa-share-alt"></i>
                  </a>
                </div> */}
                </li>
              </ul>
            </div>
          </div>
        </a>
      </div>
    );
  };

  return (
    <>
      {Utils.isTrainer() && Utils.getUserData().id === _.get(data, "0.user_id", "") && (
        <div className="container mb-3 editTrainerdetails">
          <div className="row">
            <div className="col-12 text-right">
              <a className=" bg-primary p-2 text-white rounded" href="/my-profile#knowledge">
                Edit <i className="fas fa-edit text-white"></i>
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        {/* <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
                <TeacherNav slug={props.slug} page={props.page} onPageChange={props.onPageChange} />
            </div> */}
        <div className="col-lg-12 col-md-12 col-12 pt-2 pb-1">
          <img
            className="img-fluid imgTransfer w-100"
            src={`${process.env.REACT_APP_API_URL}/uploads/knowledge/${encodeURI(_.get(data, "0.knowledge_image", ""))}`}
            alt="knowledge"
          />
        </div>
      </div>

      <div className="serviceWrapper container">
        <div className="serviceHeading w-100">
          <h1 className="headingtext slideInUp wow w-100">CodePRep</h1>
          {/* <ul className="profile-socail-icon serviceicon">
                    <li className='mr-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li>
                    <li><a href=""><img src="/assets/images/link-icon.png" alt="ad eyes" /></a></li>
                </ul> */}
          <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{ __html: _.get(data, "0.about_knowledge", "") }}></div>
        </div>
        {/*<div className="knowledgBody">
          <div className="freeResouces lineANimation slideInUp wow ">Free Resources</div>
          <div className="row">{blogs.map(renderBlog)}</div>
              </div>*/}
      </div>
    </>
  );
};

export default TeacherKnowledge;
