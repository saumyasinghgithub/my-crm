import React from "react";
import { Container } from "react-bootstrap";
import {Header,Footer,Home, LoginModal} from './../components';

const DefaultLayout = ({ children }) => (
  <Container fluid className="h-100 ">
    <Header />
    <Home />
    {children}
    <LoginModal />
    <Footer />
  </Container>
);

export default DefaultLayout;