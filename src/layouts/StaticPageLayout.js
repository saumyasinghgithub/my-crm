import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { HeaderTrainer, Footer, JoinAsStudent, JoinAsTrainer } from "./../components";
import Utils from "../Utils";
import UserContext from "./../contexts/UserContext";

const StaticPageLayout = ({ children }) => {
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
  const { getServerData, setServerData } = useContext(UserContext);
  const callbackfn = () => {
    if (Utils.subdomain() !== process.env.REACT_APP_HOST) {
      getServerData(`trainer/profiledata/${Utils.subdomain()}`).then((data) => {
        if (data.user_id > 0) {
          setServerData("settings/site-settings", `&id=${data.user_id}`, "post").then((res) => {
            setSitesetting(res.data[0]);
          });
        }
      });
    }
  };
  useEffect(callbackfn, []);
  return (
    <Container fluid className="h-100 p-0">
      {sitesetting && <HeaderTrainer sitesetting={sitesetting} />}
      {/* <LoginModal /> */}
      <JoinAsStudent />
      <JoinAsTrainer />
      {children}
      {sitesetting && <Footer sitesetting={sitesetting} />}
    </Container>
  );
};

export default StaticPageLayout;
