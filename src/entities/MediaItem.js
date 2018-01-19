/**
 * Data object for media item
 */
export default class MediaItem {

    constructor(url, title, thumbnail) {
        this.url = url;
        this.title = title;
        this.thumbnail = thumbnail;

        if (url.endsWith("jpg") || url.endsWith("png")) {
            this.type = "image";
        } else {
            this.type = "video";
        }
    }
}