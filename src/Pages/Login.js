import React, { useState } from 'react';
import Navabr from '../Components/Navbar3';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {Link} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Login.css';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import SocketIO from 'socket.io-client';
import ImageAuth from '../Assets/spinner.png';


export default function Login(props){
    
    const [email,setEmail] = useState("");
    const [emailErr,setEmailErr] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(false);
    const [prog, setProg] = useState(false);
    const [accountErr, setaccountErr] = useState(false);
    const [page_change,setPage] = useState(false);

    const emailCh = (e)=>{
        setEmail(e.target.value);
    }
    const passCh = (e)=>{
        setPassword(e.target.value);
    }
    const emailMark = (val)=>{
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (regexEmail.test(email)) {
            return true;
        } else {
            return false;
        }
    }
    
    //////////////////////////////////////////////////////////////////
    const encode=(value)=>{
        let arr=[]
        for (let i=0;i<value.length;i++){
            arr.push(value.charCodeAt(i))
        }
        return arr;
    }
    //////////////////////////////////////////////////////////////////

    const LogSubmit = (e)=>{
        e.preventDefault();
       
        if(!emailMark(email)){
            setEmailErr(true)
        }
        else{
            setEmailErr(false);
        }
        if(password.length<=7){
            setPasswordErr(true);
        }
        else{
            setPasswordErr(false);
        }

        if(emailMark(email) && password.length>7){
            
            setProg(true);

            axios.post('http://localhost:5000/users/login',{
                email,
                password
            })
            .then((data)=>{
                
                if(data.data.user==='noUser'){
                    setaccountErr(true);
                }
                else{
                    //setPage(true);
                    setaccountErr(false);
                    props.setuser(data.data)
                    sessionStorage.setItem('!@#$%^&*()_+',JSON.stringify({milestone: encode(data.data.name),milestone1: data.data.init_token,milestone2: data.data._id }));
                    props.setNotifications({
                        socket:SocketIO('http://localhost:5000',{
                            withCredentials: true,
                        }),
                    })
                    setPage(true);
                }
                setProg(false);
            })
            .catch((e)=>{
                console.log(e);
                setProg(false);
            })
        }
    }
    
    if(page_change){
        return <Redirect push  to='/UI' />
    }
    return(
        <div className="Login">
            <div>
                <Navabr />
            </div>

            {/* <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fill-opacity="1" d="M0,32L80,58.7C160,85,320,139,480,144C640,149,800,107,960,112C1120,117,1280,171,1360,197.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
            {/* <svg style={{marginTop:'-60px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fill-opacity="1" d="M0,288L80,266.7C160,245,320,203,480,202.7C640,203,800,245,960,250.7C1120,256,1280,224,1360,208L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
            {/* <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00cba9" fill-opacity="1" d="M0,224L80,218.7C160,213,320,203,480,170.7C640,139,800,85,960,96C1120,107,1280,181,1360,218.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
            {/* <svg style={{marginTop:'-70px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220"><path fill="#00cba9" fill-opacity="1" d="M0,96L80,128C160,160,320,224,480,213.3C640,203,800,117,960,106.7C1120,96,1280,160,1360,192L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
           

            <div>
                <div className="Login-text">
                    <div><LockOpenIcon fontSize="large" /></div> Signin 
                </div>
                <div className="spin_set" >
                    <img className="spinner" alt='.' width="120px" src={ImageAuth}></img>
                </div>

                <div >
                    <div className="MainLog">

                        <form>
                            <div className="LoginForm">

                                <label>Email</label>
                                <br></br>
                                <input className="EmailPart" onChange={(e)=>emailCh(e)} type="email"  required={true} ></input>
                                <br></br>
                                <br></br>
                                <label>Password</label>
                                <br></br>
                                <input className="EmailPart" onChange={(e)=>passCh(e)} type="password"  required={true} ></input>
                                <br></br>
                                <br></br> 
                            </div>
                            {emailErr ? <div style={{margin:'5px'}}><Alert severity="error">This is an error alert — check Email</Alert></div>:null}
                            {accountErr ? <div style={{margin:'5px'}}><Alert severity="error">This is an error alert — No Account Found!</Alert></div>:null}
                            {passwordErr ? <div style={{margin:'5px'}}><Alert severity="error">This is an error alert — check password</Alert></div>:null}
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <button  type="submit" onClick={(e)=>LogSubmit(e)} className="subButton">{prog ? <CircularProgress size={20} style={{color:'white',position:'relative',left:'-50px',top:'3px'}} />: null}{`Submit`}</button>

                            </div>
                            <div className="endPart">
                                <span style={{textAlign:'center',fontSize:'110%'}}>
                                    <p><Link to='/Reset' style={{textDecoration:'none', color:'#2E86C1'}}>Forgot Password? </Link></p>
                                </span>
                                <span style={{textAlign:'center',fontSize:'110%'}}>
                                    <p>Don't have account? Create one <Link to='/Signup' style={{textDecoration:'none', color:'#2E86C1'}}>here</Link></p>
                                </span>
                            </div>
                            
                        </form>
                        
                    </div>
                     
                </div>
            </div>
                       
        </div>
    )
}

