import React from 'react';
import { Link } from 'react-router-dom';

const ChartItem = (props) => {

    let id = props.song.id;
    let name = props.song.name;
    let artist = props.song.artist;
    let position = props.song.position;
    
    return (
        <Link to={ "/song/" + id } className="ranking-item">
            <div className="row">
            <div className="panel panel-default">
                <div className="panel-body">
                <div className="media">
                    <div className="media-left">
                        <span className="ranking-position">{position}</span>
                    </div>
                    <div className="media-body text-left">
                    <h4 className="media-heading">
                        {name}
                    </h4>
                    {artist}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </Link>
    );
};

export default ChartItem;