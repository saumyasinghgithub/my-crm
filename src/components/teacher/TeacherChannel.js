import React, { useState, useEffect } from "react";
import moment from "moment";
import TeacherNav from "./TeacherNav";
import Utils from "../../Utils";
import _ from "lodash";

const TeacherChannel = (props) => {
  const [ydata, setYdata] = useState([]);
  const fetchYoutube = () => {
    const ytKey = "AIzaSyDhNrgFOcQSr719GnpjYfRWJAYJqiwySUI";
    const channel = props.youtube;

    fetch(`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channel}&maxResults=10&key=${ytKey}`)
      .then((response) => response.json())
      .then((yd) => {
        setYdata(_.get(yd, "items", []));
      })
      .catch((err) => console.log(err));
  };
  useEffect(fetchYoutube, []);

  const youtubeItem = ({ id, snippet }) => {
    return (
      <div className="col-sm-6 col-md-4">
        <div className="knowledgeBox slideInUp wow ">
          <div className="knowledgeImg">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${id.videoId}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="knowledgeTitle">{snippet.title}</div>
          <div className="knowledgeBody">Publish Date {moment(snippet.publishedAt).format("YYYY-MM-DD")}</div>
          <div className="knowledgeFooter clearfix">
            <div className="FText">{snippet.channelTitle}</div>
            {/* <ul><li><a href=""><img src="/assets/images/eyes.png" alt="ad eyes" /></a></li><li className='ml-2'><a href=""><img src="/assets/images/share-icon.png" alt="ad share" /></a></li></ul>*/}
          </div>
        </div>
      </div>
    );
  };

  useEffect(window.scrollEffect, []);

  return <>{ydata.length > 0 && <div className="row">{ydata.length > 0 && ydata.map(youtubeItem)}</div>}</>;
};

export default TeacherChannel;
