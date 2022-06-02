import _ from 'lodash';
import moment from 'moment';

const Utils = {

  dateTime: (dt) => moment(dt).format('DD-MM-YYYY HH:mm'),
  
  apiUrl: (path) => process.env.REACT_APP_API_URL+'/'+path,

  apiHeaders: (extraparams = null) => {
    let headers = {
      "headers": {        
        "x-api-key": "$2a$08$66e6e.5m5kDsdU/O7guw/ej8ETNuSfe9k5W1AME4V/Lno6PjvMbay",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",        
        "Access-Control-Allow-Methods": "PUT,GET,POST,DELETE,OPTIONS,PATCH",        
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, token, access-control-allow-origin',
        'Accept': 'application/json, text/plain, */*'
      }
    };

    const uData = Utils.getUserData();    
    if(uData && _.get(uData,'token',false)){
      headers['headers']['token']=uData.token;
    }

    if(extraparams){
      headers = { ...headers, ...extraparams}; 
    }
    return headers;
  },


  isLoggedIn: () => {
    const dt = Utils.getUserData();    
    return _.get(dt,'token',false)!==false;
  },

  removeSession: () => {
    let dt = Utils.getUserData();
    // console.log(dt, "session data")
    dt.token = false;
    // const backup = localStorage.getItem(process.env.REACT_APP_APPNAME + '-userData');    
    localStorage.setItem(process.env.REACT_APP_APPNAME + '-userData',JSON.stringify(dt));    
  },

  getUserData: () => {
    let userData = localStorage.getItem(process.env.REACT_APP_APPNAME + '-userData');    
    if(userData){
      return JSON.parse(userData);

    }else{
      return false;
    }
  },

  setUserData: (data) => {    
    const uData = _.get(data,'userData',false);
    // return;
    if(uData===false){
      //=== logout
      localStorage.removeItem(process.env.REACT_APP_APPNAME + '-userData');
    }else{
      let userData = Utils.getUserData();
      if(!userData){
        userData = {}; 
      }
      uData['token']=_.get(data,'token',false);
      uData[`stepData${userData.id}`] = userData[`stepData${userData.id}`];
      userData = {...userData,...uData};
      localStorage.setItem(process.env.REACT_APP_APPNAME + '-userData',JSON.stringify(userData));
    }
  },

  saveUserData: (data, otherData) => {
    if(_.get(data, 'token', false )){     
      data[`otherData${data.id}`] = otherData;
     localStorage.setItem(process.env.REACT_APP_APPNAME + '-userData',JSON.stringify(data));
    }
  },

  addToUserData: (data) => {
    let userData = Utils.getUserData();
    if(!userData){
      userData = {}; 
    }
    userData = {...userData,...data};
    localStorage.setItem(process.env.REACT_APP_APPNAME + '-userData',JSON.stringify(userData));
  },

  isStudent: () => {
    let userData = Utils.getUserData();
    return _.get(userData, "role_id", false) === process.env.STUDENT_ROLE;
  },
  isTrainer: () => {
    let userData = Utils.getUserData();
    return _.get(userData, "role_id", false) === process.env.TRAINER_ROLE;
  },


  academicQualifications: ['10th Grade', '12th Grade', 'Graduation', 'Post-Graduation', 'Professional Degree', 'PhD'],
  courseLevel: ['Beginner', 'Intermediate', 'Proficient', 'Experienced', 'Advanced', 'Expert'],
  country: ['India', 'United States of America (USA)', 'Germany', 'Japan', '	Indonesia', 'Switzerland','Sweden', 'United Kingdom', 'United Arab Emirates', 'Turkey', 'Vietnam', 'Australia']

};


export default Utils;

