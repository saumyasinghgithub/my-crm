import React, { useState, useEffect } from "react";
import Utils from "./../Utils";
import axios from "axios";

const Footer = () => {
  const hasSubdomain = Utils.hasSubdomain();
  const [list, setList] = useState({
    loading: false,
    error: false,
    pageInfo: {},
    data: [],
  });

  const fetchList = () => {
    setList({ ...list, loading: true });
    axios
      .get(Utils.apiUrl("sociallink/list"), Utils.apiHeaders())
      .then((res) => {
        if (res.data.success) {
          setList({
            ...list,
            loading: false,
            error: false,
            pageInfo: res.data.pageInfo,
            data: res.data.data,
          });
        } else {
          setList({
            ...list,
            loading: false,
            error: res.data.message,
            pageInfo: {},
            data: [],
          });
        }
      });
  };

  const sendLocalStorage = () => {
    if (hasSubdomain) {
      window.onmessage = function (e) {
        if (e.origin !== process.env.REACT_APP_PUBLIC_URL) {
          return;
        }
        //window.alert(e.data);
        if (e.data === "false" && Utils.isLoggedIn()) {
          Utils.removeSession();
          window.location.reload();
        } else if (e.data !== "false" && !Utils.isLoggedIn()) {
          var payload = JSON.parse(e.data);
          Utils.addToUserData(payload);
          window.location.reload();
        }
      };
    } else {
      window.onmessage = function (e) {
        if (e.data === "false" && Utils.isLoggedIn()) {
          Utils.removeSession();
        }
      };
    }
  };

  const syncLocalStorage = () => {
    var win = window;
    if (!hasSubdomain) {
      win = window.parent;
    }
    win.postMessage(
      Utils.isLoggedIn() ? JSON.stringify(Utils.getUserData()) : "false",
      "*"
    );
  };

  useEffect(fetchList, []);

  useEffect(sendLocalStorage, []);

  useEffect(syncLocalStorage, []);

  return (
    <>
      <footer className="footer footerFixed">
        <div className="container-fluid">
          <ul className="footerLeft">
            <li>Copyright © {(new Date().getFullYear())} TVERSE</li>
            <li>
              <a href={`${process.env.REACT_APP_PUBLIC_URL}/term-conditions`}>
                Terms
              </a>
            </li>
            <li>
              <a href={`${process.env.REACT_APP_PUBLIC_URL}/privacy-policy`}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href={`${process.env.REACT_APP_PUBLIC_URL}/cookie-policy`}>
                Cookie Policy
              </a>
            </li>
          </ul>
          <ul className="footerRight">
            {list.data.map((record, idx) => (
              <li key={idx}>
                <a href={`${record.link}`} target="blank">
                  <i className={`${record.class}`}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {hasSubdomain && (
          <iframe
            className="d-none"
            id="mainDomainIframe"
            src={`${process.env.REACT_APP_PUBLIC_URL}/readls`}
          ></iframe>
        )}
      </footer>
    </>
  );
};

export default Footer;
