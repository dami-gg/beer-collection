import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from 'firebase';

import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../login/Login';
import BeerAdd from '../beer/beer-crud/BeerAdd';
import BeerEdit from '../beer/beer-crud/BeerEdit';
import BeerView from '../beer/beer-crud/BeerView';
import Collection from '../collection/Collection';

import {logUserIn, logUserOut} from '../../actions';

class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.logUserIn(user);
      }
      else {
        this.props.logUserOut();
      }
    });
  }

  handleAccess() {
    if (this.props.user) {
      return (
          <div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/beer/add" component={BeerAdd}/>
              <Route path="/beer/edit/:beerId" component={BeerEdit}/>
              <Route path="/beer/view/:beerId" component={BeerView}/>
              <Route path="/collection" component={Collection}/>
              <Route render={() => <h1>404: This page could not be found!</h1>}/>
            </Switch>
          </div>
      );
    }

    else {
      return (<Login />);
    }
  }

  render() {
    return (
        <Router>
          <div className="app">
            <Header />
            {this.handleAccess()}
          </div>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.navigation.user
});

const mapDispatchToProps = dispatch => {
  return {
    logUserIn: (user) => {
      dispatch(logUserIn(user));
    },
    logUserOut: () => {
      dispatch(logUserOut());
    }
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

