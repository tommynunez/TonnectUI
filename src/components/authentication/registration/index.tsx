import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Button,
  TextField
} from '@material-ui/core';

import hero3 from '../../../assets/images/hero-bg/hero-5.jpg';
import { A } from 'hookrouter';

export default function Registration() {
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
        <div className="mb-3">
          <label className="font-weight-bold mb-2">
            Email address
          </label>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Enter your email address"
            type="email"
          />
        </div>
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <label className="font-weight-bold mb-2">
              Password
            </label>
          </div>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <Grid container spacing={6}>
          <Grid item md={6}>
            <div>
              <label className="font-weight-bold mb-2">
                First name
              </label>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Enter your first name"
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div>
              <label className="font-weight-bold mb-2">
                Last name
              </label>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Enter your last name"
              />
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
      </div>
      </Grid>
     </Grid>
    </>
  );
}
