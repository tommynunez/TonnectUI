import React, { useState } from 'react';

import {
  Grid,
  InputAdornment,
  Button,
  TextField,
  CircularProgress,
  Typography
} from '@material-ui/core';
import {A} from 'hookrouter';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';

import { ForgotPassword } from '../../../services/model/authentication';
import { validateEmail } from '../../../services/helper/validator';

import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
      textAlign: 'center'
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

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

const ForgotPasswordComponent = () => {
  const [emailAddressvalue, emailAddressfield, setEmailaddressError] = InputTextField( "emailAddress", "Email Address","email", true );
  const classes = useStyles();
  let [errorType,setErrorType] = useState( "" );
  let [loading, setLoading] = useState( false );
  const [authResponse, setAuthResponse] = useState({ successful: false, errorMessage: '' } as  any);
  const timer = React.useRef<number>();

  const handleSubmit = async ( event: any ) => {
    event.preventDefault();

    let isError = false;
    if( !emailAddressvalue ) {
      setErrorType( "required" );
      isError = true;
    }

    if ( isError ) {
      return;
    }

    const forgotPassword = new ForgotPassword( emailAddressvalue );
    setLoading( true );
    const response = await forgotPassword.sendRequest();

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
    
    timer.current = window.setTimeout(() => {
      setLoading( false );
    },2000);
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
        {
          (authResponse.successful) 
          ? 
          <>
            <div className="text-center my-4">
              <MailIcon style={{'fontSize': '16em'}} fontSize="large" />
              <h5>
                You're almost there.
                Please check your email.
              </h5>
            </div>
          </>
          :
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
                  { emailAddressfield }
                </div>
                <div className="text-center">
                  <A href="/login" className="text-first py-2">Return to log In</A>
                </div>
                <div className="text-center">
                {
                  ( !authResponse.successful ) 
                    ? 
                      <Typography variant="caption" gutterBottom className="text-danger">{authResponse.errorMessage}</Typography>
                    : null
                }
                </div>
                <div className={classes.wrapper}>
                  <Button 
                    type="submit" 
                    tabIndex={ 0 } 
                    className="btn-primary font-weight-bold w-50 my-2"
                    disabled={ loading }
                  >
                    Submit
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
                </div>
              </div>
            </div>
          </form>
        }
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPasswordComponent;