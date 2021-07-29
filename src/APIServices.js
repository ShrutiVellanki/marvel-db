import crypto from 'crypto';

export class MarvelApiService {

    constructor() {
        this.API_URL = 'https://gateway.marvel.com:443/v1/public';
        this.API_KEY = '03055d3ccaffc072dcf43dfd001f994f';
        this.PRIV_KEY = 'a821f6553164ae0c8134c654e933e78acd54bf9b';
    }

    async getCharacters (offset = 0) {
        return await this.checkLocalStorage('characters', offset, this.fetchCharacters.bind(this));
    }

    async fetchCharacters (offset = 0) {
        const url = `${(this.API_URL)}/characters?${(this.hashedKey)}&limit=99&offset=${offset}`;
        return await this.fetchEntities(url);
    }

    async getComic (comicId) {
        return await this.checkLocalStorage('comics', comicId, this.fetchComic.bind(this));
    }

    async fetchComic (comicId) {
        const url = `${(this.API_URL)}/comics/${comicId}?${(this.hashedKey)}`;
        return await this.fetchEntities(url);
    }

    async getComicsByCharacter(characterId) {
        return await this.checkLocalStorage('comicsByCharacter', characterId, this.fetchComicsByCharacter.bind(this));
    }

    async fetchComicsByCharacter(characterId) {
        const url = `${(this.API_URL)}/characters/${characterId}?${(this.hashedKey)}`;
        return await this.fetchEntities(url);
    }

    async checkLocalStorage(key, id, fetchFunction) {
        let entities = JSON.parse(localStorage.getItem(key));

        if (!entities) {
            entities = {};
        }

        if (!entities[id]) {
            const entity = await fetchFunction();
            entities[id] = entity;
            localStorage.setItem(key , JSON.stringify(entities));
            return entity;
        }

        return entities[id];
    }

    async fetchEntities(url) {
        const readableStream = await fetch(url);
        return await readableStream.json();
    }

    get hashedKey () {
        const ts = new Date().getTime();
        const md5Hash = crypto.createHash('md5');
        const updatedHash = md5Hash.update(ts + this.PRIV_KEY + this.API_KEY)
        const hash = updatedHash.digest('hex');
        return `ts=${ts}&apikey=${this.API_KEY}&hash=${hash}`;
    }
}

// // export const fetchCharacterByName = (name, limit=99, offset=0) => {
// //   return fetch(`http://importmarvel.com/api/characters?nameStartsWith=${name}limit=${limit}&offset=${offset}`)
// //       .then(res => res.json())
// // }
