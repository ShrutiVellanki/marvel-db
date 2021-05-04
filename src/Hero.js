import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CharacterSearch from './CharacterSearch';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function Hero(props) {
  let classes = useStyles();

  return (
    <React.Fragment>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Marvel DB
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              paragraph
            >
              Find a full list of comic books that feature your favourite Marvel characters! 
            </Typography>
            {/* { props.type !== "book" && 
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <CharacterSearch handler={props.handler}></CharacterSearch>
                  </Grid>
                </Grid>
              </div>
            } */}
          </Container>
        </div>
    </React.Fragment>
  );
}