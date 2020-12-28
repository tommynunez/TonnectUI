import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Card, Grid} from '@material-ui/core';
import {DotLoader} from 'react-spinners';
import BlockUi from 'react-block-ui';

export default function EmailConfirmation() {
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
                Please wait while we confirm your email
            </h1>
          </div>
          <div className="py-4">
            <div>
              <div className="mb-4">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ width: '250px', height: '200px' }}>
                  <DotLoader color={'var(--primary)'} loading={true} size={150}/>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}