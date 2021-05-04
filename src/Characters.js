import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { fetchCharacters } from './APIServices'
import GenericCard from './Card';
import Footer from './Footer';
import Hero from './Hero';
import LoadingPage from './Loading';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Characters(props) {
  const classes = useStyles();
  const [cards, setCards] = useState();
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    fetchCharacters().then(characters =>{
      setCards(characters.data.results);
      setTotal(characters.data.total);
    });
  }, [])  

  const pageChange = (event, value) => {
    setCards([]);
    const offset = (value - 1) * 99;
    fetchCharacters(99, offset).then(characters => {
      setCards(characters.data.results);
    })
    setCurrentPage(value);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative"></AppBar>
      {!cards || cards.length === 0 &&
        <LoadingPage></LoadingPage>
      }
      {cards && cards.length > 0 &&
        <main>
          <Hero></Hero>
          <Container className={classes.cardGrid} maxWidth="md">
            { cards &&
              <Grid container spacing={5}>
                { cards.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                      <GenericCard card={card}></GenericCard>
                    </Grid>
                ))}
                  <Grid container justify="center"><Pagination defaultPage={currentPage} count={16} onChange={pageChange}/></Grid>
              </Grid>
            }
          </Container>
          <Footer></Footer>
        </main> 
      }     
    </React.Fragment>
  );
}