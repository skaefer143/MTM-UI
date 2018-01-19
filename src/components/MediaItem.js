import React from 'react';

/**
 * MediaItem shows the content of a media item
 */

const MAX_TITLE_LENGTH = 20; // Max number of characters in title

export default class MediaItem extends React.Component {
    
  render() {
    let mediaResource = this.props.mediaResource;
    let url = mediaResource.url;
    let thumbnail = mediaResource.thumbnail;
    let title = mediaResource.title;
    let type = mediaResource.type;

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
  }
};