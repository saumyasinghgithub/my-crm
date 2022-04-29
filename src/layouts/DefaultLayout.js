import React from "react";
import { Container } from "react-bootstrap";

const DefaultLayout = ({ children }) => (
  <Container fluid className="h-100 ">
    {children}
  </Container>
);

export default DefaultLayout;