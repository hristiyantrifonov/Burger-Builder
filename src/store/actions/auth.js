import axios from 'axios';

import { config } from '../../config';
import * as actionTypes from './actionTypes';

export const authStart = () => {
      return {
          type: actionTypes.AUTH_START
      }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    // Clearing the local storage details upon logging out
    // otherwise it can cause problems
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

// The one holding the async code
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        };
        //This depends on whether we want to login(signing in) or create new account(signing up)
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + config.MY_FIREBASE_KEY;
        console.log(url);
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + config.MY_FIREBASE_KEY;
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response); //Here we use Firebase's object props

                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                // Local storage is in-built into JS and could be used for persistent storage
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};


// Utility function to keep the state if the user has valid token
// and log him out otherwise (plus it updates the timeout)
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        // Persistent storage logic
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId)),
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000));
            }else{
                dispatch(logout());
            }
        }
    };
};