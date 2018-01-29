import moment from 'moment';
import axios from 'axios';
import Song from '../entities/Song.js';
import SongRank from '../entities/SongRank.js';
import MediaItem from '../entities/MediaItem.js';
import ChartPosition from '../entities/ChartPosition.js';

const BASE_URL = "http://localhost:8888/api";

export default class MusicAPI {

  constructor() { }

  /**
   * Handles errors in request
   */
  static handleError = (error) => {
    var message = "Unreachable server error";
    if (error.response.data.errors[0] != undefined) {
      message = error.response.data.errors[0].details;
    }

    throw new Error(message);
  };

  /**
   * Get songs in the billboard chart in a given date
   */
  static getChart = (date) => {

    let BILLBOARD_URL = "http://localhost:9006/billboard/charts/" + date + '?filter=song';

    return axios.get(BILLBOARD_URL)
      .then(function (res) {

        let result = res.data;
        let chart = [];

        result.forEach((chartItem) => {
          chart.push(new ChartPosition(chartItem['rank'], chartItem['song_id'], chartItem['song_name'], chartItem['display_artist']));
        });

        return chart;
      })
      .catch(function (error) {
        MusicAPI.handleError(error);
      });
  };

  /**
   * Get song information given an id
   */
  static getSongInfo = (id) => {
    let BILLBOARD_URL = "http://localhost:9006/billboard/music/song/" + id;
    
    return axios.get(BILLBOARD_URL)
      .then(function (bill_response) {

        let bill_result = bill_response.data.song;
        let spotify_id = bill_result['spotify_id'];

        /* Spotify Track Query */
        let SPOTIFY_URL = "http://localhost:9007/spotify/v1/tracks/" + spotify_id;
        return axios.get(SPOTIFY_URL)
          .then(function (spot_response) {

            let spot_result = spot_response.data;
            let spot_album_id = spot_result.album['id'];
            
            /* Spotify Album Query */
            let SPOTIFY_ALBUM_URL = "http://localhost:9007/spotify/v1/albums/" + spot_album_id;
            return axios.get(SPOTIFY_ALBUM_URL)
              .then(function (spot_album_response) {

              let spot_album_result = spot_album_response.data;


              let song = new Song(id, bill_result['song_name'], bill_result['display_artist'], 
                spot_result.album['name'], spot_album_result['release_date'], 
                spot_result['duration_ms'], spot_result.external_urls['spotify'], spot_result.album.images[0]['url']);
              return song;

            })
            .catch(function (error) {
              MusicAPI.handleError(error);
            });
        })
        .catch(function (error) {
          MusicAPI.handleError(error);
        });
      })
      .catch(function (error) {
        MusicAPI.handleError(error);
      });
  }

  /**
   * Get historical ranks of a song given an id
   */
  static getSongRankings = (id) => {
    let BILLBOARD_URL = "http://localhost:9006/billboard/music/song/" + id;

    return axios.get(BILLBOARD_URL)
      .then(function (res) {
        let result = res.data.rankings;
        let rankings = [];

        result.forEach((ranking) => {
          rankings.push(new SongRank(ranking['date'], ranking['rank']));
        });

        return rankings;
      })
      .catch(function (error) {
        MusicAPI.handleError(error);
      });
  }

  /**
   * Get related media of a song given an id.
   */
  static getSongMedia = (id) => {

    let media = [];

    let BILLBOARD_URL = "http://localhost:9006/billboard/music/song/" + id;

    return axios.get(BILLBOARD_URL)
      .then(function (bill_res) {
        let bill_result = bill_res.data.song;

        let song_name = bill_result['song_name'];
        let song_artist = bill_result['display_artist'];


        let VIDEO_URL = "http://localhost:9008/imvdb/api/v1/search/videos?q=" + 
          song_name + " " + song_artist + "&per_page=4";
        return axios.get(VIDEO_URL)
          .then(function (imvdb_res) {
            let imvdb_result = imvdb_res.data.results;

            imvdb_result.forEach((mediaObj) => {
              media.push(new MediaItem(mediaObj['url'], mediaObj['song_title'], mediaObj.image['l']));
            });

            let GOOGLE_URL = "http://localhost:9009/googleapis/customsearch/v1?q=" + 
              song_name + " " + song_artist + "&cx=001770674074172668715:am0dsqea_hey" 
              + "&key=AIzaZyAHVa03D6aEAPH_AGR6-PJGKILKxJU-VyY"
              + "&num=6"
              + "&searchType=image";
            return axios.get(GOOGLE_URL)
              .then(function (google_res) {
                let google_result = google_res.data.items;

                google_result.forEach((mediaObj) => {
                  media.push(new MediaItem(mediaObj['link'], mediaObj['title'], mediaObj.image['thumbnailLink']));
                });

                return media;
              })
            .catch(function (error) {
              MusicAPI.handleError(error);
            });
            
          })
        .catch(function (error) {
          MusicAPI.handleError(error);
        }); 

      })
      .catch(function (error) {
        MusicAPI.handleError(error);
      });

    }

}
