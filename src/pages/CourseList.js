import React,{useEffect,useState, useContext} from 'react';
import {Container} from 'react-bootstrap';

import UserContext from './../contexts/UserContext';

const CourseList = (props) => {

    const slug = props.trainerSlug;

    const [trainer, setTrainer] = useState({});

    const [loading, setLoading] = useState(true);

    const {getServerData} = useContext(UserContext);

    useEffect(()=>{
            getServerData(`trainer/${slug}/courses`,true)
            .then(tData => {
                console.log(tData);
                setTrainer(tData);
                setLoading(false);
            })
            .catch(msg=> {
                setTrainer({success: false, message: msg});
                setLoading(false);
            });
        },[]);

    useEffect(window.scrollEffect,[]);

    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
        <div className="container100">         
            <div className="libraryeWrapper container">
                <div className="libraryHeading">                
                    <h1 className="headingtext courselist">All courses taught by Ben Jacobs</h1>                
                    <div className="subHeading">Igenimu saeped qui volorest qui dia qui occus expeliqui nonse omnihic<br /> tem re, aut ut impossin rerectore</div>
                </div>
                <div className="libraryBody allCourses">              
                    <div className="libraryInfobox">
                        <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src="assets/images/knowledge_1.jpg" alt="AD" /></div>
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
                                <img className="img-fluid LLike" src="assets/images/like-icon.png" alt="AD" />
                                <img className="img-fluid lShare" src="assets/images/share-icon.png" alt="AD" />
                            </div>
                            <div className="librarybuttonList">
                                <ul>
                                    <li><a href=""><img src="assets/images/pdf.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/audio1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/edit1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/video1.png" alt="AD" /> 20 USD</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="LPriceInfoBox">
                            <div className="boldAmount">30 USD</div>
                            <div className="bundlePrice">( Bundle Price )</div>
                            <button className="btn btnBlue" >Add to Cart </button>
                        </div>
                    </div>
                    <div className="libraryInfobox">
                        <div className="LImgBox"><img className="img-fluid" src="assets/images/knowledge_2.jpg" alt="AD" /></div>
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
                                <img className="img-fluid LLike" src="assets/images/like-icon.png" alt="AD" />
                                <img className="img-fluid lShare" src="assets/images/share-icon.png" alt="AD" />
                            </div>
                            <div className="librarybuttonList">
                                <ul>
                                    <li><a href=""><img src="assets/images/pdf.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/audio1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/edit1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/video1.png" alt="AD" /> 20 USD</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="LPriceInfoBox">
                            <div className="boldAmount">30 USD</div>
                            <div className="bundlePrice">( Bundle Price )</div>
                            <button className="btn btnBlue" >Add to Cart </button>
                        </div>
                    </div>
                    <div className="libraryInfobox">
                        <div className="LImgBox"><span className="new">Bestseller</span><img className="img-fluid" src="assets/images/knowledge_3.jpg" alt="AD" /></div>
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
                                <img className="img-fluid LLike" src="assets/images/like-icon.png" alt="AD" />
                                <img className="img-fluid lShare" src="assets/images/share-icon.png" alt="AD" />
                            </div>
                            <div className="librarybuttonList">
                                <ul>
                                    <li><a href=""><img src="assets/images/pdf.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/audio1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/edit1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/video1.png" alt="AD" /> 20 USD</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="LPriceInfoBox">
                            <div className="boldAmount">30 USD</div>
                            <div className="bundlePrice">( Bundle Price )</div>
                            <button className="btn btnBlue" >Add to Cart </button>
                        </div>
                    </div>
                    <div className="libraryInfobox">
                        <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src="assets/images/knowledge_4.jpg" alt="AD" /></div>
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
                                <img className="img-fluid LLike" src="assets/images/like-icon.png" alt="AD" />
                                <img className="img-fluid lShare" src="assets/images/share-icon.png" alt="AD" />
                            </div>
                            <div className="librarybuttonList">
                                <ul>
                                    <li><a href=""><img src="assets/images/pdf.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="images/audio1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="images/edit1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="images/video1.png" alt="AD" /> 20 USD</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="LPriceInfoBox">
                            <div className="boldAmount">30 USD</div>
                            <div className="bundlePrice">( Bundle Price )</div>
                            <button className="btn btnBlue" >Add to Cart </button>
                        </div>
                    </div>
                    <div className="libraryInfobox">
                        <div className="LImgBox"><span className="new">New</span><img className="img-fluid" src="assets/images/knowledge_5.jpg" alt="AD" /></div>
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
                                <img className="img-fluid LLike" src="assets/images/like-icon.png" alt="AD" />
                                <img className="img-fluid lShare" src="assets/images/share-icon.png" alt="AD" />
                            </div>
                            <div className="librarybuttonList">
                                <ul>
                                    <li><a href=""><img src="assets/images/pdf.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/audio1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/edit1.png" alt="AD" /> 20 USD</a></li>
                                    <li><a href=""><img src="assets/images/video1.png" alt="AD" /> 20 USD</a></li>
                                </ul>
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
    </Container>
</>);
};

export default CourseList;