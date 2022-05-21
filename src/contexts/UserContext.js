import React,{createContext, useState} from 'react';

import axios from 'axios';

import Utils from './../Utils';

import _ from 'lodash';

const UserContext = createContext();

const UserProvider = (props) => {

  const [userData, setUserData] = useState(Utils.getUserData());
  
  const goLogin = ({email, pass},callback) => {    
    axios.post(Utils.apiUrl('user/login'),`&user=${email}&pass=${pass}`,Utils.apiHeaders()).then(res => {      
      if(res.data.success){        
        setUserData(res.data.userData);        
        Utils.setUserData(res.data);            
      }
      return res;
    })
    .then(res => callback(res.data.success,res.data.message, res.data.flag))
    .catch(err => {
      callback(false, err.message);
    });
  }

  
  const logout = (callback) => {
    setUserData(false);
    Utils.setUserData(false); 
       
    callback();
  }

  const getProfileAttributes = () => {
    return new Promise((resolve,reject) => {
      axios.get(Utils.apiUrl('profile_attributes'),Utils.apiHeaders())
      .then(res => {   
        if(res.data.success){
          resolve(res.data.data);
        }else{
          reject(res.data.message);
        }
      });
    });
  }

  
  return <UserContext.Provider value={{ userData, goLogin,logout, getProfileAttributes}}>
    {props.children}
  </UserContext.Provider>;

}

export default UserContext;

export {UserProvider};