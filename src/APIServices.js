import crypto from 'crypto';

const API_KEY = '03055d3ccaffc072dcf43dfd001f994f';
const PRIV_KEY = 'a821f6553164ae0c8134c654e933e78acd54bf9b';
const ts = new Date().getTime();
const hash = crypto.createHash('md5').update(ts + PRIV_KEY + API_KEY).digest('hex');


export const fetchCharacters = () => {
    return fetch(`https://gateway.marvel.com/v1/public/characters?apikey=${API_KEY}&ts=${ts}&hash=${hash}`)
      .then(res => res.json())
}