import React from "react";
import { Container } from "react-bootstrap";
import {HeaderTrainer,Footer} from './../components';

const StaticPageLayout = ({ children }) => (
  <Container fluid className="h-100 p-0">
    <HeaderTrainer />
            {children}
    <Footer />
  </Container>
);

export default StaticPageLayout;