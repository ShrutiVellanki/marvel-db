import crypto from 'crypto';

const API_KEY = '03055d3ccaffc072dcf43dfd001f994f';
const PRIV_KEY = 'a821f6553164ae0c8134c654e933e78acd54bf9b';

// const API_KEY = '045ceddfe818520a9f7b14075ca75119';
// const PRIV_KEY = '9a70dfb3d99c05519aa249e258cdcdc59d2907ff';

const ts = new Date().getTime();
const hash = crypto.createHash('md5').update(ts + PRIV_KEY + API_KEY).digest('hex');

export const fetchCharacters = (limit=99, offset=0) => {
    return fetch(`https://gateway.marvel.com/v1/public/characters?apikey=${API_KEY}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}`)
      .then(res => res.json())
}

export const fetchCharacterByName = (name, limit=99, offset=0) => {
  return fetch(`https://gateway.marvel.com:/v1/public/characters?nameStartsWith=${name}&apikey=${API_KEY}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}`)
      .then(res => res.json())
}

export const fetchComicsByCharacter = (characterId, limit=99, offset=0) => {
  return fetch(`https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${API_KEY}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}`)
      .then(res => res.json())
}

