import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { fetchCharacters } from './APIServices'
import CharacterCard from './Card';
import Footer from './Footer';


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

export default function Characters(props) {
  const classes = useStyles();
  const [cards, setCards] = useState(props.items);

  const pageChange = (event, value) => {
    const offset = (value - 1) * 99;
    fetchCharacters(99, offset).then(characters => {
      console.log(characters);
      setCards(characters.data.results);
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative"></AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Marvel Character Wiki
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              View your favourite characters by wikipedia
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    View All Characters
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          
          
          <Grid container spacing={5}>
            {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <CharacterCard card={card}></CharacterCard>
                </Grid>
            ))}
              <Grid container justify="center"><Pagination count={props.total} onChange={pageChange}/></Grid>
          </Grid>

        </Container>
      </main>
      <Footer></Footer>
    </React.Fragment>
  );
}