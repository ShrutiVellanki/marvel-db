import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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
}));

function dateFormatter(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let formattedDate = date.split("T")[0];
  let month = months[parseInt(formattedDate.split("-")[1]) - 1];
  let year = formattedDate.split("-")[0];
  return `${month}, ${year}`; 
}

export default function GenericCard(props) {
 
  const classes = useStyles();
  const card = props.card;

  return (
    <React.Fragment>
      <CssBaseline />    
        <Card className={classes.card}>
            <CardMedia
                className={!card.thumbnail.path.endsWith("image_not_available") && !card.thumbnail.path.endsWith("4c002e0305708") ? classes.cardMedia: classes.cardMediaBottom}
                image={card.thumbnail.path + "." + card.thumbnail.extension}
                title={card.name}
            />
            { props.type !== "book" &&
              <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h6" component="h5">
                  {card.name}
                  </Typography>
                  
                  <Typography>- Last updated on <strong>{dateFormatter(card.modified)}</strong></Typography>
                  { card.comics.available > 0 &&
                  <Typography>- Found in <strong>{card.comics.available}</strong> comic books</Typography>
                  }
              </CardContent>
            }
            { props.type === "book" && 
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h5">
                {card.title}
                </Typography>
                
                <Typography>{new DOMParser().parseFromString(card.description)}</Typography>
              </CardContent>
            }
            { props.type !== "book" &&
              <CardActions>
              { props.card.comics.available > 0 &&
                <Button size="small" color="primary">
                  View More
                </Button>
              }
              </CardActions>
            }
            { props.type === "book" && card.urls.find(url => url.type == "detail") &&
              <CardActions>
                <Button size="small" color="primary" href={card.urls.find(url => url.type == "detail").url}>
                  View More
                </Button>
              </CardActions>
            }
        </Card>              
    </React.Fragment>
  );
}