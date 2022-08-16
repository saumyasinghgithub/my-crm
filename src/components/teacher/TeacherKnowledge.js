import React, { useEffect} from 'react';

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
                <ul><li><a href={`/trainers/${props.slug}/blogs/${blog.slug}`}><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li><a href=""><img src="/assets/images/share-icon.png" alt="ad share" /></a></li></ul>
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
            <img className="img-fluid imgTransfer" src={`${process.env.REACT_APP_API_URL}/uploads/knowledge/${encodeURI(data.knowledge_image)}`} alt="service" />
            </div>
        </div>

        <div className="serviceWrapper container"> 
            <div className="serviceHeading">                
                <h1 className="headingtext slideInUp wow ">03 Knowledge<ul className="profile-socail-icon">
                    <li><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li>
                    <li><a href=""><img src="/assets/images/link-icon.png" alt="ad eyes" /></a></li>
                </ul></h1>
                <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{__html:data.about_knowledge}}></div>
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