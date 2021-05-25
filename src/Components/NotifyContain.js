import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
    fontFamily:'Lexend',
  },
  inline: {
    
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar style={{backgroundColor:'#2E4053'}} >{props.name.charAt(0)}</Avatar>
          
        </ListItemAvatar>
        <ListItemText
          primary={props.name + " "+ props.date.split("??")[0]+" "+props.date.split("??")[1]}
          secondary={
              <Typography
                color="textPrimary"
                style={{overflow: 'auto',wordWrap: 'break-word',color:'#717D7E'}}
              >
                {props.msg}
              </Typography>
          }
        />
      </ListItem>
    </List>
  );
}
