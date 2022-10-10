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
        let mdata = {_mdata: [email,pass]};
        setUserData({...res.data.userData,...mdata});
        Utils.setUserData(res.data);
        Utils.addToUserData(mdata);
      }
      return res;
    })
    .then(res => callback(res.data.success,res.data.message, res.data.flag))
    .catch(err => {
      callback(false, err.message);
    });
  };

  const loginToMoodle = (frm) => {    
    frm.username.value = userData._mdata[0];
    frm.password.value = userData._mdata[1];
    frm.submit();   
  };

  const goForgotPassword = (email,callback) => {    
    axios.post(Utils.apiUrl('user/forgotpass'),`email=${email}`,Utils.apiHeaders())
    .then(res => callback(res.data))
    .catch(err => {
      callback({success:false, message: err.message});
    });
  };

  
  const logout = (callback) => {
    setUserData(false);
    Utils.setUserData(false); 
       
    callback();
  };


  const getServerData = (url, pageInfo = false) => {
    return new Promise((resolve,reject) => {
      axios.get(Utils.apiUrl(url),Utils.apiHeaders())
      .then(res => {   
        if(res.data.success){
          resolve(pageInfo ? res.data : res.data.data);
        }else{
          reject(res.data.message);
        }
      }).catch(reject);
    });
  };

  const setServerData = (url,data, method = 'put') => {
    return new Promise((resolve,reject) => {
      axios[method](Utils.apiUrl(url),data,Utils.apiHeaders())
      .then(res => {   
        if(res.data.success){
          resolve(res.data);
        }else{
          reject(res.data.message);
        }
      }).catch(reject);
    });
  };

  
  return <UserContext.Provider value={{ userData, goLogin, goForgotPassword, logout, getServerData, setServerData, loginToMoodle}}>
    {props.children}
  </UserContext.Provider>;

}

export default UserContext;

export {UserProvider};