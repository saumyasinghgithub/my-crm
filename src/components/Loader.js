import React, { useEffect, useState, useContext } from "react";
import { Grid } from 'react-loader-spinner';
const Loader = (props) => {
    return (<>
        <div className="profile-wrapper">
            <div className="container">
                <div className="m-5">
                    <Grid
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        </div>
    </>);
};
export default Loader;