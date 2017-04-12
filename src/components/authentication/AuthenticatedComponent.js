import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import type {User} from '../../types/types';

export default function requiresAuth(OriginalComponent) {
  class AuthenticatedComponent extends Component {
    props: {
      user: User,
      match: Object,
      location: Object,
      history: Object
    };

    componentWillMount() {
      this.checkIfUnauthenticated();
    }

    componentDidUpdate() {
      this.checkIfUnauthenticated();
    }

    checkIfUnauthenticated() {
      if (!this.props.user) {
        this.redirectHome();
      }
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

  return withRouter(
      connect(mapStateToProps)(AuthenticatedComponent)
  );
}


