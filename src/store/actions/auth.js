import axios from 'axios';

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
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC3Ums_EC8s8A7alC6_2oqlaGHwPiizGdU';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC3Ums_EC8s8A7alC6_2oqlaGHwPiizGdU';
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