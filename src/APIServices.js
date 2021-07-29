import crypto from 'crypto';

export class MarvelApiService {

    constructor() {
        this.API_URL = 'https://gateway.marvel.com:443/v1/public';
        this.API_KEY = '03055d3ccaffc072dcf43dfd001f994f';
        this.PRIV_KEY = 'a821f6553164ae0c8134c654e933e78acd54bf9b';
    }

    async getCharacters (offset = 0) {
        let storedCharacters = JSON.parse(localStorage.getItem('characters'));

        if (!storedCharacters) {
            storedCharacters = {};
        }

        if (!storedCharacters[offset]) {
            const characters = await this.fetchCharacters();
            storedCharacters[offset] = characters;
            localStorage.setItem('characters', JSON.stringify(storedCharacters));
            return characters;
        }

        return JSON.parse(localStorage.getItem('characters'))[offset];
    }

    async fetchCharacters (offset = 0) {
        const url = `${(this.API_URL)}/characters?${(this.hashedKey)}&limit=99&offset=${offset}`;
        const charactersReadableStream = await fetch(url);
        return await charactersReadableStream.json();
    }

    async fetchComic (comicId) {
        const url = `${(this.API_URL)}/comics/${comicId}`;
        const comicReadableStream = await fetch(url);
        return await comicReadableStream.json();
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
//
// export const fetchComicsByCharacter = (characterId) => {
//   return fetch(`http://importmarvel.com/api/characters/${characterId}`)
//       .then(res => res.body)
//       .then(body => {
//           const reader = body.getReader();
//
//           return new ReadableStream({
//             start(controller) {
//               // The following function handles each data chunk
//               function push() {
//                 // "done" is a Boolean and value a "Uint8Array"
//                 reader.read().then( ({done, value}) => {
//                   // If there is no more data to read
//                   if (done) {
//                     console.log('done', done);
//                     controller.close();
//                     return;
//                   }
//                   // Get the data and send it to the browser via the controller
//                   controller.enqueue(value);
//                   // Check chunks by logging to the console
//                   console.log(done, value);
//                   push();
//                 })
//               }
//
//               push();
//             }
//           });
//       })
//       .then(stream => {
//         // Respond with our stream
//         return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
//       })
//       .then(result => {
//         // Do things with result
//         let jsonResult = JSON.parse(result);
//         return jsonResult.data.results[0].comics.items
//       })
// }
//
