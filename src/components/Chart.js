import React from 'react';
import ChartItem from './ChartItem';

const Chart = (props) => {
    return (
        <div className="row">   
            <div className='col-sm-10 col-centered'>

            {props.songs.length === 0 && <p>Please add a song to get started!</p>}
            {
                props.songs.map((song, index) => (
                    <ChartItem
                        key={song.id}
                        song={song}
                        />
                ))
            }
            </div>
        </div>
    );
};

export default Chart;