import React from "react";
import { Container } from "react-bootstrap";
import {HeaderTrainer,Footer,LoginModal, JoinAsStudent, JoinAsTrainer} from './../components';

const StaticPageLayout = ({ children }) => (
  <Container fluid className="h-100 p-0">
    <HeaderTrainer />
    {/* <LoginModal /> */}
    <JoinAsStudent />
    <JoinAsTrainer />
            {children}
    <Footer />
  </Container>
);

export default StaticPageLayout;