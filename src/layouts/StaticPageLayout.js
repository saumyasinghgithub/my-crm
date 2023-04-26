import React, { useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import {HeaderTrainer,Footer,LoginModal, JoinAsStudent, JoinAsTrainer} from './../components';
import axios from "axios";
import Utils from "../Utils";

const StaticPageLayout = ({ children }) => {
  const [sitesetting, setSitesetting] = useState();

  const callbackfn = () => { 
    const id = 57;
    axios.post(Utils.apiUrl('settings/site-settings'),`&id=${id}`,Utils.apiHeaders()).then((res) => {
      if (res.data) {
        console.log(res.data[0]);
        setSitesetting(res.data[0]);
      } else {
        console.log('no data');
      }
    });
  }
  useEffect(callbackfn,[]);
  return <Container fluid className="h-100 p-0">
    {sitesetting && <HeaderTrainer sitesetting={sitesetting} />}
    {/* <LoginModal /> */}
    <JoinAsStudent />
    <JoinAsTrainer />
            {children}
    {sitesetting && <Footer sitesetting={sitesetting} />}
  </Container>
};

export default StaticPageLayout;