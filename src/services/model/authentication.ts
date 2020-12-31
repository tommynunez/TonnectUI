import {ILogin, IForgotPassword, IConfirmationEmail, IRegister, IResetPassword} from '../interfaces/authentication';
import axios from 'axios';
import _ from 'lodash';
import { navigate } from 'hookrouter';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44388/api/Authenticate',
    timeout: 1000
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

    sendRequest() {
        axiosInstance.post('/login', {
            email: this.email,
            passowrd: this.password
        }).then((response: any) => {
            console.log(response);
            if(response){

            }

            //set login action
            this.reducerAction({type: 'LOGIN'});
        }).catch((error: any) => {
            console.log(error);
        });
    }
}

export class ForgotPassword implements IForgotPassword {
    email: string = "";

    constructor(email: string){
        this.email = email
    }

    sendRequest() {
        axiosInstance.post('/forgot/password', {
            email: this.email
        }).then((response: any) => {

        }).catch((error: any) => {
            console.log(error);
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

    sendRequest(){
        axiosInstance.post('email/confirmation', {
            email: this.email,
            token: this.token
        }).then((response: any) => {
            if(response.status === 200){
                navigate('/dashboard');
            }else{
                //TODO: return error message
            }
        }).catch((error: any) => {
            console.log(error);
        })
    }
}

export class Register implements IRegister {
    firstname?: string | null;
    lastname?: string | null;
    username?: string | null;
    email?: string | null;
    phonenumber?: string | null;
    password?: string | null;
    confirmpassword?: string | null;
    
    constructor(firstname?: string | null, lastname?: string | null, username?: string | null, email?:string | null,
        phonenumber?:string | null, password?: string | null, confirmpassword?: string | null)
    {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.password = password;
        this.confirmpassword = confirmpassword;
    }

    sendRequest(){
        axiosInstance.post('/register', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phonenumber: this.phonenumber,
            password: this.password,
            confirmpassword: this.confirmpassword
        }).then((response: any) => {

        }).catch((error: any) => {
            console.log(error);
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