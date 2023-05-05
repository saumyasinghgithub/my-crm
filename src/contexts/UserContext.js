import React, { createContext, useState } from "react";

import axios from "axios";

import Utils from "./../Utils";

import _ from "lodash";

import { useCookies } from "react-cookie";

const UserContext = createContext();

const UserProvider = (props) => {
  const [cookies, setCookie] = useCookies([Utils.siteCookieName]);

  const [userData, setUserData] = useState(cookies[Utils.siteCookieName]);

  const goLogin = ({ email, pass }, callback) => {
    axios
      .post(Utils.apiUrl("user/login"), `&user=${email}&pass=${pass}`, apiHeaders())
      .then((res) => {
        if (res.data.success) {
          let mdata = { _mdata: [email, pass] };
          setUserData({ ...res.data.userData, ...mdata });
          const cookieData = { ...cookies[Utils.siteCookieName], ...res.data.userData, token: res.data.token, ...mdata };
          setCookie(Utils.siteCookieName, JSON.stringify(cookieData), Utils.getCookieOptions());
        }
        return res;
      })
      .then((res) => callback(res.data.success, res.data.message, res.data.flag))
      .catch((err) => {
        callback(false, err.message);
      });
  };

  const loginToMoodle = (frm) => {
    frm.username.value = userData._mdata[0];
    frm.password.value = userData._mdata[1];
    frm.submit();
  };

  const goForgotPassword = (email, callback) => {
    axios
      .post(Utils.apiUrl("user/forgotpass"), `email=${email}`, apiHeaders())
      .then((res) => callback(res.data))
      .catch((err) => {
        callback({ success: false, message: err.message });
      });
  };

  const logout = (callback) => {
    setUserData(false);
    Utils.setUserData(false);
    callback();
  };

  const apiHeaders = (extraHeaders = {}) => {
    let headers = {
      headers: {
        "x-api-key": "$2a$08$66e6e.5m5kDsdU/O7guw/ej8ETNuSfe9k5W1AME4V/Lno6PjvMbay",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT,GET,POST,DELETE,OPTIONS,PATCH",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, token, access-control-allow-origin",
        Accept: "application/json, text/plain, */*",
      },
    };
    if (_.get(userData, "token", false)) {
      headers.headers["token"] = userData.token;
    }

    headers["headers"] = {
      ...headers.headers,
      ...extraHeaders,
    };
    return headers;
  };

  const getServerData = (url, pageInfo = false) => {
    return new Promise((resolve, reject) => {
      axios
        .get(Utils.apiUrl(url), apiHeaders())
        .then((res) => {
          if (res.data.success) {
            resolve(pageInfo ? res.data : res.data.data);
          } else {
            reject(res.data.message);
          }
        })
        .catch(reject);
    });
  };

  const setServerData = (url, data, method = "put") => {
    return new Promise((resolve, reject) => {
      axios[method](Utils.apiUrl(url), data, apiHeaders())
        .then((res) => {
          if (res.data.success) {
            resolve(res.data);
          } else {
            reject(res.data.message);
          }
        })
        .catch(reject);
    });
  };

  return (
    <UserContext.Provider value={{ userData, goLogin, goForgotPassword, logout, getServerData, setServerData, loginToMoodle, apiHeaders }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserProvider };
