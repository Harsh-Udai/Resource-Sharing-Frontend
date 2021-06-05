import React,{useState, useEffect} from 'react';
import Navbar from '../../Components/Navbar3';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './messenger.css';
import Convo from './conversation';
import Chat from './chatOnline';
import axios from 'axios';
import Conv1 from './conv1';
import Message from './message';
import { useRef } from 'react';
import Fab from '@material-ui/core/Fab';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {Redirect} from 'react-router-dom';
import {io} from 'socket.io-client';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
let Filter = require("bad-words");


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(160),
      height: theme.spacing(80),
    },
    
  },
  root1: {
    '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.2em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: 'none'
    }
  }
}));


export default function Messenger(props) {

    // console.log(props);
    const user = props.main.master_user
    const filter = new Filter();
    const classes = useStyles();
    const socket = useRef();

    const [stateSnack1, setStateSnack1] = React.useState({
        open: false,
        Transition: Fade,
    });
    const handleClose1 = () => {
        setStateSnack1({
        ...stateSnack1,
        open: false,
    });
    };

    const [stateSnack2, setStateSnack2] = React.useState({
        open: false,
        Transition: Fade,
    });
    const handleClose2 = () => {
        setStateSnack2({
        ...stateSnack2,
        open: false,
    });
    };

    const [contact,setContact] = useState([]);
    const [showContact,setSC] = useState(false);
    const [showRecent,setRS] = useState(true);
    const [currentChat, setCurrentChat] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [color1,setColor1] = useState("color");
    const [color2,setColor2] = useState("");
    const [profanity,setProf] = useState(false);

    const [prog,setProg] = useState(false);
    const [prog1,setProg1] = useState(false);

    const scrollRef = useRef();

    useEffect(()=>{
        socket.current = io("ws://nameless-ridge-85618.herokuapp.com");
        console.log(socket);
        socket.current.on("getMessage",data=>{
            
            setArrivalMessage({
                sender:data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
        
    },[])

    useEffect(()=>{
        
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages((prev)=>[...messages,arrivalMessage]);
        
    },[arrivalMessage])

    useEffect(()=>{
        
        socket.current.emit('addUser',user._id);
        socket.current.on('getUsers',users=>{
            console.log('users',users);
            setOnlineUsers(users)
        })

    },[user])
    // useEffect(()=>{
    //     socket.current.on('getUsers',users=>{
    //         console.log('users',users);
    //         setOnlineUsers(users)
    //     })
    // })


    const availContact = async ()=>{
        setColor1("");
        setColor2("color");
        try{
            const res = await axios.get('https://rsp-backend.herokuapp.com/api/messages/users');
            
            const newD = res.data.filter((dt)=>{
                return dt._id!==user._id
            })
            setContact(newD);
            setSC(true);
            setRS(false);
        }
        catch(e){
            console.log(e);
        }

    }

    const availRecents = async ()=>{
        setProg1(true)
        const getConversations = async()=>{
            try{
                const res = await axios.get('https://rsp-backend.herokuapp.com/api/conversations/'+user._id);
                setProg1(false)
                setConversations(res.data);
            }
            catch(e){
                console.log(e);
            }
            
        }

        getConversations();
        setColor1("color");
        setColor2("");
        setRS(true);
        setSC(false);
    }



    //user cicked user chat
    useEffect(()=>{
        
        setProg(true);
        const getMessages = async()=>{
            try{
                
                const res = await axios.get("https://rsp-backend.herokuapp.com/api/messages/"+currentChat?._id);
                
                setMessages(res.data);
                setProg(false);
            }
            catch(e){
                console.log(e);
            }
        }
        getMessages();
    },[currentChat])
    
    // get conversations of current user

    useEffect(()=>{
        setProg1(true);
        const getConversations = async()=>{
            try{
                const res = await axios.get('https://rsp-backend.herokuapp.com/api/conversations/'+user._id);
                
                setProg1(false)
                setConversations(res.data);
            }
            catch(e){
                console.log(e);
            }
            
        }
        getConversations();
    },[user._id])

    
    const handleSubmit = async(e)=>{
        const name = newMessage;
        e.preventDefault();
        if(filter.isProfane(name)){
            setProf(true);
            setNewMessage("");
        }
        else{
            if(newMessage.trim()!==''){
                const message={
                    sender: user._id,
                    text: newMessage,
                    conversationId:currentChat._id
                }
                setNewMessage("");
                const receiverId = currentChat.members.find(mem=> mem!==user._id)
        
                socket.current.emit('sendMessage',{
                    senderId: user._id,
                    receiverId,
                    text:newMessage
                })
        
                try{
                    const res = await axios.post('https://rsp-backend.herokuapp.com/api/messages',message);
                    
                    setMessages([...messages,res.data]);
                }
                catch(e){
                    console.log(e);
                }
            }
            else{
                setNewMessage("");
            }
        }
        
    }

    useEffect(()=>[
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    ],[messages])

    const HandleNewUser = async(data)=>{

        setStateSnack1({
            ...stateSnack1,
            open: false,
        });
        setStateSnack2({
            ...stateSnack2,
            open: false,
        });

        // console.log("Conversations",conversations);
        // console.log("data to be added",data)

        const mk = conversations.filter((dt)=>{
           return (dt.members[0]===user._id && dt.members[1]===data._id) || (dt.members[1]===user._id && dt.members[0]===data._id)
        })

        // console.log(mk);

        if(mk.length===1){
            setCurrentChat(mk[0]);
            setStateSnack2({
                ...stateSnack2,
                open: true,
            });
        }
        else{
           
            const newCov = {
                senderId: user._id,
                receiverId: data._id
            };
    
            try{
                const res = await axios.post('https://rsp-backend.herokuapp.com/api/conversations',newCov);
                
                setConversations([...conversations,res.data])
                setStateSnack1({
                    ...stateSnack1,
                    open: true,
                });
            }
            catch(e){
                console.log(e);
            }
        }

        

    }

    const msg_wire = (e)=>{
        
        setNewMessage(e.target.value)
    }


    if(props.main.master_user.user===''){
        return <Redirect to='/UI' />
    }


    return(
        <>
        <Navbar />
        <div >
        <div className={classes.root} >
        
            <Paper elevation={3} className="mainPaper font1"  >
                             
                <div className="conversations " >
                    <p className="setF" ><span style={{backgroundColor:'#F5B041',color:'white',fontSize:'150%',paddingLeft:'10px',paddingRight:'10px'}} >Convos</span></p>
                    <div className="convoSep">
                        <div className={`recent ${color1}`}  onClick={availRecents}>
                            <p>Recents</p>
                        </div>
                        <div className={`contact ${color2}`} onClick={availContact}>
                            <p>Contacts</p>
                        </div>
                       
                        
                    </div>
                    <div style={{overflow: 'scroll'}}>
                        <div style={{display:'flex',justifyContent:'center'}} className="chatBoxTop">
                            {showContact ? <div >
                                {contact.map((data,ind)=>{
                                    return(
                                        <div className="chatCurrent" key={ind} onClick={()=>HandleNewUser(data)}>
                                            <Conv1 name={data.name} /> 
                                        </div>
                                    ) 
                                })}
                                
                            </div> :null }
                            
                        </div>
                    
                        <div style={{display:'flex',justifyContent:'center'}}>
                            {showRecent ? <div style={{marginTop:'-450px'}}>
                                {conversations.length>0 ? conversations.map((data,ind)=>{
                                    return(
                                        <div className="chatCurrent" key={ind} onClick={()=>setCurrentChat(data)}>
                                            <Convo conversation={data} currentUser={user} /> 
                                        </div>
                                    ) 
                                }):<div style={{marginTop:'200px',fontSize:'150%'}}><p><span style={{backgroundColor:'#FF7F50',color:'white',fontSize:'120%',paddingLeft:'10px',paddingRight:'10px'}}>No Recents!</span></p></div> }
                            {prog1 ?  <CircularProgress /> : null}
                            </div> : null}
                        </div>
                    </div>

                </div>
                <div className="inputChat setF">
                    <p><span style={{backgroundColor:'#85C1E9',color:'white',fontSize:'150%',paddingLeft:'10px',paddingRight:'10px'}}>Chats</span></p>
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                        <>
                        <div className="chatBoxTop" >
                            
                            
                                {messages.length!==0 ? 
                                    messages.map((m,ind)=>{
                                        
                                        return (
                                            <div ref={scrollRef} key={ind}>
                                                <Message message={m} own={m.sender===user._id} />
                                            </div>
                                        );
                                    })  : <div style={{marginTop:'100px'}} ><span style={{backgroundColor:'#7DCEA0',color:'white',fontSize:'150%',paddingLeft:'10px',paddingRight:'10px'}}>No Convos till Now!</span></div> 
                                }
                            {prog ? <CircularProgress /> : null}

                        </div>
                        <div className="chatBoxBottom" >
                            <form onSubmit={handleSubmit}>
                                <input className="input_MM" onChange={msg_wire} value={newMessage} id="outlined-basic" placeholder=" Type here..." variant="outlined" />
                                {/* <button onClick={handleSubmit}>Send</button> */}
                                <Fab color="primary" aria-label="add" style={{marginTop:'-5px'}}  onClick={handleSubmit} >
                                        <SendRoundedIcon />
                                </Fab> 
                            </form>
                        </div></>:<span className="noConversationText" style={{backgroundColor:'#7DCEA0',marginBottom:'50px',color:'white',fontSize:'150%'}}>Open a conversation to start a chat</span>}
                    </div>
                    
                        
                    
                </div>
                <div className="OnlinePeople setF">
                    <p><span style={{backgroundColor:'#CACFD2',color:'white',fontSize:'150%',paddingLeft:'10px',paddingRight:'10px'}}>Online</span></p>
                    
                    <div>
                        {onlineUsers.length >0 ? 
                        
                            onlineUsers.map((dat,ind)=>{
                                return <div key={ind}> <Chat data={dat} /> </div>
                            })
                            :<div style={{marginTop:'200px'}}><p>No One is Online :(</p></div>
                        }   
                       
                    </div>
                </div>
                

            </Paper>
            
        </div>
        <div style={{marginBottom:'0'}}>
                {/* <Snackbar open={true} autoHideDuration={5000} >
                    <Alert  severity="success">
                    This is a success message!
                    </Alert>
                </Snackbar>  */}

                <Snackbar open={stateSnack1.open} autoHideDuration={5000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="success">
                    Now the person which you have clicked on, will be visible to recent tab!.
                    </Alert>
                </Snackbar>

                <Snackbar open={stateSnack2.open} autoHideDuration={5000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="success">
                        Already in connection!
                    </Alert>
                </Snackbar>
            </div>
            <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={profanity} onClose={()=>setProf(false)} autoHideDuration={6000} >
                      
              <Alert  severity="warning">This is a warning message, Profanity is not allowed here!</Alert>
              
            </Snackbar>
            </div>
        </>
    )
}