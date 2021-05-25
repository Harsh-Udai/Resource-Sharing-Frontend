import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Image1 from '../Assets/gift.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'theme.palette.background.paper',
    padding:'5px', 
    margin:'20px'
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
    margin: theme.spacing(1, 1, 1),
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
              
              {<span className='font1'>{props.name}</span>}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
            <Chip className={classes.chip} color="primary" label={<span className='font1'>{props.email}</span>} />
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section3} >
        {props.approve==='NO' ? <div><Button color='primary'>Status : Pending</Button></div> : 
        <Button color={props.approve==='Accepted' ? 'primary' : 'secondary'}>Status : {props.approve==='Accepted' ? 'Accepted' : 'Rejected'} </Button>}
        <div style={{display:'flex',justifyContent:'center',marginTop:'-40px',marginLeft:'30px'}}>
          {props.approve==='Accepted' ?<img width="10%" alt="." src={Image1} /> :null}
        </div>
      </div>
    </div>
  );
}
