import React, { useState } from 'react';

import {
  Grid,
  InputAdornment,
  Button,
  TextField
} from '@material-ui/core';
import {A} from 'hookrouter';

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';

const ForgotPassword = () => {
  const [checked1, setChecked1] = useState(true);

  const handleChange1 = (event:any) => {
    setChecked1(event.target.checked);
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item lg={12} className="d-flex align-items-center justify-content-center flex-column">
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
                  id="textfield-email"
                  label="Email address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineTwoToneIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div className="text-center">
                <A href="/login" className="text-first py-2">Return to log In</A>
              </div>
              <div className="text-center py-1">
                <Button className="btn-primary font-weight-bold w-50 my-2">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPassword;