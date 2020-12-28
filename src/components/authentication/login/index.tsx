import React, { useState, useEffect } from 'react';

import {
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  TextField
} from '@material-ui/core';
import { A } from 'hookrouter';
import {Login as LoginModel} from '../../../services/model/authentication';
import Storage from '../../../services/helper/storage';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
const STORAGE_REMEMBER_ME = "rememberMe";

/**functions   */
const handleInputOnBlur = ( event: any, storage: any, isError: any, setIsError: any ) => {
  if( event.target.value ) {
    if( storage.exists( STORAGE_REMEMBER_ME ) ) {
      storage.encryptPropValue(STORAGE_REMEMBER_ME, event.target.name, event.target.value);
    }

    //if we have a value and error flag is on turn if off
    if( isError ) {
      setIsError(false);
    }
  } else {
    setIsError( true );
  }
}


/**Components */
const RememberMe = ( {emailAddress, password }: any ) => {
  const [isRememberMe, setisRememberMe] = useState( false );
  const [storage] = useState( new Storage() );
  
  useEffect(() => {
    setisRememberMe( storage.exists( STORAGE_REMEMBER_ME ) );
  }, []);

  const handleRememberMe = ( event:any ) => {
    //set checkbox to true
    setisRememberMe( event.target.checked );

    if( event.target.checked ) {
        //save credentials to localstorage
        //allowing to create a key even if object is empy we will still capture user data 
        storage.encrypt( STORAGE_REMEMBER_ME, { emailAddress, password } );
    } else {
      localStorage.removeItem( STORAGE_REMEMBER_ME );
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <FormControlLabel
        control={
          <Checkbox
            checked={ isRememberMe }
            onChange={ ( event:any ) => handleRememberMe( event ) }
            value={ isRememberMe }
            color="primary"
          />
        }
        className="font-size-md"
        label="Remember me"
      />
      <div>
        <A href="/forgotpassword" className="text-first">Forgot password</A>
      </div>
    </div>
  )
}

const HelperTextRequired = (isError: any, label: string) => {
  return (isError) ? label + " is required" : null;
}

const InputFields = (name: string, label: string, type: string = "text", icon?: any, onBlurevent?: any) => {
  const [value, setValue] = useState("");
  const [storage, setStorage] = useState(new Storage());
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    var rememberMe = localStorage.getItem( STORAGE_REMEMBER_ME );
    if( rememberMe ) {
      var propValue = storage.getDecryptPropValue( STORAGE_REMEMBER_ME, name );
      setValue(propValue);
    } 
  }, []);

  const handleOnBlur = ( event:any, storage: any, isError: any, setIsError: any ) => {
    //checks to see if onBlurEvent prop was passes to do something
    if( onBlurevent ) {
      onBlurevent( event, storage, isError, setIsError );
    }
    event.preventDefault();
  }

  const input = 
  <div className="mb-4">
    <TextField
      required={ true }
      fullWidth
      variant="outlined"
      id={ "textfield-"+ name }
      type={ type }
      label={ label }
      name={ name }
      error={ isError }
      value={ value }
      onBlur={ (event:any) => handleOnBlur( event, storage, isError, setIsError ) }
      onChange={ (event: any) => setValue( event.target.value ) }
      helperText={ HelperTextRequired( isError, label ) }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        )
      }}
    />
  </div>
  return [value,input,setIsError] as const;
}

const Form = () => {
  let [emailAddress, emailAddressInput, setEmailaddressError] = InputFields('emailAddress', 'Email Address', 'email', <MailOutlineTwoToneIcon/>, handleInputOnBlur);
  let [password, passwordInput,setPassworderror] = InputFields('password', 'Password', 'password', <LockTwoToneIcon/>, handleInputOnBlur);

  const handleSubmit = ( event: any ) => {
    event.preventDefault();
    let isError = false;

    //if email address value is empty set error flag
    if( !emailAddress ){
      setEmailaddressError( true );
      isError = true;
    }

    //if password value is empty set error flag
    if( !password ){
      setPassworderror( true );
      isError = true;
    }

    //send request if we have no errors
    if( !isError ) {
      const loginModel = new LoginModel();
      loginModel.sendRequest();
    }
  }

  return (
    <form onSubmit={(event: any) => {handleSubmit(event)}} autoComplete="off">
      <div>
        {emailAddressInput}
        {passwordInput}
        <RememberMe emailAddress={emailAddress} password={password}/>
        <div className="text-center py-4">
          <Button type="submit" className="btn-primary font-weight-bold w-50 my-2" onClick={(event: any) => {handleSubmit(event)}}>
            Sign in
          </Button>
        </div>
        <div className="text-center text-black-50 mt-3">
          Don't have an account?{' '}
          <A href="/registration" className="text-first">Sign up</A>
        </div>
      </div>
    </form>
  );
}

export default function Login() {
  return (
    <>
        <Grid container spacing={0}>
          <Grid
            item
            lg={12}
            className="d-flex align-items-center justify-content-center flex-column">
            <div className="divider-v divider-v-lg d-none d-md-block" />
            <div className="text-center mt-4">
              <h1 className="font-size-xxl mb-1 font-weight-bold">
                Login
              </h1>
              <p className="mb-0 text-black-50">
                Fill in the fields below to login to your account
              </p>
            </div>
            <div className="py-4">
              <Form/>
            </div>
          </Grid>        
        </Grid>
    </>
  );
}
