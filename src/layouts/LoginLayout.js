import React from "react";
import { Container } from "react-bootstrap";
import {Header,Footer} from './../components';

const LoginLayout = ({ children }) => (
  <Container fluid className="h-100 ">
      <Header />
            {children}
    <Footer />
  </Container>
);

export default LoginLayout;