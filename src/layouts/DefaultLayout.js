import React from "react";
import { Container } from "react-bootstrap";
import {Header, HeaderTrainer, Footer, LoginModal, JoinAsStudent, JoinAsTrainer} from './../components';
import Utils from "../Utils";
import HeaderStudent from "./../components/student/HeaderStudent";
import { useLocation } from "react-router-dom";


const DefaultLayout = ({ children }) => {
  const hasSubdomain = Utils.hasSubdomain();
  const location = useLocation();
  console.log('location',location);
  return <Container fluid className="h-100 p-0">
    {!hasSubdomain && <Header />}
    {hasSubdomain && location.pathname !== '/' && <HeaderTrainer />}
    {children}
    <LoginModal />
    <JoinAsStudent />
    <JoinAsTrainer />
    <Footer />
  </Container>
};

export default DefaultLayout;