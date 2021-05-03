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
    fetchCharacters().then(characters =>{
        this.setState({
          isLoaded: true,
          items: characters.data.results,
          total: characters.data.total
        })
      }
    )
  }

  render() {

    let {isLoaded, items, total} = this.state;
    total = Math.ceil(total / 99);

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <Characters items={items} total={total}/>
      </div>
    );
  }
}

export default App;
