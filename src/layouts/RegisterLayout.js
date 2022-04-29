import React from "react";
import { Container } from "react-bootstrap";

const RegisterLayout = ({ children }) => (
  <Container fluid className="h-100 ">
    {children}
  </Container>
);

export default RegisterLayout;