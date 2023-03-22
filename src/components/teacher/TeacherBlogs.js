import React, { useState, useEffect } from "react";
import moment from "moment";
import TeacherNav from "./TeacherNav";
import Utils from "./../../Utils";
import _ from "lodash";
const TeacherBlogs = (props) => {
    const [ydata, setYdata] = useState([]);
    const data = props.data;
    return (
        <>
            <div className="row">
                {Utils.isTrainer() && Utils.getUserData().id === data.user_id && (
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
                        src={`${process.env.REACT_APP_API_URL}/uploads/community/${encodeURI(data.community_image)}`}
                        alt="service"
                    />
                </div>
            </div>

            <div className="serviceWrapper container">
                <div className="serviceHeading">
                    <h1 className="headingtext slideInUp wow ">Blogs</h1>
                    <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{ __html: data.about_community }}></div>
                </div>
                {/*ydata.length > 0 && (
                    <div className="knowledgBody">
                        <div className="freeResouces lineANimation slideInUp wow ">Free Resources</div>
                        <div className="row">{ydata.length > 0 && ydata.map(youtubeItem)}</div>
                    </div>
                )*/}
            </div>
        </>
    );
}
export default TeacherBlogs;