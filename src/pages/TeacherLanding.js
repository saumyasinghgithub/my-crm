import React, { useEffect, useState, useContext} from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import {useParams} from "react-router-dom";

import Utils from './../Utils';

import _ from 'lodash';
import UserContext from './../contexts/UserContext';

const TeacherLanding = (props) => {
    const { slug, page } = useParams();

    const [trainer, setTrainer] = useState({});

    const [loading, setLoading] = useState(true);

    const {getServerData} = useContext(UserContext);

    useEffect(()=>{
        getServerData(`trainer/profile/${slug}`,true)
        .then(tData => {
            setTrainer(tData);
            setLoading(false);
        })
        .catch(msg=> {
            setTrainer({success: false, message: msg});
            setLoading(false);
        });
    },[]);

    useEffect(window.scrollEffect, [trainer]);

    return (<>
    <Container fluid className="h-100 p-0">
    {loading && <>
                <div className="profile-wrapper">
                    <div className='container'>
                        <h1>Trainer</h1>
                        <Alert variant="warning"><div className="m-5">Looking for trainer details <Spinner animation="border" size="sm" /></div></Alert>
                    </div>
                </div>
            </>}

            {!loading && <>
                {_.get(trainer,'success',false)===false && <>
                    <div className="profile-wrapper">
                        <div className='container'>
                            <h1>Trainer</h1>
                            <Alert variant="danger"><div className="m-5">{trainer.message}</div></Alert>
                        </div>
                    </div>
                </>}  

    {_.get(trainer,'success',false)!==false && <>              

</>}
</>}
    </Container>
</>);
};

export default TeacherLanding;