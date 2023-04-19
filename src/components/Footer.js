import React, { useState, useEffect } from "react";
import Utils from "./../Utils";
import axios from "axios";
import { TeacherSubscribe } from "../components/teacher";

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
    axios.get(Utils.apiUrl("sociallink/list"), Utils.apiHeaders()).then((res) => {
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
    win.postMessage(Utils.isLoggedIn() ? JSON.stringify(Utils.getUserData()) : "false", "*");
  };

  useEffect(fetchList, []);

  useEffect(syncLocalStorage, []);
  

  return (
    <>
      <footer className="footer footerFixed">
        <div className="container">
          <ul className="footerLeft">
            <li className="footerline"> © {new Date().getFullYear()} by Dr. Susan Davis, Rescue RN™ </li>
            <li className="footerline ml-2">
              <a href={Utils.getTrainerURL(`privacy-policy`)}>Privacy Policy</a>
            </li>
            <li className="footerline ml-2">
              <a href={Utils.getTrainerURL(`term-conditions`)}>Terms of use</a>
            </li>
          </ul>
          <ul className="footerRight">
            <ul>
              <li>
                <a href="https://www.instagram.com/codeprepcprcoach/">
                  {" "}
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/susan.davis.733076">
                  {" "}
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/susan-b-davis-dnp-msn-rn-pmd-5bb403173/?original_referer=">
                  {" "}
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UClcIAZFQp_SWizNeaZqMj8A">
                  {" "}
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </ul>
        </div>
        {hasSubdomain && <iframe className="d-none" id="mainDomainIframe" src={`${process.env.REACT_APP_PUBLIC_URL}/readls`}></iframe>}
      </footer>
    </>
  );
};

export default Footer;
