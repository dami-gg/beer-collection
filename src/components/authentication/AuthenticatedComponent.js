import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import firebase from 'firebase'

import type {User} from '../../types/types';
import {logUserOut} from '../../actions';

export default function requiresAuth(OriginalComponent) {
  class AuthenticatedComponent extends Component {
    props: {
      user: User,
      logUserOut: Function,
      match: Object,
      location: Object,
      history: Object
    };

    componentWillMount() {
      this.checkIfUnauthenticated();
    }

    componentDidMount() {
      this.startAuthenticationListener();
    }

    checkIfUnauthenticated() {
      if (!this.props.user) {
        this.redirectHome();
      }
    }

    startAuthenticationListener() {
      firebase.auth().onAuthStateChanged(user => (!user) ? this.logout() : null);
    }

    logout() {
      this.props.logUserOut();
      this.redirectHome();
    }

    redirectHome() {
      this.props.history.push('/login');
    }

    render() {
      return (
          <div>
            {this.props.user && <OriginalComponent {...this.props} />}
          </div>
      );
    }
  }

  const mapStateToProps = state => ({
    user: state.navigation.user
  });

  const mapDispatchToProps = dispatch => {
    return {
      logUserOut: () => {
        dispatch(logUserOut());
      }
    }
  };

  return withRouter(connect(
      mapStateToProps,
      mapDispatchToProps
  )(AuthenticatedComponent));
}


