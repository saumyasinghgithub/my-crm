import React,{createContext, useState} from 'react';

import axios from 'axios';

import Utils from './../Utils';

import _ from 'lodash';

const TrainerContext = createContext();

const TrainerProvider = (props) => {

  const myCalibs = () => {
    return new Promise((resolve,reject) => {
      axios.get(Utils.apiUrl('trainer/my-calibs'),Utils.apiHeaders())
      .then(res => {   
        if(res.data.success){
          resolve(res.data.data);
        }else{
          reject(res.data.message);
        }
      });
    });
  }

  const saveCalibs = (data) => {
    return new Promise((resolve,reject) => {
      axios.put(Utils.apiUrl('trainer/calibs'),data,Utils.apiHeaders())
      .then(res => {   
        if(res.data.success){
          resolve(res.data);
        }else{
          reject(res.data.message);
        }
      });
    });
  }

  
  return <TrainerContext.Provider value={{ myCalibs,saveCalibs}}>
    {props.children}
  </TrainerContext.Provider>;

}

export default TrainerContext;

export {TrainerProvider};