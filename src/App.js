/*
  Author: Surojit Basu
  Date: June 01, 2020
*/

import React , {useEffect } from 'react';
import './App.css';
import CustomRoutes from './CustomRoutes';

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {UserProvider} from './contexts/UserContext';
import {TrainerProvider} from './contexts/TrainerContext';
import {CourseProvider} from './contexts/CourseContext';
import Utils from './Utils';
import {NotFound} from './components';


const App = (props) => {

  const RoutedLayout = () => {
    return <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <Routes>
        {CustomRoutes.map((route, index) => {
          if(route.secure && !Utils.isLoggedIn()){
            return <Route key={index} path={`${process.env.PUBLIC_URL}/login`} component={() => <route.layout {...props}>
            <route.component {...props} />
          </route.layout>} />
          }else{
            return (
              <Route
                key={index}
                path={process.env.PUBLIC_URL + route.path}
                exact={route.exact || false}
                element={<route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>}
              />
            );
          }
        })}
		    <Route component={NotFound}></Route>
      </Routes>
    </Router>
  }
  
  const Provider = () => {
    return <UserProvider>
      <TrainerProvider>
        <CourseProvider>
          <RoutedLayout />
        </CourseProvider>
      </TrainerProvider>
    </UserProvider>;
  }

  return <Provider />;
  
}

export default App;
