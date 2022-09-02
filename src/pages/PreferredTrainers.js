import React, {useEffect, useContext, useState} from "react";
import { Container, Card, Pagination, Row, Col } from "react-bootstrap";
import UserContext from './../contexts/UserContext';
import _ from 'lodash';

const PreferredTrainers = (props) => {
    const [favs,setFavs] = useState({loading: true, start: 0, limit: 12});
    const {getServerData, setServerData} = useContext(UserContext);
    
    const $ = window.$;

    const fetchFavorites = ()=>{
        getServerData(`trainer/my-preferred?start=${favs.start}&limit=${favs.limit}`,true)
        .then(res => {
            setFavs({...favs, ...res, loading: false});
        })
        .catch(err=> {
            setFavs({loading: false, success: false, message: err.message, data: []});
        });
    };

    useEffect(fetchFavorites,[]);

    useEffect(window.scrollEffect,[]);

    const removeFav = (trainer_id) => (e) => {
        $(e.target).fadeOut();
        setServerData('user/markfav',`trainer_id=${trainer_id}&fav=0`,'post')
        .then(fetchFavorites)
    };

    const renderMyFavs = () => {
        return <Row>
            {favs.data.map(rec => <Col xs={6} sm={4} xl={3} key={rec.id}>
                <Card className="m-2">
                    <Card.Body>
                        <img className="img-fluid p-2" src={`${process.env.REACT_APP_API_URL}/uploads/base/${rec.base_image}`} alt={_.get(rec,'firstname','')} />
                        <h3 className="text-center p-2">{_.get(rec,'firstname','')} {_.get(rec,'lastname','')}</h3>
                        <Row>
                            <Col className="col-4 text-left"><button className="btn btn-danger" onClick={removeFav(rec.user_id)}>Remove</button></Col>
                            <Col className="col-8 text-right"><a href={`${process.env.PUBLIC_URL}/trainers/${rec.slug}`} className="btn btn-info">View Profile</a></Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>)}
        </Row>;
    };

    return (<>
        <Container fluid className="h-100 p-0">
            <div className="profile-wrapper">
                <div className="container100">
                <h1>My Preferred Trainers</h1>
                
                    {favs.loading===true && <div className="alert alert-warning m-5 p-5">
                        Fetching your preferred trainers..
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" style={{"width": "100%"}}></div>
                        </div>
                    </div>}

                    {!favs.loading && <>
                        {!favs.success && <div className="alert alert-danger m-5 p-5">{favs.message}</div>}
                        {favs.success && renderMyFavs()}
                    </>}
                </div>
            </div>    
        </Container>
    </>);
};

export default PreferredTrainers;