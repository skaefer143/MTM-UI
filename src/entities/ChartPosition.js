/**
 * Data object for items in a chart
 */
export default class ChartPosition {

    constructor(position, songId, name, artist) {
        this.position = position;
        this.id = songId;
        this.name = name;
        this.artist = artist;
    }
}