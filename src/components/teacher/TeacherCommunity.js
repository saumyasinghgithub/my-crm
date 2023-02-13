import React, { useState, useEffect} from 'react';
import moment from 'moment';
import TeacherNav from './TeacherNav';

const TeacherCommunity = (props) => {

    const [ydata, setYdata] = useState([]);
    const data = props.data;
    const fetchYoutube = () => {
    const ytKey = 'AIzaSyDhNrgFOcQSr719GnpjYfRWJAYJqiwySUI';
    const channel = data.youtube_community;
    
    
    fetch(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channel}&maxResults=10&key=${ytKey}`)
    .then(response => response.json())
    .then(yd => {
       setYdata(yd.items);
       
    })
    .catch(err => console.log(err));
    }
    useEffect(fetchYoutube, []);

    const youtubeItem = ({id,snippet}) => {

        return <div className="col-sm-6 col-md-4">
            <div className="knowledgeBox slideInUp wow ">
                <div className="knowledgeImg">
                <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${id.videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            <div className="knowledgeTitle">
            {snippet.title}
            </div>
            <div className="knowledgeBody">
             Publish Date {moment(snippet.publishedAt).format('YYYY-MM-DD')}
            </div>
            <div className="knowledgeFooter clearfix">
                <div className="FText">{snippet.channelTitle}</div>
               {/* <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li className='ml-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad share" /></a></li></ul>*/}
            </div>
        </div>
    </div>
      };
    
    useEffect(window.scrollEffect, []);

    return (<>
    <div className='row'>
        <div className='col-lg-3 col-md-3 col-12 pt-3 pb-1'>
            <TeacherNav slug={props.slug} page={props.page} onPageChange={props.onPageChange} />    
        </div>
            <div className='col-lg-9 col-md-9 col-12 pt-2 pb-1'>
                <img className="img-fluid imgTransfer" src={`${process.env.REACT_APP_API_URL}/uploads/community/${encodeURI(data.community_image)}`} alt="service" />
            </div>
        </div>

        <div className="serviceWrapper container"> 
            <div className="serviceHeading">                
                <h1 className="headingtext slideInUp wow ">04 Community</h1>
                {/* <ul className="profile-socail-icon serviceicon">
                    <li className='mr-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad eyes" /></a></li>
                    <li><a href=""><img src="/assets/images/link-icon.png" alt="ad eyes" /></a></li>
                </ul> */}
                <div className="subHeading slideInUp wow " dangerouslySetInnerHTML={{__html:data.about_community}}></div>
            </div>
            <div className="knowledgBody">
               <div className="freeResouces lineANimation slideInUp wow ">Free Resources</div>
               <div className="row">
                    {ydata.map(youtubeItem) }
                    
               </div>
            </div>
        </div>              
    </>);
};

export default TeacherCommunity;