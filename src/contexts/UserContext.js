import React,{createContext, useState} from 'react';

import axios from 'axios';

import Utils from './../Utils';

import _ from 'lodash';

const UserContext = createContext();

const UserProvider = (props) => {

  const [userData, setUserData] = useState(Utils.getUserData());
  const [stepData, setUCStepData] = useState({});

  const goLogin = ({username, password},callback) => {    
    axios.post(Utils.apiUrl('auth/login'),`&username=${username}&password=${password}`,Utils.apiHeaders()).then(res => {      
      callback(res.data.success,res.data.message, res.data.flag);      
      if(res.data.success){        
        setUserData(res.data.data);        
        Utils.setUserData(res.data);            
      }
    }).catch(err => {
      callback(false, err.message);
    });
  }

  
  const logout = (callback) => {
    setUserData(false);
    Utils.setUserData(false); 
       
    callback();
  }

  
  return <UserContext.Provider value={{ userData, goLogin,logout}}>
    {props.children}
  </UserContext.Provider>;

}

export default UserContext;

export {UserProvider};