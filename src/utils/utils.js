import {AUTHENTICATING_KEY} from '../constants'

export const findItemInCollectionById = (id: string, collection) =>
    collection.find(element => element.id === id);

export const startAuthentication = () => sessionStorage.setItem(AUTHENTICATING_KEY, true);

export const completeAuthentication = () => sessionStorage.removeItem(AUTHENTICATING_KEY);

export const isAuthenticating = () => sessionStorage.getItem(AUTHENTICATING_KEY);

