import React from 'react';

const MediaItem = (props) => {
    
    const MAX_TITLE_LENGTH = 20;

    let url = props.mediaResource.url;
    let thumbnail = props.mediaResource.thumbnail;
    let title = props.mediaResource.title;
    let type = props.mediaResource.type;

    if (title.length > MAX_TITLE_LENGTH) {
        title = title.substring(0, MAX_TITLE_LENGTH) + '...';
    }

    return (
        <div className="col-sm-6 col-md-3">
            <a href={ url } title={ title } target="_blank">
                <div className="thumbnail">
                    <div className="sm-thumb">
                        <img src={ thumbnail } />
                    </div>
                    <div className="caption">
                        <h4>{ title }</h4>
                        { type == "image" && <span className="glyphicon glyphicon-picture"></span> }
                        { type == "video" && <span className="glyphicon glyphicon-facetime-video"></span> }
                        
                    </div>
                </div>
            </a>
        </div>
    );
};

export default MediaItem;