import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { Header, Footer } from "./../components";
import Utils from "../Utils";

import UserContext from "./../contexts/UserContext";

const LoginLayout = ({ children }) => {
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
    if (Utils.hasSubdomain()) {
      getServerData(`trainer/profiledata/${Utils.subdomain()}`, true).then((res) => {
        if (res.data.user_id > 0) {
          getServerData(`settings/trainer/${res.data.user_id}`).then((res) => {
            setSitesetting(res.data);
          });
        }
      });
    }
  };
  useEffect(callbackfn, []);
  return (
    <Container fluid className="h-100 ">
      {sitesetting && <Header sitesetting={sitesetting} />}
      {children}
      {sitesetting && <Footer sitesetting={sitesetting} />}
    </Container>
  );
};

export default LoginLayout;
