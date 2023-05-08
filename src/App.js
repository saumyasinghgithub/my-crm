/*
  Author: Surojit Basu
  Date: June 01, 2020
*/

import React from "react";
import "./App.css";
import CustomRoutes from "./CustomRoutes";
import { CookiesProvider } from "react-cookie";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";
import Utils from "./Utils";
import { NotFound } from "./components";
import { useCookies } from "react-cookie";
import _ from "lodash";

const App = (props) => {
  const [cookies] = useCookies([Utils.siteCookieName]);

  const RoutedLayout = () => {
    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Routes>
          {CustomRoutes.map((route, index) => {
            if (route.secure && !_.get(cookies, `${Utils.siteCookieName}.token`, false)) {
              return (
                <Route
                  key={index}
                  path={`${process.env.PUBLIC_URL}/login`}
                  component={() => (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  )}
                />
              );
            } else {
              return (
                <Route
                  key={index}
                  path={process.env.PUBLIC_URL + route.path}
                  exact={route.exact || false}
                  element={
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  }
                />
              );
            }
          })}
          <Route component={NotFound}></Route>
        </Routes>
      </Router>
    );
  };

  const Provider = () => {
    return (
      <CookiesProvider>
        <UserProvider>
          <RoutedLayout />
        </UserProvider>
      </CookiesProvider>
    );
  };

  return <Provider />;
};

export default App;
