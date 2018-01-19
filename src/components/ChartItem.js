import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ChartItem component shows an item of the the list of songs in an ordered list. 
 * Receives a song as a property.
 */
export default class ChartItem extends React.Component {

  render() {
    let id = this.props.song.id;
    let name = this.props.song.name;
    let artist = this.props.song.artist;
    let position = this.props.song.position;
        
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
                  <h4 className="media-heading">{name}</h4>
                  {artist}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};
