import moment from 'moment';
import axios from 'axios';

const BASE_URL = "http://localhost:8888/api";

class MusicAPI {

    constructor() {

    }

    static getChart = (date) => {

        let requestUrl = BASE_URL + "/charts/" + date;
        
        return axios.get(requestUrl).then(function (res) {

            let result = res.data.data;

            let chart = [];
            
            result.forEach((chartItem) => { chart.push(
                { 
                    position: chartItem.rank, 
                    id: chartItem.songId,
                    name: chartItem['song.name'],
                    artist: chartItem['song.artist']
                }); 
            });
            
            return chart;

        }, function (res) {
            var message = "Unreachable server error";
            if (res.data.errors[0] != undefined) {
                message = res.data.errors[0].title;
            }

            //throw new Error(message);
        });
    };

    static getSongInfo = (id) => {
        let requestUrl = BASE_URL + "/songs/" + id;

        return axios.get(requestUrl).then(function (res) {

            let result = res.data.data;

            let song = {
                title: result.name,
                artist: result.artist,
                album: result.albumName,
                releaseDate: result.albumRelease,
                duration: result.duration,
                image: result.image,
                url: result.url
            }

            return song;

        }, function (res) {
            var message = "Unreachable server error";
            if (res.data.errors[0] != undefined) {
                message = res.data.errors[0].title;
            }

            //throw new Error(message);
        });
    }

    static getSongRankings = (id) => {
        let requestUrl = BASE_URL + "/songs/" + id + "/ranks";
        
        return axios.get(requestUrl).then(function (res) {

            let result = res.data.data;

            let rankings = [];
            
            result.forEach((ranking) => { rankings.push(
                { 
                    date: ranking.endDate, 
                    rank: ranking.rank 
                }); 
            });
            
            return rankings;

        }, function (res) {
            var message = "Unreachable server error";
            if (res.data.errors[0] != undefined) {
                message = res.data.errors[0].title;
            }

            //throw new Error(message);
        });
    }

    static getSongMedia = (id) => {
        let requestUrl = BASE_URL + "/songs/" + id + "/media?n=4";
        
        return axios.get(requestUrl).then(function (res) {

            let result = res.data.data;

            let media = [];
            
            result.forEach((mediaObject) => { media.push(
                { 
                    url: mediaObject.url, 
                    title: mediaObject.caption, 
                    type: mediaObject.mediaType, 
                    thumbnail: mediaObject.thumbnail
                }); 
            });
            
            return media;

        }, function (res) {
            var message = "Unreachable server error";
            if (res.data.errors[0] != undefined) {
                message = res.data.errors[0].title;
            }

            //throw new Error(message);
        });
    }
}

export { MusicAPI };