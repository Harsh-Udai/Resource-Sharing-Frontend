import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3, 1, 1),
  },
}));

export default function MiddleDividers(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              <span className="font1">Hello :)</span>
            </Typography>
          </Grid>
          
        </Grid>
        <Typography color="textSecondary" variant="body2">
          This is the Notification Section here you can text imp announcements regarding some resources
          you can also share important links to some events. Please don't do Spam here otherwise you will be banned.
        </Typography>
      </div>
      <Divider variant="middle" />
      
      <div className={classes.section3}>
        <Button color="primary" onClick={props.findF}>View Feed</Button>
      </div>
    </div>
  );
}
