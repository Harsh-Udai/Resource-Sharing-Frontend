import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AlertD from './Alert_Dialog';
import alert1 from '../Assets/alert3.svg';

import axios from 'axios';

import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    paddingBottom:'5px',
    borderRadius:'10px',
    opacity:0.9
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    
  },
  section2: {
   
    margin: theme.spacing(0.5),
  },
  section3: {
    margin: theme.spacing(1, 1, 1),
  },
}));

export default function MiddleDividers(props) {
  const classes = useStyles();
  const [hook,setHk] = useState(0);
  const [image,setImage] = useState('');
  const [price,setPrice] = useState('');
  const [borrow,setBorrow] = useState(false);
  const [prog,setProg] = useState(true); 
  const [oEr2,setOE2] = useState(false);
  const [error,setError] = useState(false);
  useEffect(()=>{
    const abortController = new AbortController();
    

    if(hook===0){
        axios.post('http://localhost:5000/ResourceFind',{
            name:props.name,
            email:props.owner,
            unique_id:props.unique_key
        },{
          headers:{
            'Authorization': `Bearer ${props.main.master_user.token}`
        }
        })
        .then((data)=>{
            setHk(1);
            if(data.data.msg==='No'){
              setError(true);
            }
            else{
              setImage(data.data.image.data)
              
              setPrice(data.data.Price);
              setBorrow(data.data.borrow);
            }
           
            setProg(false);
            props.closer();
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    return () => {
        abortController.abort();
    };

})

  const remove_Handle = ()=>{
    props.anim();
    axios.post('http://localhost:5000/cart/remove',{
        email:props.main.master_user.email,
        rs_name:props.name,
        rs_email:props.owner,
        uuq:props.unique_key
    },{
      headers:{
        'Authorization': `Bearer ${props.main.master_user.token}`
    }
    })
    .then((data)=>{
      
      props.setter();
      props.closer();
      
    })
    .catch((e)=>{
      console.log(e);
    })

  }

  const deal_Handle = ()=>{
    console.log('Hello World');
      props.anim();

      axios.post('http://localhost:5000/cart/update',{
        email:props.main.master_user.email,
        unique_id:props.unique_key
      },{
        headers:{
          'Authorization': `Bearer ${props.main.master_user.token}`
      }
      })
      .then((data)=>{
        
        
      })
      .catch((e)=>{
        console.log(e);
      })

      axios.post('http://localhost:5000/cart/pending',{
        email:props.main.master_user.email,
        resource_name:props.name,
        resource_owner:props.owner,
        unique_key:props.unique_key,
        deal:props.deal,
        finalApprove:'NO'
      },{
        headers:{
          'Authorization': `Bearer ${props.main.master_user.token}`
      }
      })
      .then((data)=>{
        
      })
      .catch((e)=>{
        console.log(e);
      })

      axios.post('http://localhost:5000/cart/approve',{
        emailTo:props.owner,
        resource_name:props.name,
        resource_owner:props.owner,
        unique_key:props.unique_key,
        deal:props.deal,
        request_name:props.main.master_user.user,
        request_email:props.main.master_user.email,

      },{
        headers:{
          'Authorization': `Bearer ${props.main.master_user.token}`
      }
      })
      .then((data)=>{
       
        // props.setter();
        props.closer();
        setOE2(true);
        
      })
      .catch((e)=>{
        console.log(e);
      })
      
  }

  const stopper2 = ()=>{
    setOE2(false);
  }

  if(error){
    return(
      <div></div>
    )
  }

  return (
    <div className={classes.root}>
       {/* <Backdrop start={prog} /> */}
       {prog ?<div><LinearProgress /></div>:null }
      <div>
        <div className={classes.section1}>
      
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.name}
          height="250"
          image={`data:image/png;base64,`+new Buffer.from(image).toString("base64")}
        />
        <CardContent>
          <Typography  >
            <span style={{fontSize:'120%',display:'flex',justifyContent:'center',textTransform:'capitalize'}} class="font">{props.name}</span> 
            <span style={{display:'flex',justifyContent:'center',marginTop:'4px',marginBottom:'-10px'}}>
              <Chip variant='primary' color="primary" label={<div className={'font'} style={{fontSize:'120%'}}> Price: {borrow ? 'Borrow' : price} </div>}/>
            </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </div>
    
    <div className={classes.section2}>
      
        <div style={{display:'flex',justifyContent:'center'}}>
          <Link push="true" style={{textDecoration:'none'}}  to={{pathname:`/UI/Product/${props.name}`,state:{email:props.owner,unique_id:props.unique_key}}} ><Button color="primary">View Details</Button></Link>
          
        </div>
    </div>
      <Divider variant="middle" />
        <div className={classes.section3}  style={{display:'flex',justifyContent:'space-around'}}>
        <Button color="secondary" disabled={props.deal} onClick={remove_Handle} >Remove </Button>
        <Button color="primary" disabled={props.deal} onClick={deal_Handle} >Finalize the deal</Button>
      </div>
      </div>
      <AlertD setter={props.setter} text={`Congratulations!. Now your request has been sent to the owner of Resource, Wait till Approval. Check the Requests Tab.`} image={alert1} start={oEr2} stop={stopper2} />
    </div>
  );
}
