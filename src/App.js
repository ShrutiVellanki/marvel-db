import { Component } from 'react';
import {fetchCharacters} from './APIServices'
import Characters from './Characters';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetchCharacters().then(characters =>
      this.setState({
        isLoaded: true,
        items: characters,
      })
    )
  }

  render() {

    var {isLoaded, items} = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <Characters items={items}/>
      </div>
    );
  }
}

export default App;
