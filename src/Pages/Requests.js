import React,{useState,useEffect} from 'react';
import Navbar2 from '../Containers/Navbar2Container';
import {Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Request from '../Containers/RequestCard_Container';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Approve from '../Containers/ApproveContainer';
import BackDrop from '../Components/Backdrop';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: '85vw',
          minHeight:'670px'
        },
    },
}));
  


export default function Cart(props){

    const classes = useStyles();
    const [hook,setHk] = useState(0);
    const [pending,setPend] = useState([]);
    const [approve,setAPR] = useState([]);
    const [prog,setProg] = useState(true);
    const dataR = ()=>{
        setProg(true)
        axios.post('http://localhost:5000/request/data',{
            email:props.main.master_user.email
        },{
            headers:{
                'Authorization': `Bearer ${props.main.master_user.token}`
            }
        })
        .then((data)=>{
            
            setHk(1);
            setPend(data.data.pending)
            setAPR(data.data.approve)
            setProg(false);
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        const abortController = new AbortController();
        if(hook===0){
            dataR();
        }
        return () => {
            abortController.abort();
        };
    })


    if(props.main.master_user.user===''){
        return <Redirect to='/UI' />
    }

    return(
        <div>
            <Navbar2 />
            <div style={{display:'flex',justifyContent:'center'}}>
                <div className={classes.root}>
                    <Paper style={{marginBottom:'40px',backgroundColor:'#F4F6F6'}} elevation={3} >
                        <BackDrop start={prog} />
                        
                        <div className="img-text1">
                            <h1 style={{fontSize:'150%'}}>Requests!</h1>
                        </div>
                        
                       <div>
                                                        
                            <div className="font1" style={{margin:'30px'}}>
                                <h1 style={{fontSize:'220%'}}>Approve Requests</h1>
                                <p>Instructions:</p>
                                <p>Before approving any request try to check resource queue as well.</p>
                                <p>If you are approving request, first connect with the other person through Mail/Chat App.</p>
                                <p>Then share your UPI id for transactions if applicable.</p>
                                <p>Card with disabled buttons are History items.</p>

                                <div style={{display:'flex',justifyContent:'center',flexWrap: 'wrap'}}>
                                    {approve.length>0 ?
                                        approve.map((data,ind)=>{
                                            
                                            return <Approve change={dataR} unique_key={data.unique_key} check={'requester'} name={data.resource_name} email={data.request_email} approve={data.deal} />
                                        })
                                    : <h1 style={{fontSize:'220%'}}>NO Requests</h1>}
                                
                                </div>
                                
                            </div>
                            <Divider variant="middle" />
                            <div className="font1" style={{margin:'30px'}}>
                                <h1 style={{fontSize:'220%'}}>Pending Requests</h1>

                                <div style={{display:'flex',justifyContent:'center',flexWrap: 'wrap'}}>
                                    {pending.length>0 ?
                                        pending.map((data,ind)=>{
                                            return <Request name={data.resource_name} email={data.resource_owner} approve={data.finalApprove} />
                                        })
                                    : <h1 style={{fontSize:'220%'}}>NO Requests</h1>}
                                </div>
                            </div>
                       </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}