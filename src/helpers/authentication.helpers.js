// @flow
import firebase from 'firebase'

const AUTHENTICATING_KEY: string = 'authenticating';

export const startAuthentication = () => sessionStorage.setItem(AUTHENTICATING_KEY, 'true');

export const completeAuthentication = () => sessionStorage.removeItem(AUTHENTICATING_KEY);

export const isAuthenticating = () => sessionStorage.getItem(AUTHENTICATING_KEY);

export const startAuthenticationListener = (callbackWhenAuthenticated: Function, callbackWhenUnauthenticated: Function) => {
  firebase.auth().onAuthStateChanged((user: Object) => user ? callbackWhenAuthenticated(user) : callbackWhenUnauthenticated());
};

export const handleAuthenticationWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  startAuthentication();

  firebase.auth().signInWithRedirect(provider);
};

export const logout = (): void => firebase.auth().signOut();
