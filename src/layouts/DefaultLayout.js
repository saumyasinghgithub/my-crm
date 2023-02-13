import React from "react";
import { Container } from "react-bootstrap";
import {Header, HeaderTrainer, Footer, LoginModal, JoinAsStudent, JoinAsTrainer} from './../components';
import Utils from "../Utils";


const DefaultLayout = ({ children }) => {
  const hasSubdomain = Utils.hasSubdomain();
  return <Container fluid className="h-100 p-0">
    {!hasSubdomain && <Header />}
    {hasSubdomain && <HeaderTrainer />}
    {children}
    <LoginModal />
    <JoinAsStudent />
    <JoinAsTrainer />
    <Footer />
  </Container>
};

export default DefaultLayout;