import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { navigate } from 'hookrouter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const HeaderBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tonnect
          </Typography>
          <Button color="inherit" onClick={() => navigate('/registration')} className="mx-2">Sign Up</Button>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Home = () => (
    <HeaderBar />
);

export default Home;