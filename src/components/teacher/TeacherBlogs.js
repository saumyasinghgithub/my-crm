import { useEffect, useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import moment from "moment";
import TeacherNav from "./TeacherNav";
import Utils from "./../../Utils";
import _ from "lodash";
const TeacherBlogs = (props) => {
    const [bdata, setBdata] = useState([]);
    const data = props.data;
    const { getServerData } = useContext(UserContext);
    useEffect(() => {
        getServerData('trainer/my-blog')
            .then(setBdata)
            .catch(err => console.log(err));
    }, []);
    useEffect(window.scrollEffect, []);
    const blogItem = (blog) => {
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
                {Utils.isTrainer() && Utils.getUserData().id === bdata.user_id && (
                    <div className="container mb-3 editTrainerdetails">
                        <div className="row">
                            <div className="col-12 text-right">
                                <a className="p-2 text-white rounded" href="/my-profile#blogs">
                                    Edit <i className="fas fa-edit text-white"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                <div className="col-lg-12 col-md-12 col-12 pt-2 pb-1">
                    <img
                        className="img-fluid imgTransfer"
                        src={`${process.env.REACT_APP_API_URL}/uploads/blog/${encodeURI(bdata.blog_image)}`}
                        alt="blog"
                    />
                </div>
            </div>

            <div className="serviceWrapper container">
                <div className="serviceHeading">
                    <h1 className="headingtext slideInUp wow ">Blogs</h1>
                    <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{ __html: bdata.about_blog }}></div>
                </div>
                {data.length > 0 && (
                    <div className="knowledgBody">
                        <div className="freeResouces lineANimation slideInUp wow ">Free Resources</div>
                        <div className="row">{data.length > 0 && data.map(blogItem)}</div>
                    </div>
                )}
            </div>
        </>
    );
}
export default TeacherBlogs;