import React, { useState } from 'react';

import {
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import { A } from 'hookrouter';
import { validateEmail } from '../../../services/helper/validator';

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
                error={ isError }
                required={ isRequired }
                helperText={ HelperText( label, type, value, isError ) }
                onBlur={( event: any ) => { handleOnBlur(event) } }
                onChange={( event: any ) => { setValue( event.target.value ); }}
              />
  return [value, field];
}

export default function Registration() {
  const [emailAddressvalue, emailAddressfield] = InputTextField( "emailAddress", "Email Address","email", true );
  const [passwordValue, passwordField] = InputTextField( "password", "Password", "password", true );
  const [firstNamevalue, firstNamefield] = InputTextField( "firstName", "First Name", "text", true );
  const [lastNamevalue, lastNamefield] = InputTextField( "lastName", "Last Name", "text", true );

  const handleSubmit = ( event: any ) => {
    event.preventDefault();
  }

  return (
    <>
      <Grid container spacing={0}>
       <Grid
        item
         lg={12}
        className="d-flex align-items-center justify-content-center flex-column">
        <div className="divider-v divider-v-lg d-none d-lg-block" />
        <div className="text-center mt-4">
          <h1 className="font-size-xxl mb-1 font-weight-bold">
            Create account
          </h1>
          <p className="mb-0 text-black-50">
            Start benefiting from our tools right away! Already have an account? {' '}
            <A href="/login" className="text-first">Log In</A>
          </p>
        </div>
        <div className="px-5 py-4">
          <form noValidate={true} autoComplete="off" onSubmit={ ( event: any ) => { handleSubmit( event ) } }>
            <div className="mb-3">
              { emailAddressfield }
            </div>
            <div className="mb-3">
              { passwordField }
            </div>
            <Grid container spacing={6}>
              <Grid item md={6}>
                <div>
                  { firstNamefield }
                </div>
              </Grid>
              <Grid item md={6}>
                <div>
                  { lastNamefield }
                </div>
              </Grid>
            </Grid>
            <div className="my-4">
              By clicking the <strong>Create account</strong>{' '}
              button below you agree to our terms of service and
              privacy statement.
            </div>
            <div className="text-center mb-4">
              <Button className="btn-primary text-uppercase font-weight-bold font-size-sm my-3">
                Create account
              </Button>
            </div>
          </form>
        </div>
      </Grid>
     </Grid>
    </>
  );
}
