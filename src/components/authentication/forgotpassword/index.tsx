import React, { useState } from 'react';

import {
  Grid,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';
import {A} from 'hookrouter';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';

import { ForgotPassword } from '../../../services/model/authentication';
import { validateEmail } from '../../../services/helper/validator';

const ForgotPasswordComponent = () => {
  let [emailAddress,setEmailAddress] = useState( "" );
  let [errorType,setErrorType] = useState( "" );
  
  const handleOnChange = ( event:any ) => {
      setEmailAddress( event.target.value );
  }

  const handleSubmit = ( event: any ) => {
    event.preventDefault();
    if( !emailAddress ) {
      setErrorType( "required" );
      return;
    }

    const forgotPassword = new ForgotPassword( event.target.value );
    forgotPassword.sendRequest();
  }

  const handleEmailAddressvalidation = ( event:any ) => {
    if( !event.target.value ) { 
      setErrorType( "required" );
      return;
    }

    if( !validateEmail( event.target.value ) ) {
      setErrorType( "invalid" );
      return;
    }

    setErrorType( "" );
  }

  return (
    <>
      <Grid container spacing={0}>
        <Grid item lg={12} className="d-flex align-items-center justify-content-center flex-column">
          <form noValidate={true} autoComplete="off" onSubmit={ ( event:any ) => { handleSubmit( event ) } }>
            <div className="divider-v divider-v-lg d-none d-md-block" />
            <div className="text-center mt-4">
              <h1 className="font-size-xxl mb-1 font-weight-bold">
                Forgot Password
              </h1>
              <p className="mb-0 text-black-50">
                Fill in the fields below to confirm your email address
              </p>
            </div>
            <div className="py-4">
              <div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="textfield-emailAddress"
                    label="Email address"
                    name="emailAddress"
                    type="email"
                    tabIndex={ 0 }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineTwoToneIcon />
                        </InputAdornment>
                      )
                    }}
                    error={ ( errorType !== "" ) ? true : false }
                    onBlur={( event:any ) => { handleEmailAddressvalidation( event ) } }
                    helperText={ ( errorType ) ? `Email Address is ${errorType}` : null }
                    onChange={ ( event:any ) => { handleOnChange( event ) } }
                  />
                </div>
                <div className="text-center">
                  <A href="/login" className="text-first py-2">Return to log In</A>
                </div>
                <div className="text-center py-2">
                  <Button type="submit" tabIndex={ 0 } className="btn-primary font-weight-bold w-50 my-2">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPasswordComponent;