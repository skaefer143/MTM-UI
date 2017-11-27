import React from 'react';
import MediaItem from './MediaItem';

const SongMedia = (props) => {
  
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Related Media</h3>
            </div>
            <div className="panel-body">
                <div className="row">

                {props.media.length === 0 && <p>No associated media to show!</p>}
                {
                    props.media.map((mediaResource, index) => (
                        <MediaItem
                            key={mediaResource.url + index}
                            mediaResource={mediaResource}
                            />
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default SongMedia;