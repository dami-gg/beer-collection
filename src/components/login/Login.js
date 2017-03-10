import React, {Component} from 'react';
import firebase from 'firebase';

import './login.scss';

class Login extends Component {
  handleAuthentication() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider)
        .catch();
  }

  render() {
    return (
        <div className="login">
          <div className="col-md-12 login__wrapper">
            <div className="login__box">
              <p className="form-title">Please sign in</p>

              <form className="login__form">
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <input type="submit" value="Sign in"
                       className="btn btn-success btn--sign-in"/>
              </form>

              <div className="btn btn-primary"
                   onClick={this.handleAuthentication}>
                Sign in with Google
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;
