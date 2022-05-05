import React from "react";
import { Container } from "react-bootstrap";
import {Header,Footer,Home, LoginModal, JoinAsStudent, JoinAsTrainer} from './../components';

const RegisterLayout = ({ children }) => (
  <Container fluid className="h-100 p-0">
    <Header />
    <Home />
    {children}
    <LoginModal />
    <JoinAsStudent />
    <JoinAsTrainer />
    <Footer />
  </Container>
);

export default RegisterLayout;