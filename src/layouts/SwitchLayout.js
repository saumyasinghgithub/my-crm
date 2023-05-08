import React, { useContext } from "react";
import Layout from "./../layouts";
import Utils from "../Utils";
import UserContext from "./../contexts/UserContext";

const SwitchLayout = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  if (isLoggedIn()) {
    return <Layout.DefaultLayout>{children}</Layout.DefaultLayout>;
  } else {
    return <Layout.StaticPageLayout>{children}</Layout.StaticPageLayout>;
  }
};

export default SwitchLayout;
