import React, {createContext, useReducer} from 'react';
import { IAuthenticationContext } from '../services/interfaces/authentication';
import { authenticationReducer } from '../services/reducers/authentication';
import { Login, Register, ResetPassword, ForgotPassword, ConfirmationEmail } from '../services/model/authentication';

const initialAuthenticationState: IAuthenticationContext = {
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    register: () => {},
    resetpassword: () => {},
    forgotpassword: () => {},
    emailconfirmation: () => {},
    checktoken: () => {}
}

export const AuthenticationContext = createContext(initialAuthenticationState);

export const AuthenticationProvider = (props: any) => {
    const [action, dispatch] = useReducer(authenticationReducer, initialAuthenticationState);

    const login = (email: string, password: string) => {
        const login = new Login(email, password, dispatch);
        login.sendRequest();
    };

    const logout = () => {
        //remove token
        localStorage.removeItem('token');
        //set logout
        dispatch({type: 'LOGOUT'});
    };

    const register = (firstname: string, lastname: string,
        email: string, password:string) => 
    {
        const register = new Register(firstname, lastname, email, password);
        register.sendRequest();
    };

    const resetpassword = (email: string, token: string, password: string, confirmPassword: string) => {
        const resetpassword = new ResetPassword(email, token, password, confirmPassword);
        resetpassword.sendRequest();
    };

    const forgotpassword = (email: string) => {
        const forgotpassword = new ForgotPassword(email);
        forgotpassword.sendRequest();
    };

    const emailconfirmation = (email: string, token: string) => {
        const emailconfirmation = new ConfirmationEmail(email, token);
        emailconfirmation.sendRequest();
    };

    const checktoken = () => {
        const token = localStorage.getItem("token");
        const isAuthenticated = (!token && token!.length > 0 ) ? true : false;
        if(isAuthenticated){
            dispatch({type: 'AUTHENTICATION_TRUE'});
        }
        return isAuthenticated;
    }

    return (
       <AuthenticationContext.Provider value={{
           ...action,
           login: login, 
           logout: logout,
           register: register,
           resetpassword: resetpassword,
           forgotpassword: forgotpassword,
           emailconfirmation: emailconfirmation,
           checktoken: checktoken
        }}>
           {props.children}
       </AuthenticationContext.Provider> 
    );
}

export const AuthenticationContextConsumer = AuthenticationContext.Consumer; 