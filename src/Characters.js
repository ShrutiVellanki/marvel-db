import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { fetchCharacters } from './APIServices'

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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMediaBottom: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: '#BEC2CB',
    backgroundPosition: 'bottom'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundColor: '#BEC2CB'
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
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
                  <Card className={classes.card}>

                      <CardMedia
                        className={!card.thumbnail.path.endsWith("image_not_available") && !card.thumbnail.path.endsWith("4c002e0305708") ? classes.cardMedia: classes.cardMediaBottom}
                        image={card.thumbnail.path + "." + card.thumbnail.extension}
                        title={card.name}
                      />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h5">
                        {card.name}
                      </Typography>
                      
                      <Typography>- Last updated on <strong>{card.modified.split("T")[0]}</strong></Typography>
                      { card.comics.available > 0 &&
                        <Typography>- Found in <strong>{card.comics.available}</strong> comics</Typography>
                      }
                      { card.comics.available > 0 &&
                        <Typography>- Found in <strong>{card.series.available}</strong> series</Typography>
                      }
                    </CardContent>
                    
                    <CardActions>
                      <Button size="small" color="primary">
                        View More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
            ))}
              <Grid container justify="center"><Pagination count={props.total} onChange={pageChange}/></Grid>
          </Grid>

        </Container>
      </main>
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