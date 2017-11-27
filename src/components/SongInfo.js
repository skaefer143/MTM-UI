import React from 'react';
import { Link } from 'react-router-dom';

const SongInfo = (props) => {

    let song = props.song;

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="media">
                    <div className="media-left">
                        <img src={ song.image } height="140" width="140" />
                    </div>
                    <div className="media-body text-left">
                    <a href={ song.url } target="_blank"><h1 className="media-heading">{ song.name }</h1></a>
                    <h4>{ song.artist }</h4>
                    <h5>
                        <br/>
                        { song.album }<br />
                        { song.releaseDate }<br />
                        { song.duration }
                    </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongInfo;