import React, {Component} from 'react';
import './App.scss';

import Header from './components/common/HeaderComponent';
import RouteHandler from './components/common/RouteHandler';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header />
          <RouteHandler />
        </div>
    );
  }
}

export default App;
