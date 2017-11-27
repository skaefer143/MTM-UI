import moment from 'moment';
import axios from 'axios';
import { Song } from '../entities/Song.js';
import { SongRank } from '../entities/SongRank.js';
import { MediaItem } from '../entities/MediaItem.js';
import { ChartPosition } from '../entities/ChartPosition.js';

const BASE_URL = "http://localhost:8888/api";

class MusicAPI {

    constructor() {

    }

    static handleError = (error) => {
        var message = "Unreachable server error";
        if (error.response.data.errors[0] != undefined) {
            message = error.response.data.errors[0].details;
        }

        throw new Error(message);
    };

    static getChart = (date) => {

        let requestUrl = BASE_URL + "/charts/" + date;

        return axios.get(requestUrl)
            .then(function (res) {

                let result = res.data.data;

                let chart = [];

                result.forEach((chartItem) => {
                    chart.push(new ChartPosition(chartItem.rank, chartItem.songId, chartItem['song.name'], chartItem['song.artist']));
                });

                return chart;

            })
            .catch(function (error) {
                MusicAPI.handleError(error);
            });
    };

    static getSongInfo = (id) => {
        let requestUrl = BASE_URL + "/songs/" + id;

        return axios.get(requestUrl)
            .then(function (response) {

                let result = response.data.data;

                let song = new Song(id, result.name, result.artist,
                    result.albumName, result.albumRelease, result.duration,
                    result.url, result.image, null);

                return song;

            })
            .catch(function (error) {
                MusicAPI.handleError(error);
            });
    }

    static getSongRankings = (id) => {
        let requestUrl = BASE_URL + "/songs/" + id + "/ranks";

        return axios.get(requestUrl)
            .then(function (res) {

                let result = res.data.data;

                let rankings = [];

                result.forEach((ranking) => {
                    rankings.push(new SongRank(ranking.endDate, ranking.rank));
                });

                return rankings;

            })
            .catch(function (error) {
                MusicAPI.handleError(error);
            });
    }

    static getSongMedia = (id) => {
        let requestUrl = BASE_URL + "/songs/" + id + "/media?n=4";

        return axios.get(requestUrl)
            .then(function (res) {

                let result = res.data.data;

                let media = [];

                result.forEach((mediaObject) => {
                    media.push(new MediaItem(mediaObject.url, mediaObject.caption, mediaObject.mediaType, mediaObject.thumbnail));
                });

                return media;

            })
            .catch(function (error) {
                MusicAPI.handleError(error);
            });
    }
}

export { MusicAPI };