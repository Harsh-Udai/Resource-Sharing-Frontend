import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  return (
    <List className={classes.root} >
        { props.queue.length > 0 ?  props.queue.map((dt,ind)=>{
          return(
            <div key={ind}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" >{dt.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={dt.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                     
                    >
                      {dt.email}
                    </Typography>
                    <br></br>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                      
                    >
                      {dt.date.split(" ")[1]+"  "+dt.date.split(" ")[0]}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
          )
        }): <div style={{textAlign:'center',fontFamily:'Lexend',marginLeft:'40px'}}><h1>Nothing !</h1></div>}
    </List>
  );
}
