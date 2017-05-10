const AUTHENTICATING_KEY: string = 'authenticating';

export const startAuthentication = () => sessionStorage.setItem(AUTHENTICATING_KEY, true);

export const completeAuthentication = () => sessionStorage.removeItem(AUTHENTICATING_KEY);

export const isAuthenticating = () => sessionStorage.getItem(AUTHENTICATING_KEY);
