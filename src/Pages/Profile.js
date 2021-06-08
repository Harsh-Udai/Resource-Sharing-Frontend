import React,{useEffect,useState} from 'react';
import './Profile.css';
import head from '../Assets/Animated Shape.svg'
import Avatar1 from 'avataaars';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '../Components/Card2';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Navbar2 from '../Containers/Navbar2Container';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Profile = (props)=>{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [count,setCount] = useState(0);
    const [dataAr,setArr] = useState([]);
    const [prog,setProg] = useState(true);
    const [Errpro,setEPRO] = useState(0);
    const letUpdate = ()=>{
        axios.post('https://rsp-backend.herokuapp.com/Profile/userData',{
                    email:props.main.master_user.email,
                    token:props.main.master_user.token
                },{
                    headers:{
                        'Authorization': `Bearer ${props.main.master_user.token}`
                    }
                })
                .then((data)=>{
                    
                    setEPRO(1);
                    setProg(false)
                    setArr(data.data);
                    setCount(data.data.length);
                })
                .catch((e)=>{
                    console.log(e);
                })
    }

    useEffect(()=>{
            const abortController = new AbortController();
            if(Errpro===0){
                axios.post('https://rsp-backend.herokuapp.com/Profile/userData',{
                    email:props.main.master_user.email,
                    token:props.main.master_user.token
                },{
                    headers:{
                        'Authorization': `Bearer ${props.main.master_user.token}`
                    }
                })
                .then((data)=>{
                    
                    setEPRO(1);
                    setProg(false)
                    setArr(data.data);
                    setCount(data.data.length);
                })
                .catch((e)=>{
                    console.log(e);
                })
            }          
            return () => {
                abortController.abort();
            };      
    })
    
    const CardClick = (et,unique_id)=>{
        
        setOpen(true);

        axios.post('https://rsp-backend.herokuapp.com/Profile/userData/delete',{
            token:props.main.master_user.token,
            name:et,
            email:props.main.master_user.email,
            unique_id:unique_id
        },{
            headers:{
                'Authorization': `Bearer ${props.main.master_user.token}`
            }
        })
        .then((data)=>{
            
            console.log(data)
            setArr(data.data);
            setCount(data.data.length);
            setOpen(false);
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    if(props.main.master_user.user===''){
        return <Redirect to='/UI' />
    }

    
    
    return(
        <div>
            <Navbar2 />
            
            <div className="ProfileI">
                
                <img src={head} alt="imagePart1" width="70%" height="50%" style={{borderRadius:'5px',marginTop:'20px'}}/>
                <div className="img-text">
                    <h1>Profile!</h1>
                </div>
                
            </div>
            <div className="PCD">
                <div className="ProfileCard">
                    <div >
                        <p className="NamePart"> <span >{props.main.master_user.name.split(" ")[0]}</span></p>
                    </div>
                    <div className="avatar">
                        <Avatar1 
                            style={{width:'140px'}}
                            avatarStyle='Circle'
                            topType='WinterHat4'
                            accessoriesType='Round'
                            hatColor='Heather'
                            facialHairType='Blank'
                            clotheType='CollarSweater'
                            clotheColor='Gray01'
                            eyeType='Happy'
                            eyebrowType='Default'
                            mouthType='Default'
                            skinColor='Light'
                            />
                    </div>
                    <div className="countP">
                        <p className="NamePart1"> <span >Resources : {count}</span></p>
                    </div>
                    
                    <div className="EmailTag">
                        <Chip label={<span className="font1">{props.main.master_user.email}</span>} color="primary" avatar={<Avatar>{<span className="font1">{props.main.master_user.name.split(" ")[0].charAt(0)}</span>}</Avatar>} />
                    </div>
                    <div className="categ">
                        <p>Categories</p>
                        <div className="mapper">
                        {
                            props.main.master_user.class.map((dt,index)=>{
                                
                                return(
                                    <Chip style={{marginRight:'5px',marginBottom:'3px'}} color="primary" key={index} label={<span className="font1">{dt}</span>} size="small" />
                
                                )
                            })
                        }
                        </div>
                        
                    </div>
                    
                </div>

            </div>
            <br></br>
            <div >
                <div className="sect-2">
                    <h1>Handle Resources!</h1>
                </div>
                <div className="cards">
                    {prog ?<div style={{marginBottom:'100px'}}> <CircularProgress /> </div>: <div className="cards">
                    
                    {dataAr.length>0 ? dataAr.map((img,index)=>{
                               
                               return(
                                   <div  key={index} style={{margin:'50px',width:'300px',height:'500px'}}>
                                       
                                       <Card danger={letUpdate} unique_id={img.unique_id} email={img.email} click={CardClick} image={img.image} tag={img.owner.charAt(0)} name={img.resource_Name} desc={img.resource_Description} />
                                   </div>                                    
                               )
                           }) : <div className="sect-2">
                                    <h1>No Items!</h1>
                                </div>}
                </div>}
                </div>
               
            </div>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Profile;