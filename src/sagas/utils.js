import {eventChannel} from 'redux-saga';
import firebase from 'firebase';

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
