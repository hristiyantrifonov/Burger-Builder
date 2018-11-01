import axios from 'axios';

import { config } from '../../config';
import * as actionTypes from './actionTypes';

export const authStart = () => {
      return {
          type: actionTypes.AUTH_START
      }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
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
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    };
};