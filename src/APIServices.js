import crypto from 'crypto';

const API_KEY = '03055d3ccaffc072dcf43dfd001f994f';
const PRIV_KEY = 'a821f6553164ae0c8134c654e933e78acd54bf9b';

// const API_KEY = '045ceddfe818520a9f7b14075ca75119';
// const PRIV_KEY = '9a70dfb3d99c05519aa249e258cdcdc59d2907ff';

const ts = new Date().getTime();
const hash = crypto.createHash('md5').update(ts + PRIV_KEY + API_KEY).digest('hex');

export const fetchCharacters = (limit=99, offset=0) => {
    return fetch(`http://importmarvel.com/api/characters?limit=${limit}&offset=${offset}`).then(res => res.json())
}

export const fetchComic = (comicId) => {
    return fetch(`http://importmarvel.com/api/comics/${comicId}`).then(res => res.json())
}

// export const fetchCharacterByName = (name, limit=99, offset=0) => {
//   return fetch(`http://importmarvel.com/api/characters?nameStartsWith=${name}limit=${limit}&offset=${offset}`)
//       .then(res => res.json())
// }

export const fetchComicsByCharacter = (characterId) => {
  return fetch(`http://importmarvel.com/api/characters/${characterId}`)
      .then(res => res.body)
      .then(body => {
          const reader = body.getReader();

          return new ReadableStream({
            start(controller) {
              // The following function handles each data chunk
              function push() {
                // "done" is a Boolean and value a "Uint8Array"
                reader.read().then( ({done, value}) => {
                  // If there is no more data to read
                  if (done) {
                    console.log('done', done);
                    controller.close();
                    return;
                  }
                  // Get the data and send it to the browser via the controller
                  controller.enqueue(value);
                  // Check chunks by logging to the console
                  console.log(done, value);
                  push();
                })
              }
        
              push();
            }
          });
      })
      .then(stream => {
        // Respond with our stream
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {
        // Do things with result
        let jsonResult = JSON.parse(result);
        return jsonResult.data.results[0].comics.items
      })
}

