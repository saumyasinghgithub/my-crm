import React, { useEffect, useState, useContext } from 'react';
import Utils from './../../Utils';
import _ from 'lodash'; 

const LandingBlog = (props) => {
    const slug = Utils.subdomain();
    const blogs = props.blogs;
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
                            <div className="social-share-icon">
                                <a href="javascript:;" className="a1"><i className="fab fa-facebook"></i></a>
                                <a href="javascript:;" className="a2"><i className="fab fa-twitter"></i></a>
                                <a href="javascript:;" className="a3"><i className="fab fa-google-plus"></i></a>
                                <a href="javascript:;" className="a3"><i className="fab fa-instagram"></i></a>
                                <a className="a"><i className="fa fa-share-alt"></i></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
    const slicedItems = _.take(blogs, 3);
    return (<>
        <div className="row">
            {slicedItems.map(renderBlog)}            
        </div>
        <div className="moreBlogsLink">
            <p><a href="/knowledge">Click Here Read More Blogs</a></p>
        </div>        
    </>);

}
export default LandingBlog; 