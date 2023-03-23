import React, { useEffect, useState, useContext } from "react";
import { Puff } from 'react-loader-spinner';
const Loader = (props) => {
    return (<>
        <div className="profile-wrapper">
            <div className="container">
                <div className="m-5">
                    <Puff
                        height="100"
                        width="100"
                        radius={1}
                        color="#0f79aa"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass="SiteLoader"
                        visible={true}
                    />
                </div>
            </div>
        </div>
    </>);
};
export default Loader;