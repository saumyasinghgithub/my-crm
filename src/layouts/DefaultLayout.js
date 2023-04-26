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
    if((Utils.subdomain() !== 'localhost:3002') && (Utils.subdomain() !== 'kstverse.com')){
      console.log(Utils.subdomain());
      //const id = 57;
      axios.get(Utils.apiUrl(`trainer/profiledata/${Utils.subdomain()}`),Utils.apiHeaders()).then((res) => {
        if (res.data.user_id > 0) {
          console.log(res.data.user_id);
          axios.post(Utils.apiUrl('settings/site-settings'),`&id=${res.data.user_id}`,Utils.apiHeaders()).then((res) => {
            if (res.data[0]) {
              console.log(res.data[0]);
              setSitesetting(res.data[0]);
            } else {
              setSitesetting({"firstname":"KS TVERSE ","middlename":"","lastname":"Davis","id":2,"trainer_id":55,"company_name":"KSTVERSE","site_title":"RescueRN","logo":null,"contact_email":null,"contact_address":null,"contact_phone":null,"copywrite_text":"by KS TVERSE","created_at":"2023-04-26T05:41:26.000Z","updated_at":null});
            }
          });
        } else {
          setSitesetting({"firstname":"KS TVERSE ","middlename":"","lastname":"Davis","id":2,"trainer_id":55,"company_name":"KSTVERSE","site_title":"RescueRN","logo":null,"contact_email":null,"contact_address":null,"contact_phone":null,"copywrite_text":"by KS TVERSE","created_at":"2023-04-26T05:41:26.000Z","updated_at":null});
        }
      });
      
    } 
    if((Utils.subdomain() === 'localhost:3002')){
      setSitesetting({"firstname":"KS TVERSE ","middlename":"","lastname":"Davis","id":2,"trainer_id":55,"company_name":"KSTVERSE","site_title":"RescueRN","logo":null,"contact_email":null,"contact_address":null,"contact_phone":null,"copywrite_text":"by KS TVERSE","created_at":"2023-04-26T05:41:26.000Z","updated_at":null});
    }
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