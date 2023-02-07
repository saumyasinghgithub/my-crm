import _ from "lodash";
import React, { useState, useEffect } from "react";

import Utils from "../Utils";

const ReadLocalStorage = (props) => {
  useEffect(window.scrollEffect, []);
  const [uData, setUData] = useState(Utils.getUserData());
  return <>{_.get(uData, "firstname", "NA")}</>;
};

export default ReadLocalStorage;
