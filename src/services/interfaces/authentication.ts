export interface IAuthenticationContext{
    isAuthenticated: boolean,
    login: Function,
    logout: Function,
    register: Function,
    resetpassword: Function,
    forgotpassword: Function,
    emailconfirmation: Function,
    checktoken: Function
}

export interface ILogin {
    email?: string | null,
    password?: string | null
}

export interface IResetPassword{
    email?: string | null,
    token?: string | null,
    password?: string | null,
    confirmPassword?: string | null
}

export interface IRegister {
    firstname?: string | null,
    lastname?: string | null,
    username?: string | null,
    email?: string | null,
    phonenumber?: string | null,
    password?: string | null,
    confirmpassword?: string | null
}

export interface IForgotPassword {
    email: string 
}

export interface IConfirmationEmail {
    email: string,
    token: string
}