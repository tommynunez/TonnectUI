import React, { useState } from 'react';

import {
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

import { A } from 'hookrouter';
import { validateEmail } from '../../../services/helper/validator';
import { Register } from '../../../services/model/authentication';
import MailIcon from '@material-ui/icons/Mail';

const HelperText = ( label: string, fieldType: string, value: any, isError?:  boolean ) => {
  if( !isError ){
    return;
  }
  
  if( fieldType === "text" || fieldType === "password") {
      return `${ label } is required`;
  }

  if( fieldType === 'email' && !value ) {
    return `${ label } is required`;
  }else if( fieldType === 'email' && !validateEmail( value ) ) {
    return `${ label } is not an email address`;
  }
  
  return '';
}

const InputTextField = ( name: string, label: string = "", type: string = "", isRequired: boolean ) => {
  const [value, setValue] = useState("");
  const [isError, setIserrorValue] = useState( false );

  const handleOnBlur = ( event: any ) => {
    if( !event.target.value ) { 
      setIserrorValue( true );
      
    } else { 
      setIserrorValue( false ); 
    }

    if( event.target.type === "email"){
      if( !validateEmail( event.target.value ) ){
        setIserrorValue( true );
      }else{
        setIserrorValue( false );
      }
    }
  }

  const field = <TextField
                fullWidth
                variant="outlined"
                id={ `textfield-${name}` }
                label={ label }
                type={ type }
                name={ name }
                error={ isError }
                required={ isRequired }
                tabIndex={ 0 }
                helperText={ HelperText( label, type, value, isError ) }
                onBlur={( event: any ) => { handleOnBlur(event) } }
                onChange={( event: any ) => { setValue( event.target.value ); }}
              />
  return [value, field, setIserrorValue] as const;
}

export default function Registration() {
  const [emailAddressvalue, emailAddressfield, setEmailaddressError] = InputTextField( "emailAddress", "Email Address","email", true );
  const [userNameValue, userNamefield, setUsernameerror] = InputTextField("userName", "User Name", "text", true);
  const [passwordValue, passwordField, setPassworderror] = InputTextField( "password", "Password", "password", true );
  const [firstNamevalue, firstNamefield, setFirstNameerror] = InputTextField( "firstName", "First Name", "text", true );
  const [lastNamevalue, lastNamefield, setLastNameerror] = InputTextField( "lastName", "Last Name", "text", true );
  const [authResponse, setAuthResponse] = useState({ successful: false, errorMessage: '' } as  any);

  const handleSubmit = async ( event: any ) => {
    event.preventDefault();
    let isError = false;
    if( !emailAddressvalue ) {
      setEmailaddressError( true );
      isError = true;
    }
    if( !userNameValue ) {
      setUsernameerror( true );
      isError = true;
    }
    if( !passwordValue ){
      setPassworderror( true );
      isError = true;
    }
    if( !firstNamevalue ){
      setFirstNameerror( true );
      isError = true;
    }
    if( !lastNamevalue ){
      setLastNameerror( true );
      isError = true;
    }

    if ( isError ) {
      return;
    }

    //TODO:; send registration request
    const registration = new Register(firstNamevalue, lastNamevalue,
      emailAddressvalue, userNameValue, passwordValue);
    
    const response = await registration.sendRequest();

    if( response && !response.successful ) {
      setAuthResponse(( prevState: any ) => {
        return { ...prevState, 
          successful: response.successful, 
          errorMessage: response.errorMessage
        }
      });
    } else {
      setAuthResponse(( prevState: any ) => {
        return { ...prevState, 
          successful: response.successful, 
          errorMessage: ''
        }
      });
    }
  }

  return (
    <>
      <Grid container spacing={0}>
       <Grid
        item
        lg={12}
        className="d-flex align-items-center justify-content-center flex-column">
        <div className="divider-v divider-v-lg d-none d-lg-block" />
        {
          (authResponse.successful) 
          ? 
          <>
            <div className="text-center my-4">
              <MailIcon style={{'fontSize': '16em'}} fontSize="large" />
              <h5>
                You're almost there.
                Please check your email for registration confirmation.
              </h5>
            </div>
          </>
          :
          <>
            <div className="text-center mt-4">
              <h1 className="font-size-xxl mb-1 font-weight-bold">
                Create account
              </h1>
              <p className="mb-0 text-black-50">
                Welcome to Tonnect! Already have an account? {' '}
                <A href="/login" className="text-first">Log In</A>
              </p>
            </div>
            <div className="px-5 py-4">
            <form noValidate={true} autoComplete="off" onSubmit={ ( event: any ) => { handleSubmit( event ) } }>
              <Grid container spacing={2}>
                <Grid item md={6}>
                    { emailAddressfield }
                </Grid>
                <Grid item md={6}>
                    { userNamefield }
                </Grid>
                <Grid item md={12}>
                    { passwordField }
                </Grid>
                <Grid item md={6}>
                    { firstNamefield }
                </Grid>
                <Grid item md={6}>
                    { lastNamefield }
                </Grid>
              </Grid>
              <div className="text-center">
              {
                ( !authResponse.successful ) 
                  ? 
                    <Typography variant="caption" gutterBottom className="text-danger">{authResponse.errorMessage}</Typography>
                  : null
              }
              </div>
              <div className="my-4">
                By clicking the <strong>Create account</strong>{' '}
                button below you agree to our terms of service and
                privacy statement.
              </div>
              <div className="text-center mb-4">
                <Button type="submit" tabIndex={ 0 } className="btn-primary text-uppercase font-weight-bold font-size-sm my-3">
                  Create account
                </Button>
              </div>
            </form>
          </div>
          </>
          }
      </Grid>
     </Grid>
    </>
  );
}
