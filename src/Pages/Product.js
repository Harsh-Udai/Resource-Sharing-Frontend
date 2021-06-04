import React,{ useState,useEffect} from 'react';
import Navbar2 from '../Containers/Navbar2Container';
import imageP from '../Assets/Simple Shiny.svg';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Avatar1 from 'avataaars';
import './Product.css';
import Chip from '@material-ui/core/Chip';
import List from '../Components/List';
import BottomNav from '../Containers/BottomContainer';
import {Redirect} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      fontFamily:'Lexend',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(35),
      },
    },
    root1: {
        display: 'flex',
        flexWrap: 'wrap',
        fontFamily:'Lexend',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(50),
          height: theme.spacing(35),
        },
        
        marginBottom:'50px'
      },
      root2: {
        display: 'flex',
        flexWrap: 'wrap',
        fontFamily:'Lexend',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(80),
          height: theme.spacing(35),
        },
        
        marginBottom:'50px'
      },
}));




const Product = (props)=>{
    const classes = useStyles();
    const [image,setImage] = useState('');
    const [email,setEmail] = useState('');
    const [desc,setDesc] = useState('');
    const [classC,setClass] = useState('');
    const [owner,setOwner] = useState('');
    const [queue,setOueue] = useState([]);
    const [price,setPrice] = useState('');
    const [Borr,setBorr] = useState('');
    const [uuK,setUK] = useState('');
    const [smallI,setSMI] = useState('');
    const [effP,setEP] = useState(0);
    const [sold,setSold] = useState('');
    const [prog,setProg] = useState(true);

    useEffect(()=>{
        
        window.scrollTo(0,0)
        const abortController = new AbortController();
        if(effP===0){
            axios.post('https://rsp-backend.herokuapp.com/ResourceFind',{
                token:props.main.master_user.token,
                name:props.match.params.id,
                email:props.location.state.email,
                unique_id:props.location.state.unique_id
            },{
                headers:{
                    'Authorization': `Bearer ${props.main.master_user.token}`
                }
            })
            .then((data)=>{
                
                setEP(1);
                setSold(data.data.sold);
                setUK(data.data.unique_id)
                setSMI(data.data.image)
                setImage(data.data.imageF.data);
                setPrice(data.data.Price);
                setBorr(data.data.borrow);
                setEmail(data.data.email);
                setDesc(data.data.resource_Description);
                setClass(data.data.classification)
                setOwner(data.data.owner);
                setOueue(data.data.queue);
                setProg(false)
            })
            .catch((e)=>{
                console.log(e);
            })
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
            <div>
                <div className="img-cen">
                    <img src={imageP} alt="imagePart" width="70%" style={{borderRadius:'5px',marginTop:'20px'}}></img>
                    <div className="img-text">
                        <h1 style={{textTransform:'capitalize'}}>{props.match.params.id}</h1>
                    </div>
                </div>
                <br></br>
                
                <div className="font font_D">
                    <h1>Details</h1>
                </div>

                {prog ? <div style={{display:'flex',justifyContent:'center',marginBottom:'50px'}}><CircularProgress /></div> : 
                <>
                <div className="head-1">
                    <h1>Resource Image</h1>
                </div>   
                <div className="imagePart">
                    <img width="70%" alt='imptagger' src={`data:image/png;base64,`+new Buffer.from(image).toString("base64")} />
                   
                </div>
                
                <div className="head-1">
                    <h1>Description</h1>
                </div>
                <div style={{display:'flex',justifyContent: 'center',marginBottom:'50px'}}>
                    <div  style={{width:'60vw'}}>
                        <Accordion defaultExpanded>
                            
                            <AccordionDetails>
                            <Typography style={{wordWrap:'break-word',overflow:'auto'}}>
                                {desc}
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                
                <div className={classes.root2} style={{display:'flex',justifyContent:'center',textAlign:'center'}}>
                    <Paper elevation={3} style={{backgroundColor:'#212F3D',color:'white'}}>
                        <div >
                            <p style={{fontSize:'230%',fontFamily:'Lexend'}}>Price : {Borr? 'Borrow' : price}</p>
                            
                        </div>
                        <div >
                            <p style={{fontSize:'230%',fontFamily:'Lexend'}}>Category</p>
                            <Chip style={{fontSize:'100%',fontFamily:'Lexend',textTransform:'capitalize'}} label={classC}/>
                        </div>
                        
                    </Paper>
                    
                        
                </div>

                <div className="majorP">
                    <div className={classes.root}>
                        <Paper elevation={3} >
                            <div style={{textAlign:'center',fontSize:'130%',marginTop:'-10px'}}>
                                <p>Owner</p>
                            </div>
                            <div >
                                <Avatar1
                                    style={{width:'200px',marginTop:'-40px'}}
                                    avatarStyle='Transparent'
                                    topType='ShortHairShortFlat'
                                    accessoriesType='Round'
                                    hairColor='Black'
                                    facialHairType='Blank'
                                    clotheType='BlazerShirt'
                                    eyeType='Happy'
                                    eyebrowType='Default'
                                    mouthType='Default'
                                    skinColor='Light'
                                />
                            </div>
                            <div className='tesxter'>
                                {owner.split(" ")[0]+'..'}
                                <br></br>
                                
                            </div>
                            <div className='emailR'>
                                <Chip style={{fontSize:'80%',fontFamily:'Lexend'}} label={email}  color="default"   />
                            </div>
                        </Paper>
                    
                        
                    </div>
                    
                    <div className={classes.root1}>
                        <Paper elevation={3} >
                            <div style={{textAlign:'center',fontSize:'130%',marginTop:'-10px'}}>
                                <p>Resource Queue</p>
                            </div>
                            <List queue={queue} />
                        </Paper>
                    
                        
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={{textAlign:'center',marginBottom:'30px',fontFamily:'Lexend',backgroundColor:'#85C1E9',width:'65vw',padding:'10px'}}>
                        <span style={{color:'white',fontSize:'120%',wordWrap:'break-word'}}>To make more comfort, we are also providing the chat app as well, Enjoy the Convo!</span>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <BottomNav cart_data={{
                        re_name:props.match.params.id,
                        owner_email: email,
                        requester:props.main.master_user.user,
                        requester_email:props.main.master_user.email,
                        unique_id:uuK,
                        price:price,
                        borrow:Borr,
                        image:smallI,
                        sold:sold
                    }} />
                    
                </div></>}
            </div>
                
        </div>
    )
}

export default Product;
