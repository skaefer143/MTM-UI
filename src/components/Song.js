import React from 'react';
import SongInfo from './SongInfo';
import SongRanking from './SongRanking';
import SongMedia from './SongMedia';
import { MusicAPI } from '../api/mtm.js';

export default class Song extends React.Component {
    
    state = {
        song: {},
        rankings: [],
        media: [],
        isLoading: false
    };

    componentDidMount() {  
        let songId = this.props.match.params.id;

        this.loadSongInfo(songId);
        this.loadSongRankings(songId);
        this.loadSongMedia(songId);
    };

    loadSongInfo(songId) {
        MusicAPI.getSongInfo(songId).then(function (data) {
            this.setState({
                song: data,
                isLoading: false
            });
        }.bind(this), function (e) {
            this.setState({
            isLoading: false,
            errorMessage: e.message
            });
        }.bind(this));
    };

    loadSongRankings(songId) {
        MusicAPI.getSongRankings(songId).then(function (data) {
            this.setState({
                rankings: data,
                isLoading: false
            });
        }.bind(this), function (e) {
            this.setState({
            isLoading: false,
            errorMessage: e.message
            });
        }.bind(this));
    };

    loadSongMedia(songId) {
        MusicAPI.getSongMedia(songId).then(function (data) {
            this.setState({
                media: data,
                isLoading: false
            });
        }.bind(this), function (e) {
            this.setState({
            isLoading: false,
            errorMessage: e.message
            });
        }.bind(this));
    };

    render() {
        let songId = this.props.match.params.id;
        

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="container">
                            <br />
                            <SongInfo song={this.state.song} />
                            <SongRanking rankings={this.state.rankings} />
                            <SongMedia media={this.state.media} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
