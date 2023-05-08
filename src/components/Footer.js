import React, { useState, useEffect, useContext } from "react";
import Utils from "./../Utils";
import UserContext from "./../contexts/UserContext";

const Footer = (props) => {
  //console.log(props.sitesetting);
  const { userData, getUserData, isLoggedIn, getServerData } = useContext(UserContext);
  if (JSON.stringify(props.sitesetting) === "{}") {
    console.log("The object is empty");
  }
  const hasSubdomain = Utils.hasSubdomain();
  const [list, setList] = useState({
    loading: false,
    error: false,
    pageInfo: {},
    data: [],
  });

  const fetchList = () => {
    setList({ ...list, loading: true });
    getServerData("sociallink/list", true).then((res) => {
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

  useEffect(fetchList, []);

  return (
    <>
      <footer className="footer footerFixed">
        <div className="container">
          <ul className="footerLeft">
            {/*JSON.stringify(props.sitesetting) === "{}" && (
              <>
                <li className="footerline">
                  {" "}
                  © {new Date().getFullYear()} by {props.sitesetting.firstname}{" "}
                  {props.sitesetting.middlename} {props.sitesetting.lastname},{" "}
                  {props.sitesetting.company_name}
                </li>
              </>
            )*/}
            {JSON.stringify(props.sitesetting) !== "{}" && (
              <li className="footerline">
                {" "}
                © {new Date().getFullYear()} {props.sitesetting.copywrite_text}{" "}
              </li>
            )}
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
