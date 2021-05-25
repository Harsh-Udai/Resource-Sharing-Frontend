import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

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
    textAlign:'center',
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
              <span className="font1" style={{textAlign:'center',backgroundColor:'#F7DC6F', color:'white',paddingLeft:'10px',paddingRight:'10px'}}>Welcome to Chat Section :)</span>
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          <span className="font1" style={{fontSize:'120%',backgroundColor:'#2C3E50',color:'white',padding:'5px'}}>Communication is a key tool.</span>
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section3}>
          <Link to="/UI/messenger" style={{textDecoration:'none'}}> <Button style={{color:'#17202A',backgroundColor:'#F4F6F6'}} onClick={props.findF}>Open Chat App</Button></Link>
      </div>
    </div>
  );
}
