import React from "react";
import { Container } from "react-bootstrap";
import {Header, Footer, LoginModal, JoinAsStudent, JoinAsTrainer} from './../components';

const DefaultLayout = ({ children }) => (
  <Container fluid className="h-100 p-0">
    <Header />
    {children}
    <LoginModal />
    <JoinAsStudent />
    <JoinAsTrainer />
    <Footer />
  </Container>
);

export default DefaultLayout;