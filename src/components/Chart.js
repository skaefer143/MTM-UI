import React from 'react';
import ChartItem from './ChartItem';

/**
 * Chart component shows the list of songs in an ordered list.
 * Receives an array of songs as property.  The array is sorted based on the rank.
 */
export default class Chart extends React.Component {
  
  render() {
    return (
      <div className="row">
        <div className='col-sm-10 col-centered'>
          {this.props.songs.length === 0 && <p>Please add a song to get started!</p>}
          {
            this.props.songs.map((song, index) => (
              <ChartItem key={song.id} song={song} />
            ))
          }
        </div>
      </div>
    );
  }
};
