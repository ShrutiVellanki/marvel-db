import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { fetchCharacters } from './APIServices'
import CharacterCard from './Card';
import Footer from './Footer';
import Hero from './Hero';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Characters(props) {
  const classes = useStyles();
  const [cards, setCards] = useState(props.items);

  const pageChange = (event, value) => {
    const offset = (value - 1) * 99;
    fetchCharacters(99, offset).then(characters => {
      setCards(characters.data.results);
    })
  }

  const charactersByName = (name) => {
    console.log(name);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative"></AppBar>
      <main>
        <Hero handler={charactersByName}></Hero>
        <Container className={classes.cardGrid} maxWidth="md">
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