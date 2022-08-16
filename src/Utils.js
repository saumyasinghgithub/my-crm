import _ from 'lodash';
import moment from 'moment';

const Utils = {

  shortDate: (dt) => moment(dt).format('MMM DD, YYYY'),

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
    return parseInt(_.get(userData, "role_id", 0)) === parseInt(process.env.REACT_APP_STUDENT_ROLE);
  },
  isTrainer: () => {
    let userData = Utils.getUserData();
    return parseInt(_.get(userData, "role_id", 0)) === parseInt(process.env.REACT_APP_TRAINER_ROLE);
  },

  mediaTypes: [
    ['pdf', "PDF", "pdf.png"],
    ['PPT', "PPT", "doc-icon.png"],
    ['video', "Video", "video1.png"],
    ['audio', "Audio", "audio1.png"],
    ['quiz',"Quiz", "edit1.png"],
    ['scorm', "SCORM", "scrom.png"]
  ],
industries : [
              "Agriculture",
              "Information Technology",
              "Mining, and Oil and Gas Extraction",
              "Construction",
              "Manufacturing",
              "Wholesale Trade",
              "Retail Trade",
              "Transportation and Warehousing",
              "Finance and Insurance",
              "Professional, Scientific, and Technical Services",
              "Educational Services",
              "Health Care and Social Assistance",
              "Arts, Entertainment, and Recreation",
              "Accommodation and Food Services",
              "Other Services (except Public Administration",
              "Public Administration"
            ],
  countryList : ["Afghanistan","Albania","Argentina","Australia","Belgium","Belgium","Brazil","Canada","China",
  "Cambodia","Colombia","Cuba","Denmark","France","Georgia","Germany","Greece","Hong Kong","Hungary","Iceland",
  "Indonesia","India","Italy","Japan","Jordan","Kuwait","Libya","Mexico","Nigeria","Philippines","Russia","Singapore",
  "South Africa","Spain","Taiwan","Tajikistan","Turkey","Ukraine","United Arab Emirates","United States of America (USA)",
  "United Kingdom","Venezuela","Zimbabwe","Venezuela","Viet Nam","Zimbabwe" ],
  interestedField : ["Architecture and engineering", "Arts", "culture and entertainment", "Business", "management and administration",
  "Communications", "Education", "Science and technology", "Archeologist","Software engineer","Laboratory technician","Microbiologist",
  "Physicist", "Journalist", "Copywriter", "Public relations specialist", "Meeting/event planner", "Social media manager", "Brand manager",
  "Human resources manager", "Marketing assistant", "Accountants/Finance", "Secretary","Entrepreneur/small business owner", "Singer/songwriter",
  "Music producer", "Art curator", "Animator/video game designer", "Filmmaker", "Graphic designer", "Fashion designer", "Photographer", "Anesthesiologist",
  "Dental assistant", "Nurse", "Veterinarian", "Physical therapist", "Lawyer", "Lobbyist"],

  academicQualifications: ['10th Grade', '12th Grade', 'Graduation', 'Post-Graduation', 'Professional Degree', 'PhD'],
  courseLevel: ['Beginner', 'Intermediate', 'Proficient', 'Experienced', 'Advanced', 'Expert'],
  country: ['English', 'Spanish', 'German', 'French', '	Portuguese', 'Arabic','Hindi', 'Russian', 'Chinese', 'Dutch', 'Japanese', 'KOREAN'],
  courseType: ['pdf', 'video', 'scorm', 'quiz', 'audio', 'PPT'],
  searchCalibs: [1,51,68,83]

};


export default Utils;

