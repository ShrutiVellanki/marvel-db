import { Component } from 'react';
import crypto from 'crypto';
import Album from './Album';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    const API_KEY = '03055d3ccaffc072dcf43dfd001f994f';
    const PRIV_KEY = 'a821f6553164ae0c8134c654e933e78acd54bf9b';
    const ts = new Date().getTime();
    const hash = crypto.createHash('md5').update(ts + PRIV_KEY + API_KEY).digest('hex');
    fetch(`https://gateway.marvel.com/v1/public/characters?apikey=${API_KEY}&ts=${ts}&hash=${hash}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
        console.log(json);
      })
  }

  render() {

    var {isLoaded, items} = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <Album items={items}/>
      </div>
    );
  }
}

export default App;
