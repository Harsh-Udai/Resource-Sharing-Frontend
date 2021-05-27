import React,{useState,useEffect,useRef} from 'react';
import './Notify.css';
import Fab from '@material-ui/core/Fab';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Contain from '../Components/NotifyContain';
import MuiAlert from '@material-ui/lab/Alert';
import Card3 from '../Components/Card3';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
let Filter = require("bad-words");

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    Error: {
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(5),
      width: theme.spacing(90),
      height: theme.spacing(75),
      [theme.breakpoints.between(406,723)]: {
        width: theme.spacing(50),
      },
      [theme.breakpoints.between(0,406)]: {
        width: theme.spacing(40),
      },
    },
    
  },
  root_1: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0),
      width: theme.spacing(90),
      height: theme.spacing(8),
      [theme.breakpoints.between(406,723)]: {
        width: theme.spacing(50),
      },
      [theme.breakpoints.between(0,406)]: {
        width: theme.spacing(40),
      },
    },
    
  },
  root_2: {
    marginTop:'2px',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0),
      width: theme.spacing(90),
      height: theme.spacing(58),
      [theme.breakpoints.between(406,723)]: {
        width: theme.spacing(50),
      },
      [theme.breakpoints.between(0,406)]: {
        width: theme.spacing(40),
      },
    },
    
  },
  root_3: {
    marginTop:'2px',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0),
      width: theme.spacing(90),
      height: theme.spacing(8.5),
      [theme.breakpoints.between(406,723)]: {
        width: theme.spacing(50),
      },
      [theme.breakpoints.between(0,406)]: {
        width: theme.spacing(40),
      },
    },
    
  },

}));


  
export default function Notify(props){
    
    const [user,setD] = useState("");
    const [data,setData] = useState([]);
    const [show,setShow] = useState('none');
    const [profanity,setProf] = useState(false);
    const filter = new Filter();

    //Error states
    const [ButtonE, setBE] = useState(false);
    const classes = useStyles();
    const Userval = (e)=>{
      
        setD(e.target.value);
    }
    var today = new Date();
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    const MSG_event = (e)=>{

        e.preventDefault();
        const name = user;
       
        
        if(user.trim().length ===0){
            setBE(true);
            props.main.master_user.socket.on('DataE',data => {
                setData(data);
            })
        }
        if(filter.isProfane(name)){
          setProf(true);
        }
        else{
            setBE(false);
            
            props.main.master_user.socket.emit('client',{
            
                Name:props.main.master_user.name,
                Message:user,
                Date: today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear() +'??'+formatAMPM(new Date())
            });
            
            axios.get('http://localhost:5000/MSG')
            .then((data)=>{
              setData(data.data);
            })
            .catch((e)=>{
              console.log(e);
            })
        }
        setD("")
    }

    const divRref = useRef(null);

    useEffect(() => {
        
        divRref.current.scrollIntoView({ behavior: 'smooth' ,block: "end"});
    });
    
    useEffect(()=>{
        const abortController = new AbortController();
        axios.get('http://localhost:5000/MSG')
        .then((data)=>{
          setData(data.data);
        })
        .catch((e)=>{
          console.log(e);
        })

        return () => {
            abortController.abort();
        };
    },[])

    const InitHandle = ()=>{
        setShow('block')
        props.main.master_user.socket.on('DataE',data => {
            
            setData(data);
        })
    }

    return(
        <div   >
        <div className={classes.root}>
           <Paper elevation={3} >
                <div className={classes.root_1}>
                    <Paper elevation={1} style={{display: 'flex',justifyContent: 'center'}}>
                           <p style={{color: '#5F6A6A'}} className="Chat-Head">Notifications..</p>
                    </Paper>
                </div>
                <div className={classes.root_2}>
                    <Paper elevation={0} style={{overflow:'auto'}}>
                        <div style={{display:show==='block' ? 'none' :'block',marginTop:'90px'}}>
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                                <Card3 findF={InitHandle} />
                            </div>
                        </div>
                        <div ref={divRref} style={{display:show}}>
                            
                            {
                                data.length > 0 ? 
                                    data.map((data,index)=>{
                                        
                                        return(
                                            
                                            <Contain key={index} date={data.Date} name={data.Name} msg={data.Message} />
                                            
                                        )
                                        
                                    })

                                    : null
                            }
                        </div>
                        
                    
                    </Paper>
                </div>
                <div className={classes.root_3}>
                    <Paper elevation={2} >
                        <div className="Chat-Input" style={{display:show}}>
                            <form onSubmit={(e)=>MSG_event(e)}>
                                <input onChange={Userval} className="Chat-Input_s" value={user} type="text" placeholder="Type here ..."></input>
                                <Fab color="primary" aria-label="add" style={{marginTop:'-5px'}}  onClick={MSG_event} >
                                    <SendRoundedIcon />
                                </Fab>
                            </form>
                        </div>
                    </Paper>
                </div>
           </Paper>
           </div>
            <div style={{display: 'flex',justifyContent: 'center'}}>
                <div style={{marginTop:'-10px'}} className={classes.Error}>
                    {ButtonE ? <Alert severity="info">Post important Notifications and Don't do Spam here!</Alert> : null}
                </div>

            </div>
            <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={profanity} onClose={()=>setProf(false)} autoHideDuration={6000} >
                      
              <Alert  severity="warning">This is a warning message, Profanity is not allowed here!</Alert>
              
            </Snackbar>
        </div>
    )
}
