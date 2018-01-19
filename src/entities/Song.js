/**
 * Data object for song inforation
 */
export default class Song {

    constructor(id, name, artist, album, releaseDate, duration, url, image) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.album = album;
        this.releaseDate = releaseDate;
        this.duration = Song.getDurationAsString(duration);
        this.url = url;
        this.image = image;
    }

    static getDurationAsString(duration) {
        duration = duration / 1000;
        
        return isNaN(duration)? 
            "" : 
            "Duration: " + (Math.round(duration / 60)) + ':' + (Math.round(duration % 60)) 
    }
}