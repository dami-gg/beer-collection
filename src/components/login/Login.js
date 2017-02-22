import React, {Component} from 'react';
import firebase from 'firebase';

import {Button} from 'react-bootstrap';

class Login extends Component {
  handleAuthentication() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider)
        .catch();
  }

  render() {
    return (
        <div className="authentication">
          <Button bsStyle="success"
                  onClick={this.handleAuthentication}>
            Login
          </Button>
        </div>
    );
  }
}

export default Login;
