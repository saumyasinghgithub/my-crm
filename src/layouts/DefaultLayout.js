import React, { useEffect, useState, useContext } from "react";
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
    copywrite_text: "by KS TVERSE",
    created_at: "2023-04-26T05:41:26.000Z",
    updated_at: null,
  });

  const callbackfn = () => {
    if (Utils.subdomain() !== process.env.REACT_APP_HOST) {
      //const id = 57;
      getServerData(`trainer/profiledata/${Utils.subdomain()}`).then((data) => {
        if (data.user_id > 0) {
          setServerData("settings/site-settings", `&id=${data.user_id}`, "post")
            .then((res) => {
              setSitesetting({ ...sitesetting, ..._.get(res, "data[0]", {}) });
            })
            .catch((err) => console.log("asdfdsafdsaf", err));
        }
      });
    }
  };
  useEffect(callbackfn, []);

  const hasSubdomain = Utils.hasSubdomain();
  const location = useLocation();
  return (
    <Container fluid className="h-100 p-0">
      {!hasSubdomain && sitesetting && <Header sitesetting={sitesetting} />}
      {hasSubdomain && sitesetting && location.pathname !== "/readls" && <HeaderTrainer sitesetting={sitesetting} />}
      {children}
      <LoginModal />
      <JoinAsStudent />
      <JoinAsTrainer />
      {sitesetting && <Footer sitesetting={sitesetting} />}
    </Container>
  );
};

export default DefaultLayout;
