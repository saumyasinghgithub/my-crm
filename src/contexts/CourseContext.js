import React,{createContext} from 'react';

import axios from 'axios';

import Utils from './../Utils';

import _ from 'lodash';

const CourseContext = createContext();

const CourseProvider = (props) => {

  return <CourseContext.Provider value={{ }}>
    {props.children}
  </CourseContext.Provider>;

}

export default CourseContext;

export {CourseProvider};