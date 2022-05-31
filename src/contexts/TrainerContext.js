import React,{createContext, useState} from 'react';

import axios from 'axios';

import Utils from './../Utils';

import _ from 'lodash';

const TrainerContext = createContext();

const TrainerProvider = (props) => {

  

  
  
  return <TrainerContext.Provider value={{}}>
    {props.children}
  </TrainerContext.Provider>;

}

export default TrainerContext;

export {TrainerProvider};