import React,{createContext} from 'react';

import axios from 'axios';

import Utils from './../Utils';

import _ from 'lodash';

const CourseContext = createContext();

const CourseProvider = (props) => {

  const getMyData = (url) => {
    return new Promise((resolve,reject) => {
      axios.get(Utils.apiUrl(url),Utils.apiHeaders())
      .then(res => {   
        if(res.data.success){
          resolve(res.data.data);
        }else{
          reject(res.data.message);
        }
      });
    });
  }

  const setMyData = (url,data) => {
    return new Promise((resolve,reject) => {
      axios.put(Utils.apiUrl(url),data,Utils.apiHeaders())
      .then(res => {   
        if(res.data.success){
          resolve(res.data);
        }else{
          reject(res.data.message);
        }
      });
    });
  }

  
  
  return <CourseContext.Provider value={{ getMyData, setMyData}}>
    {props.children}
  </CourseContext.Provider>;

}

export default CourseContext;

export {CourseProvider};