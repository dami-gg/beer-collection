import React, {Component} from 'react';

import Header from '../common/header.component';
import RouteHandler from '../common/route-handler.component';

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
