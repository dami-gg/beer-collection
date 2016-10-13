import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/main.scss';

import Header from './components/common/header.component';
import RouteHandler from './components/common/route-handler.component';

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

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

