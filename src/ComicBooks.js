import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MarvelApiService } from './APIServices'
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

export default function ComicBooks(props) {
  const classes = useStyles();
  const [cards, setCards] = useState();

  const { match } = props;
  const characterId = match.params.id;
  const service = new MarvelApiService();

  useEffect(() => {
    service.fetchComicsByCharacter(characterId).then(comics => {
      let comicIds = comics.map(comic => {
        let uri = comic.resourceURI;
        let id = uri.split("/").slice(-1)[0];
        return parseInt(id);
      });

      let items = [];
      comicIds.forEach(comicId => {
        return service.getComic(comicId).then(item => {
           items.push(item.data.results[0]);
           if (comicIds.indexOf(comicId) === comicIds.length - 1) {
             console.log(items);
            setCards(items);
           }
        });
      })
    })
  }, [])  

  // const pageChange = (event, value) => {
  //   const offset = (value - 1) * 99;
  //   fetchComicsByCharacter(characterId, 99, offset).then(comics => {
  //       setCards(comics.data.results);
  //   })
  // }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative"></AppBar>
      {!cards || cards.length === 0 &&
        <LoadingPage></LoadingPage>
      }
      {cards && cards.length > 0 &&
      <main>
        <Hero type="book" character=""></Hero>
        <Container className={classes.cardGrid} maxWidth="md">
        { cards &&
          <Grid container spacing={5}>
            {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <GenericCard card={card} type="book"></GenericCard>
                </Grid>
            ))}
              {/* <Grid container justify="center"><Pagination count={props.total} onChange={pageChange}/></Grid> */}
          </Grid>
        }
        </Container>
      </main>
      }
      <Footer></Footer>
    </React.Fragment>
  );
}