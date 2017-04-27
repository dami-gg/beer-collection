import {eventChannel} from 'redux-saga';
import firebase from 'firebase';
import {AUTHENTICATING_KEY} from '../constants'

export const findItemInCollectionById = (id: string, collection) =>
    collection.find(element => element.id === id);

export const startAuthentication = () => sessionStorage.setItem(AUTHENTICATING_KEY, true);

export const completeAuthentication = () => sessionStorage.removeItem(AUTHENTICATING_KEY);

export const isAuthenticating = () => sessionStorage.getItem(AUTHENTICATING_KEY);

export const createEventChannel = (table, propertyToOrderBy, eventName) => {
  const listener = eventChannel(
      emit => {
        firebase.database().ref(table).orderByChild(propertyToOrderBy)
            .on(eventName, snapshot => emit(snapshot.val()));

        return () => firebase.database().ref(table).off(listener);
      }
  );

  return listener;
};
