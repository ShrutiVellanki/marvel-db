import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function CharacterSearch(props) {
  const classes = useStyles();
  let input = '';
  const inputChanged = (e) => {
    input = e.target.value;
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Find Character"
        inputProps={{ 'aria-label': 'find character' }}
        onChange={inputChanged}
      />
      <IconButton  className={classes.iconButton} aria-label="search" onClick={props.handler(input)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}