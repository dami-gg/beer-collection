// @flow
import { eventChannel } from "redux-saga";
import firebase from "firebase";

export const createEventChannel = (
  table: string,
  propertyToOrderBy: string,
  eventName: string
) => {
  const listener = eventChannel(emit => {
    firebase
      .database()
      .ref(table)
      .orderByChild(propertyToOrderBy)
      .on(eventName, snapshot => emit(snapshot.val()));

    return () => firebase.database().ref(table).off(listener);
  });

  return listener;
};
