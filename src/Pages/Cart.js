import React,{useEffect,useState} from 'react';
import Navbar2 from '../Containers/Navbar2Container';
import {Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CartCard from '../Containers/Cart_cardContainer';
import axios from 'axios';
import Backdrop from '../Components/Backdrop';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: '90%',
        minHeight:'670px'
      },
    },
}));
  

export default function Cart(props){
    
    const classes = useStyles();
    const [hook,setHk] = useState(0);
    const [redata,setRD] = useState([]);
    const [prog,setProg] = useState(true); 

    const setter = ()=>{
        setRD([]);
        axios.post('https://rsp-backend.herokuapp.com/cart/data',{
                email:props.main.master_user.email
            },{
                headers:{
                    'Authorization': `Bearer ${props.main.master_user.token}`
                }
            })
            .then((data)=>{
                setHk(1);
                
                const uiO=[]
                const yy = data.data.map((dat)=>{
                    if(props.main.master_user.active_users.includes(dat.resource_owner)){
                        uiO.push(dat);
                    }
                })
                setRD(uiO)
                
            })
            .catch((e)=>{
                console.log(e);
            })
    }
    
    useEffect(()=>{
        const abortController = new AbortController();
        
        if(hook===0){
            setter();
        }
        return () => {
            abortController.abort();
        };

    },[])

    const handle = ()=>{
        setProg(false);
    }

    const anim = ()=>{
        setProg(true);
    }

    if(props.main.master_user.user===''){
        return <Redirect to='/UI' />
    }

    return(
        <div>
            <Navbar2 />
            
            <div className={classes.root}>
                <Paper style={{marginBottom:'40px',backgroundColor:'#F4F6F6'}} elevation={3} >
            {/* #222831 */}
                
                {prog && redata.length>0 ?<div><Backdrop start={prog} /></div>:null }
                    <div className="img-text1">
                        <h1 style={{fontSize:'150%'}}>Cart!</h1>
                    </div>
                    {redata.length>0 ?
                    <div className="img-text1">
                        <h1 style={{fontSize:'150%'}}>Enjoy the deals!</h1>
                    </div> : null}

                    <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',marginBottom:'40px'}}>
                        {redata.length>0 ?  redata.map((data,ind)=>{
                            
                            return <div key={ind} style={{margin:'30px',width:'300px'}}><CartCard anim={anim} setter={setter} closer={handle} image={data.image} name={data.resource_name} deal={data.deal} owner={data.resource_owner} unique_key={data.unique_key} /></div>
                        }):<div className="img-text1">
                                <h1>No Items!</h1>
                            </div>
                    }

                    </div>
                </Paper>
            </div>
        </div>
    )
}