import React from 'react';
import { Link } from 'react-router-dom';

const SongInfo = (props) => {

    let image = props.song.image;
    let songTitle = props.song.title;
    let artist = props.song.artist;
    let albumName = props.song.album;
    let releaseDate = props.song.releaseDate;
    let duration = props.song.duration;
    let url = props.song.url;
    console.log(url);

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="media">
                    <div className="media-left">
                        <img src={ image } height="140" width="140" />
                    </div>
                    <div className="media-body text-left">
                    <a href={ url } target="_blank"><h1 className="media-heading">{ songTitle }</h1></a>
                    <h4>{ artist }</h4>
                    <h5>
                        <br/>
                        { albumName }<br />
                        { releaseDate }<br />
                        Duration: { duration }
                    </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongInfo;