import React,{createContext, useState} from 'react';

import axios from 'axios';

import Utils from './../Utils';

import _ from 'lodash';

const TrainerContext = createContext();

const TrainerProvider = (props) => {

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

  
  
  return <TrainerContext.Provider value={{ getMyData, setMyData}}>
    {props.children}
  </TrainerContext.Provider>;

}

export default TrainerContext;

export {TrainerProvider};