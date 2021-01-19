import {ILogin, IForgotPassword, IConfirmationEmail, IRegister, IResetPassword} from '../interfaces/authentication';
import axios from 'axios';
import _ from 'lodash';
import { navigate } from 'hookrouter';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44388/api/Authenticate',
    timeout: 10000
});

export class Login implements ILogin {
    email?: string | null;
    password?: string| null;
    reducerAction?: any;

    constructor(email?: string| null, password?: string | null, reducerAction?: any){
        this.email = _.isNull(email) ? "" : email;
        this.password = _.isNull(password) ? "" : password;
        this.reducerAction = reducerAction;
    }

    sendRequest = async () : Promise<any> => {
        return await axiosInstance.post('/login', {
            email: this.email,
            password: this.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response: any) => {
            if( response.status === 200 ) {
                if( response.data.errorMessage ) {
                    if( response.data.errorMessage === "Account is locked out" ) {
                        return { successful: false, errorMessage: response.data.errorMessage };
                    } else if( response.data.errorMessage === "Email is not confirmed" ) {
                        return { successful: false, errorMessage: response.data.errorMessage };
                    } else if( response.data.errorMessage === "Incorrect username or password" ) {
                        return { successful: false, errorMessage: response.data.errorMessage };
                    }
                }
                navigate('/dashboard');
            }
        }).catch((error: any) => {
            if( !error.response ) {
                return { successful: false, errorMessage: "You're request failed. Please try again!" };
            }
        });
    }
}

export class ForgotPassword implements IForgotPassword {
    email: string = "";

    constructor(email: string){
        this.email = email
    }

    sendRequest = async () : Promise<any> =>  {
        return await axiosInstance.post('/forgot/password', {
            email: this.email
        }).then((response: any) => {
            if( response.status === 200 ) {
                if( response.data.errorMessage === "Reset your password" ) {
                    return { successful: true, errorMessage: response.data.errorMessage };
                }
                else if( response.data.errorMessage === "Confirm your email address" ) {
                    return { successful: true, errorMessage: response.data.errorMessage };
                } else { 
                    return { successful: true };
                }
            }
        }).catch((error: any) => {
            if( !error.response ) {
                return { successful: false, errorMessage: "You're request failed. Please try again!" };
            }
        });
    }
}

export class ConfirmationEmail implements IConfirmationEmail {
    email: string = "";
    token: string = "";

    constructor(email: string, token: string){
        this.email = email;
        this.token = token;
    }

    sendRequest = async () : Promise<any> => {
        return await axiosInstance.get(`email/confirmation?token=${this.email}&email=${this.token}`).then((response: any) => {
            if(response.status === 200) {
                navigate('/dashboard');
                return { successful: true };
            }
        }).catch((error: any) => {
            if(error.response.data.status === 400) {
                return { successful: false, errorMesage: error.response.data.errorMessage };
            }
            if(error.response.data.status === 419) {
                return { successful: false, errorMessage: error.response.data.errorMessage };
            }
        });
    }
}

export class Register implements IRegister {
    firstname?: string | null;
    lastname?: string | null;
    email?: string | null;
    username?: string | null;
    password?: string | null;
    
    constructor(firstname?: string | null, lastname?: string | null, email?:string | null, username?: string | null,
         password?: string | null)
    {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    sendRequest = async () : Promise<any>  => {
        return await axiosInstance.post('/register', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            username: this.username,
            password: this.password
        }).then((response: any) => {
            if( response.status === 201 ) {
                return { successful: true };
            }
            if( response.status === 302 ) {
                return { successful: false, errorMessage: response.data.errorMessage }; 
            }
        }).catch((error: any) => {
            if( error.response && error.response.status === 400 ) {
                return { successful: false, errorMessage: error.response.data.errorMessage };
            }else {
                return { successful: false, errorMessage: "You're request failed. Please try again!" };
            }
        });
    }
}

export class ResetPassword implements IResetPassword {
    email?: string | null;
    token?: string  | null;
    password?: string | null;
    confirmPassword?: string | null;

    constructor(email?: string | null, token?: string | null, password?: string | null, confirmPassword?: string | null){
        this.email = email;
        this.token = token;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    sendRequest(){
        axiosInstance.post('/reset/password',{
            email: this.email,
            token: this.token,
            password: this.password,
            confirmpassword: this.confirmPassword
        }).then((response: any) => {
            
        }).catch((error: any) => {
            console.log(error);
        });
    }
}