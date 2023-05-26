import React, { useEffect, useState, useContext, cloneElement } from "react";
import { Container } from "react-bootstrap";
import { Header, HeaderTrainer, Footer, LoginModal, JoinAsStudent, JoinAsTrainer } from "./../components";
import Utils from "../Utils";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import UserContext from "./../contexts/UserContext";

const DefaultLayout = ({ children }) => {
  const { getServerData, setServerData } = useContext(UserContext);
  const [sitesetting, setSitesetting] = useState({
    firstname: "KS TVERSE ",
    middlename: "",
    lastname: "Davis",
    id: 2,
    trainer_id: 55,
    company_name: "KSTVERSE",
    site_title: "RescueRN",
    logo: null,
    contact_email: null,
    contact_address: null,
    contact_phone: null,
    copyright_text: "by KS TVERSE",
    created_at: "2023-04-26T05:41:26.000Z",
    updated_at: null,
  });

  const callbackfn = () => {
    if (Utils.hasSubdomain()) {
      //const id = 57;
      getServerData(`trainer/profiledata/${Utils.subdomain()}`).then((data) => {
        if (data.user_id > 0) {
          getServerData(`settings/trainer/${data.user_id}`)
            .then((res) => {
              setSitesetting({ ...sitesetting, ..._.get(res, "data", {}) });
            })
            .catch((err) => console.log("asdfdsafdsaf", err));
        }
      });
    }
  };
  useEffect(callbackfn, []);
  useEffect(
    function () {
      if (sitesetting.company_name !== undefined && sitesetting.company_name !== "") {
        document.querySelectorAll("head title")[0].innerText = sitesetting.company_name;
      }
      if (sitesetting.favicon !== undefined && sitesetting.favicon !== "") {
        document.querySelectorAll("link[rel=icon]")[0].href = `${process.env.REACT_APP_API_URL}/uploads/favicon/${sitesetting.favicon}`;
      }
    },
    [sitesetting]
  );

  const hasSubdomain = Utils.hasSubdomain();
  const location = useLocation();
  return (
    <Container fluid className="h-100 p-0">
      {!hasSubdomain && sitesetting && <Header sitesetting={sitesetting} />}
      {hasSubdomain && sitesetting && location.pathname !== "/readls" && <HeaderTrainer sitesetting={sitesetting} />}
      {cloneElement(children, { sitesetting: sitesetting })}
      <LoginModal />
      <JoinAsStudent />
      <JoinAsTrainer />
      {sitesetting && <Footer sitesetting={sitesetting} />}
    </Container>
  );
};

export default DefaultLayout;
