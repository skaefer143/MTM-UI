import React from 'react';
import SongInfo from './SongInfo';
import SongRanking from './SongRanking';
import SongMedia from './SongMedia';
import { MusicAPI } from '../api/mtm.js';
import { Song } from '../entities/Song.js';
import { SongRank } from '../entities/SongRank.js';

export default class SongPage extends React.Component {

    state = {
        song: {},
        rankings: [],
        media: [],
        isLoadingInfo: false,
        isLoadingRankings: false,
        isLoadingMedia: false,
    };

    componentDidMount() {
        this.setState({
            isLoadingInfo: true,
            isLoadingRankings: true,
            isLoadingMedia: true,
        });

        let songId = this.props.match.params.id;

        setTimeout(() => {
            this.loadSongInfo(songId);
            this.loadSongRankings(songId);
            this.loadSongMedia(songId);
        }, 0);
        
    };

    loadSongInfo(songId) {
        MusicAPI.getSongInfo(songId).then(function (data) {
            this.setState({
                song: data,
                isLoadingInfo: false
            });
        }.bind(this), function (e) {
            this.setState({
                isLoadingInfo: false
            });
            alert(e.message);
        }.bind(this));
    };

    loadSongRankings(songId) {
        MusicAPI.getSongRankings(songId).then(function (data) {
            this.setState({
                rankings: data,
                isLoadingRankings: false
            });
        }.bind(this), function (e) {
            this.setState({
                isLoadingRankings: false
            });
            alert(e.message);
        }.bind(this));
    };

    loadSongMedia(songId) {
        MusicAPI.getSongMedia(songId).then(function (data) {
            this.setState({
                media: data,
                isLoadingMedia: false
            });
        }.bind(this), function (e) {
            this.setState({
                isLoadingMedia: false
            });
            alert(e.message);
        }.bind(this));
    };

    render() {
        let songId = this.props.match.params.id;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="container">
                            { 
                                (this.state.isLoadingInfo && 
                                this.state.isLoadingRankings && 
                                this.state.isLoadingMedia)? 
                                <p>Loading...</p> : <br />   
                            }
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
