import React, { useEffect, useState } from 'react';

import {Grid} from '@material-ui/core';
import {DotLoader} from 'react-spinners';
import { getQueryParams } from 'hookrouter';
import { ConfirmationEmail } from '../../../services/model/authentication';
import ErrorIcon from '@material-ui/icons/Error';

export default function EmailConfirmation() {
  const [errorType, setErrortype] = useState(0);

  useEffect(() => {
    const queryParam = getQueryParams();

    if( queryParam.token && queryParam.email ) {
      //TODO:: handle request error correctly
      const confirmationEmail = new ConfirmationEmail( queryParam.token, queryParam.email );
      confirmationEmail.sendRequest();
    } else{
      setErrortype( 404 );
    }
  },[]);

  const handleErrortype = ( errorType: number ) => {
    if(errorType === 0) {
      return( <>Please wait while we confirm your email</> )
    } else if( errorType === 404 ) {
      return( <>An error has occured please try again!</> )
    }
  }

  return (
    <>
      <Grid container spacing={0}>
        <Grid item lg={12} className="d-flex align-items-center justify-content-center flex-column">
          <div className="divider-v divider-v-lg d-none d-md-block" />
          <div className="text-center mt-4">
            <h1 className="font-size-xxl mb-1 font-weight-bold">
              { handleErrortype( errorType ) }
            </h1>
          </div>
          <div className="py-4">
            <div>
              <div className="mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ width: '250px', height: '200px' }}>
                    {
                      (errorType === 0) 
                      ? <DotLoader color={'var(--primary)'} loading={(true)} size={150}/>
                      : <ErrorIcon style={{fontSize:150}} color='error'/>
                    }
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}