import {useState,useEffect, useContext} from 'react';

import UserContext from './../contexts/UserContext';

import {useParams} from "react-router-dom";
import _ from 'lodash';

const CourseDetails = (props) => {

  const [course, setCourse] = useState({});
  const { slug } = useParams();

  const {getServerData} = useContext(UserContext);




  useEffect(() => {
    getServerData(`course/${slug}`)
    .then(setCourse)
  },[]);


  return (<>
    <h1 className="m-5">{_.get(course,'title',"Title should come here")}</h1>
  </>);

};

export default CourseDetails;