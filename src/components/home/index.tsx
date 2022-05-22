import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { navigate } from 'hookrouter';

const useAppBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 0
    },
    appBar: {
      marginBottom: '2em', 
      background: 'transparent' 
    },
    appBarwrapper: {
      width: '70%',
      margin: '0 auto'
    },
    appBarTitle: {
      flexGrow: 1,
      color: '#000',
      fontSize: '1.5rem'
    },
    menuButton: {
      margin: theme.spacing(2),
      fontSize: '1rem'
    },
    
  }),
);

const useContainerStyles = makeStyles((theme: Theme) =>
  createStyles({ 
    root: {
      height: '95vh'
    },
  }),
);

const HeaderBar = () => {
  const appBarclasses = useAppBarStyles();
  const containerClasses = useContainerStyles(); 

  const handleNavigation = (event:any,route:string) => {
    event.preventDefault();
    navigate(route);
  }

  return (
    <div className={appBarclasses.root}>
      <Grid container direction="column" className={containerClasses.root}>
        <Grid item>
          <AppBar position="static" className={appBarclasses.appBar} elevation={0}>
            <Toolbar className={appBarclasses.appBarwrapper}>
              <Typography variant="h6" color="textPrimary" className={appBarclasses.appBarTitle}>
                Tonnect
              </Typography>
              <Button color="primary" onClick={(event:any) => { handleNavigation(event,'/login') }} variant="contained" className={appBarclasses.menuButton}>Login</Button>
              <Button color="primary" onClick={(event: any) => { handleNavigation(event,'/registration') }} variant="contained" className={appBarclasses.menuButton}>Sign Up</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item container>
          <Grid item xs={12} md={6} lg={6}>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const Home = () => {
  return (
    <div>
      <HeaderBar />
    </div>
  );
};

export default Home;