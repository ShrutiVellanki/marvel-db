import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export default function CharacterCard(props) {
 
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
    </React.Fragment>
  );
}