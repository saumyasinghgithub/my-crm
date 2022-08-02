import React, { useEffect, useState, useContext} from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import {useParams} from "react-router-dom";

import Utils from './../Utils';

import _ from 'lodash';
import UserContext from './../contexts/UserContext';

const TeacherLibrary = (props) => {
    const { slug } = useParams();

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
    <div className="profile-wrapper">
    <div className="container">
    <div className='row'>
        <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
        <div className="profiletabBox">
        <ul className="profileTab slideInUp wow">
                <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/about`} >01 About</a></li>
                <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/service`}>02 Services</a></li>
                <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/knowledge`}>03 Knowledge</a></li>
                <li><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/community`}>04 Community</a></li>
                <li className="lineANimation"><a href={`${process.env.PUBLIC_URL}/trainers/${slug}/library`}trainer-library>05 Library</a></li>
        </ul>          
        </div>
        </div>
            <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
            <img className="img-fluid imgTransfer" src={`${process.env.REACT_APP_API_URL}/uploads/library/${encodeURI(trainer.library[0].library_image)}`} alt="service" />
            </div>
        </div>
        <div className="serviceWrapper container">
            <div className="serviceHeading">                
                <h1 className="headingtext slideInUp wow ">05 Library<ul className="profile-socail-icon">
                    <li><a href=""><img src="/assets/images/share-icon.png" alt="AD" /></a></li>
                    <li><a href=""><img src="/assets/images/link-icon.png" alt="AD" /></a></li>
                </ul></h1>
                
                <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{__html:trainer.library[0].about_library}}></div>
            </div>
            <nav className="navbar navbar-expand-md  filterMenu slideInUp wow ">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <h4>Filter for course <img src="/assets/images/arrow.png" className="img-fluid" alt="AD" /></h4>
                </button>                       
                  
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                      <ul className="navbar-nav">
                        <li className="nav-item dropdown dmenu">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Industry
                            </a>
                            <div className="dropdown-menu sm-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            <a className="dropdown-item" href="#">Link 3</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown dmenu">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Functional Areas
                            </a>
                            <div className="dropdown-menu sm-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown dmenu">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Topic
                            </a>
                            <div className="dropdown-menu sm-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown dmenu">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Laguage
                            </a>
                            <div className="dropdown-menu sm-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            <a className="dropdown-item" href="#">Link 3</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown dmenu">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Media
                            </a>
                            <div className="dropdown-menu sm-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown dmenu">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Level
                            </a>
                            <div className="dropdown-menu sm-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown dmenu">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Price
                            </a>
                            <div className="dropdown-menu sm-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            </div>
                        </li>                        
                        <li className="nav-item dropdown dmenu">
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                            Duration
                            </a>
                            <div className="dropdown-menu sm-menu">
                            <a className="dropdown-item" href="#">Link 1</a>
                            <a className="dropdown-item" href="#">Link 2</a>
                            </div>
                        </li>
                      </ul>
                    </div>
                  </nav>

            <div className="libraryBody">              
                <div className="libraryInfobox slideInUp wow ">
                    <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src="/assets/images/knowledge_1.jpg" alt="AD" /></div>
                    <div className="LTextBox">
                        <div className="libraryTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                        </div>
                        <div className="libraryBody">
                            Managing your finances is one of the most important things you can 
                            do in your life. It is the difference between living a life your handed or 
                            living the life you choose!
                        </div>
                        <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration: 23h 45min
                        </div>
                        <div className="libraryStar">
                            <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                            <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                            <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
                        </div>
                    </div>
                    <div className="LPriceInfoBox">
                        <div className="boldAmount">30 USD</div>
                        <div className="bundlePrice">( Bundle Price )</div>
                        <button className="btn btnBlue" >Add to Cart </button>
                    </div>
                </div>
                <div className="libraryInfobox slideInUp wow ">
                    <div className="LImgBox"><img className="img-fluid" src="/assets/images/knowledge_2.jpg" alt="AD" /></div>
                    <div className="LTextBox">
                        <div className="libraryTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                        </div>
                        <div className="libraryBody">
                            Managing your finances is one of the most important things you can 
                            do in your life. It is the difference between living a life your handed or 
                            living the life you choose!
                        </div>
                        <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration: 23h 45min
                        </div>
                        <div className="libraryStar">
                            <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                            <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                            <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
                        </div>
                    </div>
                    <div className="LPriceInfoBox">
                        <div className="boldAmount">30 USD</div>
                        <div className="bundlePrice">( Bundle Price )</div>
                        <button className="btn btnBlue" >Add to Cart </button>
                    </div>
                </div>
                <div className="libraryInfobox slideInUp wow ">
                    <div className="LImgBox"><span className="new">Bestseller</span><img className="img-fluid" src="/assets/images/knowledge_3.jpg" alt="AD" /></div>
                    <div className="LTextBox">
                        <div className="libraryTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                        </div>
                        <div className="libraryBody">
                            Managing your finances is one of the most important things you can 
                            do in your life. It is the difference between living a life your handed or 
                            living the life you choose!
                        </div>
                        <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration: 23h 45min
                        </div>
                        <div className="libraryStar">
                            <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                            <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                            <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
                        </div>
                    </div>
                    <div className="LPriceInfoBox">
                        <div className="boldAmount">30 USD</div>
                        <div className="bundlePrice">( Bundle Price )</div>
                        <button className="btn btnBlue" >Add to Cart </button>
                    </div>
                </div>
                <div className="libraryInfobox slideInUp wow ">
                    <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src="/assets/images/knowledge_4.jpg" alt="AD" /></div>
                    <div className="LTextBox">
                        <div className="libraryTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                        </div>
                        <div className="libraryBody">
                            Managing your finances is one of the most important things you can 
                            do in your life. It is the difference between living a life your handed or 
                            living the life you choose!
                        </div>
                        <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration: 23h 45min
                        </div>
                        <div className="libraryStar">
                            <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                            <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                            <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
                        </div>
                    </div>
                    <div className="LPriceInfoBox">
                        <div className="boldAmount">30 USD</div>
                        <div className="bundlePrice">( Bundle Price )</div>
                        <button className="btn btnBlue" >Add to Cart </button>
                    </div>
                </div>
                <div className="libraryInfobox slideInUp wow ">
                    <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src="/assets/images/knowledge_5.jpg" alt="AD" /></div>
                    <div className="LTextBox">
                        <div className="libraryTitle">
                            Personal Financial Well-Being Understanding Your Financial Life
                        </div>
                        <div className="libraryBody">
                            Managing your finances is one of the most important things you can 
                            do in your life. It is the difference between living a life your handed or 
                            living the life you choose!
                        </div>
                        <div className="libraryAuthorInfo">
                            By Ben Jacobs | 6/2019 | Level: Advanced | Duration: 23h 45min
                        </div>
                        <div className="libraryStar">
                            <i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i><i className="far fa-star"></i>
                            <img className="img-fluid LLike" src="/assets/images/like-icon.png" alt="AD" />
                            <img className="img-fluid lShare" src="/assets/images/share-icon.png" alt="AD" />
                        </div>
                    </div>
                    <div className="LPriceInfoBox">
                        <div className="boldAmount">30 USD</div>
                        <div className="bundlePrice">( Bundle Price )</div>
                        <button className="btn btnBlue" >Add to Cart </button>
                    </div>
                </div>
            </div>
        </div>              
    </div>
</div>
</>}
</>}
    </Container>
</>);
};


export default TeacherLibrary;