import React, { useEffect, useState, useContext } from "react";
import { Puff } from 'react-loader-spinner';
const Loader = (props) => {
    return (<>
        <div className="profile-wrapper">
            <div className="container">
                <div className="m-5">
                    <Puff
                        height="80"
                        width="80"
                        radius={1}
                        color="#4fa94d"
                        ariaLabel="puff-loading"
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