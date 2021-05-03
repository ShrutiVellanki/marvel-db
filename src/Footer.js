import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Shruti Vellanki
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>      
      {/* Footer */}
      <footer className={classes.footer}>
        {/* <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained">
                Back To Top
              </Button><br></br>
            </Grid>
          </Grid>
        </div> */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}