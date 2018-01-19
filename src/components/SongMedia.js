import React from 'react';
import MediaItem from './MediaItem';

/**
 * SongMedia component shows information about related media of a song
 */
export default class SongMedia extends React.Component {

  render() {
    let media = this.props.media;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Related Media</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            { media.length === 0 && <p>No associated media to show!</p> }
            {
              media.map((mediaResource, index) => (
                <MediaItem key={mediaResource.url + index} mediaResource={mediaResource} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}