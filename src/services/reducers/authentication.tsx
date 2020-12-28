import {IAuthenticationContext} from '../interfaces/authentication';

export const authenticationReducer = (state: IAuthenticationContext, action: any) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false
            };
        case 'RESET_PASSWORD':
            return {
                ...state
            };
        case 'FORGOT_PASSWORD':
            return {
                ...state
            };
        case 'EMAIL_CONFIRMATION':
            return {
                ...state
            };
        case 'REGISTER':
            return {
                ...state
            };
        case 'AUTHENTICATION_TRUE':
            return {
                ...state,
                isAuthenticated: true
            };
        default: 
            return state;
    }
};