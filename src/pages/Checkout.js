import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import _ from "lodash";
import UserContext from "./../contexts/UserContext";
import Utils from "../Utils";
import { Loader } from "../components";
import axios from "axios";

const Checkout = (props) => {
    useEffect(window.scrollEffect, []);

    return (
        <>
        <h1>Checout page</h1>
        </>
    );
};
export default Checkout;