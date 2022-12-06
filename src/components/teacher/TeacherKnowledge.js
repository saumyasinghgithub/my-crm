import React, { useEffect } from 'react';

import _ from 'lodash';

import Utils from './../../Utils';

import TeacherNav from './TeacherNav';


const TeacherKnowledge = (props) => {

    const data = props.data;

    const blogs = props.blogs;

    useEffect(window.scrollEffect, []);

    const renderBlog = (blog) => {
        return <div className="col-sm-6 col-md-4" key={blog.id}>
            <div className="knowledgeBox slideInUp wow ">
                <div className="knowledgeImg">
                    <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/uploads/blog/${blog.blog_image}`} alt="ad blog" />
                </div>
                <div className="knowledgeTitle">{blog.name}</div>
                <div className="knowledgeBody">
                    Publish Date: {Utils.shortDate(blog.created_at)}
                </div>
                <div className="knowledgeFooter clearfix">
                    <div className="FText">Blog</div>
                    <ul><li><a href={`/trainers/${props.slug}/blogs/${blog.slug}`}><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li>
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

<div class="social-share-icon">
		<a href="javascript:;" class="a1"><i class="fab fa-facebook"></i></a>
		<a href="javascript:;" class="a2"><i class="fab fa-twitter"></i></a>
		<a href="javascript:;" class="a3"><i class="fab fa-google-plus"></i></a>
        <a href="javascript:;" class="a3"><i class="fab fa-instagram"></i></a>
		<a class="a"><i class="fa fa-share-alt"></i></a>
	</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }


    return (<>
        <div className='row'>
            <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
                <TeacherNav slug={props.slug} page={props.page} onPageChange={props.onPageChange} />
            </div>
            <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
                <img className="img-fluid imgTransfer w-100" src={`${process.env.REACT_APP_API_URL}/uploads/knowledge/${encodeURI(data[0].knowledge_image)}`} alt="knowledge" />
            </div>
        </div>

        <div className="serviceWrapper container">
            <div className="serviceHeading w-100">
                <h1 className="headingtext slideInUp wow w-100">03 Knowledge</h1>
                {/* <ul className="profile-socail-icon serviceicon">
                    <li className='mr-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li>
                    <li><a href=""><img src="/assets/images/link-icon.png" alt="ad eyes" /></a></li>
                </ul> */}
                <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{ __html: data[0].about_knowledge }}></div>
            </div>
            <div className="knowledgBody">
                <div className="freeResouces lineANimation slideInUp wow ">Free Resources</div>
                <div className="row">

                    {blogs.map(renderBlog)}

                </div>
            </div>
        </div>
    </>);
};

export default TeacherKnowledge;