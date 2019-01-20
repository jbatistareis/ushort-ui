export class ShortenedUrl {
    constructor(
        public fullUrl: string,
        public expires: string,
        public shortUrl: string
    ) { }
}