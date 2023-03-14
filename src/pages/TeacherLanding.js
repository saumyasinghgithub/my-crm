import React, { useEffect, useState, useContext } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

import CourseList from "./CourseList";

import BlogList from "./BlogList";

import { TeacherProfile } from "./../components/teacher";

import Utils from "./../Utils";

import _ from "lodash";

const TeacherLanding = (props) => {
  //const { slug, page } = useParams();

  const { page } = useParams();

  const slug = Utils.subdomain();

  console.log("This is slug", slug);

  useEffect(() => {
    if (!Utils.hasSubdomain()) {
      window.location.href = process.env.REACT_APP_PUBLIC_URL;
      return false;
    }
  }, []);

  useEffect(window.scrollEffect, []);

  return (
    <Container fluid className="h-100 p-0">
      {page === "courses" && <CourseList trainerSlug={slug} />}
      {page !== "courses" && <TeacherProfile trainerSlug={slug} page={_.isEmpty(page) ? "about" : page} />}
      {page === "blogs" && <BlogList trainerSlug={slug} />}
    </Container>
  );
};

export default TeacherLanding;
