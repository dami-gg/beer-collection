import React, {Component} from 'react';

import Header from '../common/Header';
import RouteHandler from '../common/RouteHandler';

class App extends Component {
  render() {
    return (
        <div className="app">
          <Header />
          <RouteHandler />
        </div>
    );
  }
}

export default App;
