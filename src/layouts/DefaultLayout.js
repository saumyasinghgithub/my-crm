import React, { useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import {Header, HeaderTrainer, Footer, LoginModal, JoinAsStudent, JoinAsTrainer} from './../components';
import Utils from "../Utils";
import HeaderStudent from "./../components/student/HeaderStudent";
import { useLocation } from "react-router-dom";
import axios from "axios";


const DefaultLayout = ({ children }) => {
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

  const hasSubdomain = Utils.hasSubdomain();
  const location = useLocation();
  console.log('location',location);
  return <Container fluid className="h-100 p-0">
    {!hasSubdomain && sitesetting && <Header sitesetting={sitesetting} />}
    {hasSubdomain && sitesetting && location.pathname !== '/readls' && <HeaderTrainer sitesetting={sitesetting} />}
    {children}
    <LoginModal />
    <JoinAsStudent />
    <JoinAsTrainer />
    {sitesetting && <Footer sitesetting={sitesetting} />}
  </Container>
};

export default DefaultLayout;