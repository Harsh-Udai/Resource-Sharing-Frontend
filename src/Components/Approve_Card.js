import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import AlertD from './Alert_Dialog';
import alert4 from '../Assets/alert4.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
  const [oEr2,setOE2] = useState(false);
  
  const handleCancel = ()=>{
    
    axios.post('https://rsp-backend.herokuapp.com/request/AppCancel',{
      email:props.main.master_user.email,
      resource_name:props.name,
      email2:props.email,
      unique_id:props.unique_key
    },{
        headers:{
          'Authorization': `Bearer ${props.main.master_user.token}`
      }
    })
    .then((data)=>{
      
      props.change();
    })
    .catch((e)=>{
      console.log(e);
    })

  }

  const handleApprove = ()=>{
    
    axios.post('https://rsp-backend.herokuapp.com/request/AppApprove',{
      email:props.main.master_user.email,
      resource_name:props.name,
      email2:props.email,
      unique_id:props.unique_key
    },{
        headers:{
          'Authorization': `Bearer ${props.main.master_user.token}`
      }
    })
    .then((data)=>{
      
      setOE2(true);
      // props.change();
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  const stopper2 = ()=>{
    setOE2(false);
  }
  
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
        <Button disabled={props.approve} onClick={handleCancel} color={'secondary'}>Cancel</Button>
        <Button disabled={props.approve} onClick={handleApprove} >Approve</Button>
      </div>
      <AlertD text={'Congratulations!, Hope your Resource will help them alot.'} setter={props.change} image={alert4} start={oEr2} stop={stopper2} />
    </div>
  );
}
