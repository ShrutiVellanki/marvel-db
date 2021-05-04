import { Component } from 'react';
import {fetchCharacters} from './APIServices'
import Characters from './Characters';
import ComicBooks from './ComicBooks';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import ErrorPage from './404';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  render() {
    return (
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/:id/books" render={(props) => {
            return (<ComicBooks {...props}/>)
          }}>            
          </Route>
          <Route exact path="/characters">
            <Characters/>
          </Route>
          <Route exact path="/">
            <Characters/>
          </Route>
          <Route path="*">
            <ErrorPage/>
          </Route>
        </Switch>
    </Router>
    );
  }
}

export default App;
