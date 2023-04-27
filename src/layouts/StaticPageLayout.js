import React, { useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import {HeaderTrainer,Footer,LoginModal, JoinAsStudent, JoinAsTrainer} from './../components';
import axios from "axios";
import Utils from "../Utils";

const StaticPageLayout = ({ children }) => {
  const [sitesetting, setSitesetting] = useState();

  const callbackfn = () => {     
    if((Utils.subdomain() !== 'localhost:3002') && (Utils.subdomain() !== 'kstverse.com')){
      console.log(Utils.subdomain());
      //const id = 57;
      axios.get(Utils.apiUrl(`trainer/profiledata/${Utils.subdomain()}`),Utils.apiHeaders()).then((res) => {
        if (res.data.user_id > 0) {
          console.log(res.data.user_id);
          axios.post(Utils.apiUrl('settings/site-settings'),`&id=${res.data.user_id}`,Utils.apiHeaders()).then((res) => {
            console.log(res.data.data);
            if (res.data.data[0]) {
              console.log(res.data.data[0]);
              setSitesetting(res.data.data[0]);
            } else {
              setSitesetting(res.data.data[0]);
              //setSitesetting({"firstname":"KS TVERSE ","middlename":"","lastname":"Davis","id":2,"trainer_id":55,"company_name":"KSTVERSE","site_title":"RescueRN","logo":null,"contact_email":null,"contact_address":null,"contact_phone":null,"copywrite_text":"by KS TVERSE","created_at":"2023-04-26T05:41:26.000Z","updated_at":null});
            }
          });
        } else {
          //setSitesetting(res.data.data[0]);
          setSitesetting({"firstname":"KS TVERSE ","middlename":"","lastname":"Davis","id":2,"trainer_id":55,"company_name":"KSTVERSE","site_title":"RescueRN","logo":null,"contact_email":null,"contact_address":null,"contact_phone":null,"copywrite_text":"by KS TVERSE","created_at":"2023-04-26T05:41:26.000Z","updated_at":null});
        }
      });
      
    } 
    if((Utils.subdomain() === 'localhost:3002') || (Utils.subdomain() === 'kstverse.com')){
      //setSitesetting(res.data.data[0]);
      setSitesetting({"firstname":"KS TVERSE ","middlename":"","lastname":"Davis","id":2,"trainer_id":55,"company_name":"KSTVERSE","site_title":"RescueRN","logo":null,"contact_email":null,"contact_address":null,"contact_phone":null,"copywrite_text":"by KS TVERSE","created_at":"2023-04-26T05:41:26.000Z","updated_at":null});
    }
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