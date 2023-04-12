import React,{useEffect,useState, useContext} from 'react';
import {Container, Spinner, Alert} from 'react-bootstrap';

import UserContext from './../contexts/UserContext';
import {useParams} from "react-router-dom";
import Utils from './../Utils';
import _ from 'lodash';
import moment from 'moment';
import { Loader } from '../components';

const BlogDetails = (props) => {
      const { slug } = useParams();
      const [data, setData] = useState({});
   console.log(slug)
   const [loading, setLoading] = useState(true);

   const {getServerData} = useContext(UserContext);

   useEffect(()=>{
      getServerData(`trainer/blogs/${slug}`,true)
      .then(data => {
          setData(data);
          setLoading(false);
      })
      .catch(msg=> {
          setData({success: false, message: msg});
          setLoading(false);
      });
  },[data]);
      useEffect(window.scrollEffect,[loading]);
    
    return (<>
    <Container className="h-100 ">

{loading && <>
   <>
          <Loader />
        </>
</>}

{!loading && <>
   {_.get(data,'success',false)===false && <>
      <div className="profile-wrapper">
         <div className='container'>
            <h1>Courses By Trainer</h1>
               <Alert variant="danger"><div className="m-5">sa</div></Alert>
         </div>
      </div>
   </>}
{_.get(data,'success',false)!==false && <>
<div className="help-wrapper">
{/*<nav>
   <ol className="cd-breadcrumb">
      <li><a href="/">Home</a></li>
      <li className="current"><em>{data.name}</em></li>
   </ol>
</nav>*/}

<div className="">
   <img className="img-fluid" src={`${process.env.REACT_APP_API_URL}/uploads/banner/${data.banner_image}`} alt="AD" />
   <div className="AD-blog">
      <div className="row">
         <div className="col-sm-12">
            <h1 className="headingtext slideInUp wow ">{data.name}</h1>
            <div className="blogdescription" dangerouslySetInnerHTML={{__html:data.description}}></div>
         </div>
      </div>
   </div>
</div>
</div>

</>}
</>}
</Container>
</>);
}; 

export default BlogDetails;