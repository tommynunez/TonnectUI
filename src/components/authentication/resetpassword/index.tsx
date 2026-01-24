import React, { useState } from 'react';

import {
  Grid,
  InputAdornment,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { getQueryParams } from 'hookrouter';

import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { ResetPassword } from '../../../services/model/authentication';


const InputTextField = (name: string, label: string, type: string, icon: any) => {
  const [value, setValue] = useState("");
  const [isError, setIserror] = useState(false);

  const handleOnBlur = (event: any) => {
    const val = event.target.value;

    if (!val) {
      setIserror(true);
      return;
    }

    setIserror(false);
  }

  const inputField = <TextField
    fullWidth
    variant="outlined"
    id={`textfield-${name}`}
    name={name}
    label={label}
    value={value}
    type={type}
    onChange={(event: any) => { setValue(event.target.value) }}
    error={isError}
    tabIndex={0}
    onBlur={(event: any) => { handleOnBlur(event) }}
    helperText={(isError) ? `${label} is required` : null}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {icon}
        </InputAdornment>
      )
    }}
  />
  return [value, inputField, setIserror] as const;
}

const ResetPasswordComponent = () => {
  const [passwordValue, passwordField, setPasswordError] = InputTextField("password", "Password", "password", <LockTwoToneIcon />);
  const [confirmPasswordValue, confirmPasswordfield, setConfirmpasswordError] = InputTextField("confirmPassword", "Confirm Password", "password", <LockTwoToneIcon />);
  const [doespasswordMatch, setDoespasswordMath] = useState(true);
  const [missingQueryParams, setMissingqueryParams] = useState(false);

  const handleValidation = () => {
    let isError = false;
    if (!passwordValue) {
      setPasswordError(true);
      isError = true;
    } else {
      setPasswordError(false);
    }

    if (!confirmPasswordValue) {
      setConfirmpasswordError(true);
      isError = true;
    } else {
      setConfirmpasswordError(false);
    }

    if (passwordValue !== confirmPasswordValue) {
      setDoespasswordMath(false);
      isError = true;
    }
    return isError;
  }

  const handleOnSubmit = (event: any) => {
    event.preventDefault();

    if (handleValidation()) return;

    const queryParam = getQueryParams();

    if (!queryParam.email || !queryParam.token) {
      setMissingqueryParams(true);
      return;
    }

    const resetPassword = new ResetPassword(queryParam.email, queryParam.token, passwordValue.toString(), confirmPasswordValue.toString());
    resetPassword.sendRequest();
  }

  return (
    <>
      <Grid container spacing={0}>
        <Grid item lg={12} className="d-flex align-items-center justify-content-center flex-column">
          <div className="divider-v divider-v-lg d-none d-md-block" />
          <div className="text-center mt-4">
            <h1 className="font-size-xxl mb-1 font-weight-bold">
              Reset Password
            </h1>
            <p className="mb-0 text-black-50">
              Fill in the fields below to reset your password
            </p>
          </div>
          <div className="py-4">
            <form noValidate={true} autoComplete="off" onSubmit={(event: any) => { handleOnSubmit(event) }}>
              <div className="mb-4">
                {passwordField}
              </div>
              <div className="mb-4">
                {confirmPasswordfield}
              </div>
              <div className="mb-1 text-center">
                {(!doespasswordMatch)
                  ? <Typography variant="caption" gutterBottom className="text-danger">
                    Password does not match!
                  </Typography>
                  : null
                }
                {
                  (missingQueryParams)
                    ? <Typography variant="caption" display="inline" className="text-danger">
                      Opp!  Please click the link <br /> in your email and try again.
                    </Typography>
                    : null
                }
              </div>
              <div className="text-center py-1">
                <Button type="submit" tabIndex={0} className="btn-primary font-weight-bold w-50 my-2">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default ResetPasswordComponent;