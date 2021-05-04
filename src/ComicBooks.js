import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { fetchCharacters, fetchComicsByCharacter } from './APIServices'
import GenericCard from './Card';
import Footer from './Footer';
import Hero from './Hero';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function ComicBooks(props) {
  const classes = useStyles();
  const [cards, setCards] = useState(props.items);

  const { match } = props;
  const characterId = match.params.id;

  fetchComicsByCharacter(characterId).then(comics => {
    setCards(comics.data.results);
  })

  const pageChange = (event, value) => {
    const offset = (value - 1) * 99;
    fetchComicsByCharacter(characterId, 99, offset).then(comics => {
        setCards(comics.data.results);
    })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative"></AppBar>
      <main>
        <Hero type="book"></Hero>
        <Container className={classes.cardGrid} maxWidth="md">
        { cards &&
          <Grid container spacing={5}>
            {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <GenericCard card={card} type="book"></GenericCard>
                </Grid>
            ))}
              <Grid container justify="center"><Pagination count={props.total} onChange={pageChange}/></Grid>
          </Grid>
        }
        </Container>
      </main>
      <Footer></Footer>
    </React.Fragment>
  );
}